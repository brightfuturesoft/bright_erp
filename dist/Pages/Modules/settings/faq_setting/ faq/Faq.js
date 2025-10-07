import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { getBaseUrl } from '@/helpers/config/envConfig';
import { useEffect, useState, useContext } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import JoditEditor from 'jodit-react';
import { useDropzone } from 'react-dropzone';
const API_BASE = `${getBaseUrl}/settings/faq`;
const FaqPage = () => {
    const { user, workspace, user_loading } = useContext(Erp_context);
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
    const [editingId, setEditingId] = useState(null);
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
        } catch (e) {
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
    const onSubmit = async e => {
        e.preventDefault();
        if (!workspace_id) {
            setError('No workspace selected');
            return;
        }
        setError(null);
        // Upload images first
        const uploadImage = async file => {
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
            let imageUrls = [];
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
        } catch (e) {
            setError(e?.message || 'Failed to save FAQ');
        }
    };
    const onEdit = faq => {
        setQuestion(faq.question);
        setAnswer(faq.answer);
        setUploadedImageUrls(faq.images || []);
        setEditingId(faq._id);
        setShowModal(true);
    };
    const onDelete = async id => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        try {
            const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.error)
                throw new Error(data.message || 'Failed to delete FAQ');
            fetchFaqs(); // Refresh list
        } catch (e) {
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
    return _jsxs('div', {
        className: 'p-4 space-y-6',
        children: [
            _jsxs('div', {
                className: 'flex items-center justify-between',
                children: [
                    _jsx('h2', {
                        className: 'text-xl font-semibold',
                        children: 'FAQs',
                    }),
                    _jsx('button', {
                        onClick: () => setShowModal(true),
                        className: 'bg-blue-600 text-white px-4 py-2 rounded',
                        children: 'Add FAQ',
                    }),
                ],
            }),
            error &&
                _jsx('div', { className: 'text-red-600', children: error }),
            _jsx('div', {
                children: loading
                    ? 'Loading...'
                    : _jsxs('table', {
                          className:
                              'min-w-full divide-y divide-gray-200 border rounded',
                          children: [
                              _jsx('thead', {
                                  className: 'bg-gray-50',
                                  children: _jsxs('tr', {
                                      children: [
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Question',
                                          }),
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Answer',
                                          }),
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Actions',
                                          }),
                                          _jsx('th', {
                                              className:
                                                  'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                                              children: 'Images',
                                          }),
                                      ],
                                  }),
                              }),
                              _jsx('tbody', {
                                  className:
                                      'bg-white divide-y divide-gray-200',
                                  children: faqs.map(faq =>
                                      _jsxs(
                                          'tr',
                                          {
                                              className: 'hover:bg-gray-100',
                                              children: [
                                                  _jsx('td', {
                                                      className:
                                                          'px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900',
                                                      children: faq.question,
                                                  }),
                                                  _jsx('td', {
                                                      className:
                                                          'px-6 py-4 text-sm text-gray-500',
                                                      dangerouslySetInnerHTML: {
                                                          __html: faq.answer,
                                                      },
                                                  }),
                                                  _jsxs('td', {
                                                      className:
                                                          'px-6 py-4 whitespace-nowrap text-sm font-medium',
                                                      children: [
                                                          _jsx('button', {
                                                              onClick: () =>
                                                                  onEdit(faq),
                                                              className:
                                                                  'text-indigo-600 hover:text-indigo-900 mr-4',
                                                              children: 'Edit',
                                                          }),
                                                          _jsx('button', {
                                                              onClick: () =>
                                                                  onDelete(
                                                                      faq._id
                                                                  ),
                                                              className:
                                                                  'text-red-600 hover:text-red-900',
                                                              children:
                                                                  'Delete',
                                                          }),
                                                      ],
                                                  }),
                                                  _jsx('td', {
                                                      className:
                                                          'px-6 py-4 whitespace-nowrap text-sm',
                                                      children:
                                                          faq.images &&
                                                          faq.images.length >
                                                              0 &&
                                                          _jsx('div', {
                                                              className:
                                                                  'flex flex-wrap gap-2',
                                                              children:
                                                                  faq.images.map(
                                                                      (
                                                                          imgUrl,
                                                                          idx
                                                                      ) =>
                                                                          _jsx(
                                                                              'img',
                                                                              {
                                                                                  src: imgUrl,
                                                                                  alt: `FAQ Image ${idx + 1}`,
                                                                                  className:
                                                                                      'w-16 h-16 object-cover rounded',
                                                                              },
                                                                              idx
                                                                          )
                                                                  ),
                                                          }),
                                                  }),
                                              ],
                                          },
                                          faq._id
                                      )
                                  ),
                              }),
                          ],
                      }),
            }),
            showModal &&
                _jsx('div', {
                    className:
                        'fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50',
                    children: _jsxs('div', {
                        className: 'bg-white rounded shadow max-w-md w-full',
                        children: [
                            _jsxs('div', {
                                className:
                                    'p-4 border-b flex items-center justify-between',
                                children: [
                                    _jsx('h3', {
                                        className: 'font-medium',
                                        children: editingId
                                            ? 'Edit FAQ'
                                            : 'Add FAQ',
                                    }),
                                    _jsx('button', {
                                        onClick: resetForm,
                                        className: 'text-gray-500',
                                        children: '\u2715',
                                    }),
                                ],
                            }),
                            _jsxs('form', {
                                onSubmit: onSubmit,
                                className: 'p-4 grid gap-3',
                                children: [
                                    _jsx('input', {
                                        value: question,
                                        onChange: e =>
                                            setQuestion(e.target.value),
                                        placeholder: 'Question',
                                        className: 'border p-2 rounded',
                                        required: true,
                                    }),
                                    _jsx(JoditEditor, {
                                        value: answer,
                                        onChange: newContent =>
                                            setAnswer(newContent),
                                        config: {
                                            style: {
                                                color: 'black',
                                            },
                                        },
                                    }),
                                    _jsxs('div', {
                                        children: [
                                            _jsx('label', {
                                                className:
                                                    'block mb-1 font-medium',
                                                children: 'Upload Images',
                                            }),
                                            _jsxs('div', {
                                                ...getRootProps(),
                                                className:
                                                    'border border-dashed border-gray-400 p-4 rounded cursor-pointer',
                                                children: [
                                                    _jsx('input', {
                                                        ...getInputProps(),
                                                    }),
                                                    isDragActive
                                                        ? _jsx('p', {
                                                              children:
                                                                  'Drop the images here ...',
                                                          })
                                                        : _jsx('p', {
                                                              children:
                                                                  'Drag & drop images here, or click to select files',
                                                          }),
                                                ],
                                            }),
                                            selectedFiles.length > 0 &&
                                                _jsx('div', {
                                                    className:
                                                        'mt-2 flex flex-wrap gap-2',
                                                    children: selectedFiles.map(
                                                        (file, index) =>
                                                            _jsxs(
                                                                'div',
                                                                {
                                                                    className:
                                                                        'relative w-20 h-20 border rounded overflow-hidden',
                                                                    children: [
                                                                        _jsx(
                                                                            'img',
                                                                            {
                                                                                src: URL.createObjectURL(
                                                                                    file
                                                                                ),
                                                                                alt: file.name,
                                                                                className:
                                                                                    'object-cover w-full h-full',
                                                                            }
                                                                        ),
                                                                        _jsx(
                                                                            'button',
                                                                            {
                                                                                type: 'button',
                                                                                onClick:
                                                                                    () =>
                                                                                        setSelectedFiles(
                                                                                            files =>
                                                                                                files.filter(
                                                                                                    (
                                                                                                        _,
                                                                                                        i
                                                                                                    ) =>
                                                                                                        i !==
                                                                                                        index
                                                                                                )
                                                                                        ),
                                                                                className:
                                                                                    'absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs',
                                                                                children:
                                                                                    '\u00D7',
                                                                            }
                                                                        ),
                                                                    ],
                                                                },
                                                                index
                                                            )
                                                    ),
                                                }),
                                            editingId &&
                                                uploadedImageUrls.length > 0 &&
                                                _jsxs('div', {
                                                    className: 'mt-2',
                                                    children: [
                                                        _jsx('label', {
                                                            className:
                                                                'block mb-1 font-medium',
                                                            children:
                                                                'Existing Images',
                                                        }),
                                                        _jsx('div', {
                                                            className:
                                                                'flex flex-wrap gap-2',
                                                            children:
                                                                uploadedImageUrls.map(
                                                                    (
                                                                        url,
                                                                        index
                                                                    ) =>
                                                                        _jsxs(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'relative w-20 h-20 border rounded overflow-hidden',
                                                                                children:
                                                                                    [
                                                                                        _jsx(
                                                                                            'img',
                                                                                            {
                                                                                                src: url,
                                                                                                alt: `Existing Image ${index + 1}`,
                                                                                                className:
                                                                                                    'object-cover w-full h-full',
                                                                                            }
                                                                                        ),
                                                                                        _jsx(
                                                                                            'button',
                                                                                            {
                                                                                                type: 'button',
                                                                                                onClick:
                                                                                                    () =>
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
                                                                                                        ),
                                                                                                className:
                                                                                                    'absolute top-0 right-0 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs',
                                                                                                children:
                                                                                                    '\u00D7',
                                                                                            }
                                                                                        ),
                                                                                    ],
                                                                            },
                                                                            index
                                                                        )
                                                                ),
                                                        }),
                                                    ],
                                                }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className:
                                            'flex justify-end gap-2 pt-2',
                                        children: [
                                            _jsx('button', {
                                                type: 'button',
                                                onClick: resetForm,
                                                className:
                                                    'px-4 py-2 rounded border text-red-600',
                                                children: 'Cancel',
                                            }),
                                            _jsx('button', {
                                                type: 'submit',
                                                className:
                                                    'bg-blue-600 text-white px-4 py-2 rounded',
                                                children: editingId
                                                    ? 'Update'
                                                    : 'Create',
                                            }),
                                        ],
                                    }),
                                ],
                            }),
                        ],
                    }),
                }),
        ],
    });
};
export default FaqPage;
