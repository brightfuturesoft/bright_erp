import { getBaseUrl } from '@/helpers/config/envConfig';
import React, { useEffect, useState, useContext, useRef } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import JoditEditor from 'jodit-react';
import { useDropzone } from 'react-dropzone';

type FAQ = {
    _id: string;
    question: string;
    answer: string;
    workspace_id: string;
    created_by?: string;
    images?: string[];
    created_at: string;
    updated_at: string;
};

const API_BASE = `${getBaseUrl}/settings/faq`;

const FaqPage: React.FC = () => {
    const { user, workspace, user_loading } = useContext(Erp_context)!;
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState<string[]>([]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Dropzone hook
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        onDrop: acceptedFiles => {
            setSelectedFiles(prev => [...prev, ...acceptedFiles]);
        },
        multiple: true,
    });

    // Get workspace_id dynamically
    const workspace_id = workspace?._id;

    // Fetch FAQs for the specific workspace
    const fetchFaqs = async () => {
        if (!workspace_id) return;
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_BASE}?workspace_id=${workspace_id}`);
            const data = await res.json();
            if (data.error === false) setFaqs(data.data || []);
            else setError(data.message || 'Failed to load FAQs');
        } catch (e: any) {
            setError(e?.message || 'Failed to load FAQs');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user_loading && workspace_id) {
            fetchFaqs();
        }
    }, [user_loading, workspace_id]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!workspace_id) {
            setError('No workspace selected');
            return;
        }
        setError(null);

        // Upload images first
        const uploadImage = async (file: File): Promise<string> => {
            const formData = new FormData();
            formData.append('image', file);
            try {
                const res = await fetch(`${getBaseUrl}/image/upload-image`, {
                    method: 'PUT',
                    body: formData,
                });
                const data = await res.json();
                if (data.error)
                    throw new Error(data.message || 'Image upload failed');
                return data.data.image_url;
            } catch (err) {
                throw err;
            }
        };

        try {
            let imageUrls: string[] = [];
            if (selectedFiles.length > 0) {
                const uploadPromises = selectedFiles.map(file =>
                    uploadImage(file)
                );
                imageUrls = await Promise.all(uploadPromises);
            }

            const url = editingId ? `${API_BASE}/${editingId}` : API_BASE;
            const method = editingId ? 'PUT' : 'POST';
            const allImages = editingId
                ? [...uploadedImageUrls, ...imageUrls]
                : imageUrls;
            const body = editingId
                ? JSON.stringify({ question, answer, images: allImages })
                : JSON.stringify({
                      question,
                      answer,
                      workspace_id,
                      created_by: user?._id,
                      images: allImages,
                  });

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body,
            });
            const data = await res.json();
            if (data.error)
                throw new Error(data.message || 'Failed to save FAQ');

            setQuestion('');
            setAnswer('');
            setSelectedFiles([]);
            setUploadedImageUrls([]);
            setEditingId(null);
            setShowModal(false);
            fetchFaqs(); // Refresh list
        } catch (e: any) {
            setError(e?.message || 'Failed to save FAQ');
        }
    };

    const onEdit = (faq: FAQ) => {
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setUploadedImageUrls(faq.images || []);
        setEditingId(faq._id);
        setShowModal(true);
    };

    const onDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        try {
            const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.error)
                throw new Error(data.message || 'Failed to delete FAQ');
            fetchFaqs(); // Refresh list
        } catch (e: any) {
            setError(e?.message || 'Failed to delete FAQ');
        }
    };

    const resetForm = () => {
        setQuestion('');
        setAnswer('');
        setSelectedFiles([]);
        setUploadedImageUrls([]);
        setEditingId(null);
        setShowModal(false);
    };

    return (
        <div className="p-4 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">FAQs</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add FAQ
                </button>
            </div>
            {error && <div className="text-red-600">{error}</div>}
            <div>
                {loading ? (
                    'Loading...'
                ) : (
                    <table className="min-w-full divide-y divide-gray-200 border rounded">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Question
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Answer
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Images
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {faqs.map(faq => (
                                <tr
                                    key={faq._id}
                                    className="hover:bg-gray-100"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {faq.question}
                                    </td>
                                    <td
                                        className="px-6 py-4 text-sm text-gray-500"
                                        dangerouslySetInnerHTML={{
                                            __html: faq.answer,
                                        }}
                                    ></td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => onEdit(faq)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => onDelete(faq._id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {faq.images &&
                                            faq.images.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {faq.images.map(
                                                        (imgUrl, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={imgUrl}
                                                                alt={`FAQ Image ${idx + 1}`}
                                                                className="w-16 h-16 object-cover rounded"
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded shadow max-w-md w-full">
                        <div className="p-4 border-b flex items-center justify-between">
                            <h3 className="font-medium">
                                {editingId ? 'Edit FAQ' : 'Add FAQ'}
                            </h3>
                            <button
                                onClick={resetForm}
                                className="text-gray-500"
                            >
                                ✕
                            </button>
                        </div>
                        <form
                            onSubmit={onSubmit}
                            className="p-4 grid gap-3"
                        >
                            <input
                                value={question}
                                onChange={e => setQuestion(e.target.value)}
                                placeholder="Question"
                                className="border p-2 rounded"
                                required
                            />
                            <JoditEditor
                                value={answer}
                                onChange={newContent => setAnswer(newContent)}
                                config={{
                                    style: {
                                        color: 'black',
                                    },
                                }}
                            />
                            <div>
                                <label className="block mb-1 font-medium">
                                    Upload Images
                                </label>
                                <div
                                    {...getRootProps()}
                                    className="border border-dashed border-gray-400 p-4 rounded cursor-pointer"
                                >
                                    <input {...getInputProps()} />
                                    {isDragActive ? (
                                        <p>Drop the images here ...</p>
                                    ) : (
                                        <p>
                                            Drag & drop images here, or click to
                                            select files
                                        </p>
                                    )}
                                </div>
                                {selectedFiles.length > 0 && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {selectedFiles.map((file, index) => (
                                            <div
                                                key={index}
                                                className="relative w-20 h-20 border rounded overflow-hidden"
                                            >
                                                <img
                                                    src={URL.createObjectURL(
                                                        file
                                                    )}
                                                    alt={file.name}
                                                    className="object-cover w-full h-full"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedFiles(
                                                            files =>
                                                                files.filter(
                                                                    (_, i) =>
                                                                        i !==
                                                                        index
                                                                )
                                                        )
                                                    }
                                                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {editingId && uploadedImageUrls.length > 0 && (
                                    <div className="mt-2">
                                        <label className="block mb-1 font-medium">
                                            Existing Images
                                        </label>
                                        <div className="flex flex-wrap gap-2">
                                            {uploadedImageUrls.map(
                                                (url, index) => (
                                                    <div
                                                        key={index}
                                                        className="relative w-20 h-20 border rounded overflow-hidden"
                                                    >
                                                        <img
                                                            src={url}
                                                            alt={`Existing Image ${index + 1}`}
                                                            className="object-cover w-full h-full"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setUploadedImageUrls(
                                                                    urls =>
                                                                        urls.filter(
                                                                            (
                                                                                _,
                                                                                i
                                                                            ) =>
                                                                                i !==
                                                                                index
                                                                        )
                                                                )
                                                            }
                                                            className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                                        >
                                                            ×
                                                        </button>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 rounded border text-red-600"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    {editingId ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FaqPage;
