import React, { useEffect } from 'react';
import { Modal, Form, Upload, Input, Select, message } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

const getBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });

const handlePreview = async (file: any) => {
    let src: string | undefined;
    if (typeof file.url === 'string') {
        src = file.url;
    } else if (file.thumbUrl) {
        src = file.thumbUrl;
    } else if (file.originFileObj) {
        src = await getBase64(file.originFileObj as File);
    }
    if (!src) return;
    const img = new Image();
    img.src = src;
    const win = window.open('');
    win?.document.write(img.outerHTML);
};

// generate a 4-digit numeric suffix (1000-9999)
const generate4DigitSuffix = () =>
    Math.floor(1000 + Math.random() * 9000).toString();

export default function Category_add_modal({
    isOpen,
    setIsOpen,
    addParentCategory,
    setAddParentCategory,
    handleAddSave,
    error_message,
    set_error_message,
    user,
}: any) {
    const [form] = Form.useForm();

    // 🔹 Common style for all inputs
    const inputStyle =
        'w-full rounded-md border bg-white text-black dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700';

    useEffect(() => {
        if (isOpen) form.resetFields();
    }, [isOpen]);

    const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

    // Validate file on selection. Return false to keep current behavior (no auto-upload).
    const beforeUpload = (file: RcFile) => {
        const isValidImage =
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.name.toLowerCase().endsWith('.jpg') ||
            file.name.toLowerCase().endsWith('.jpeg') ||
            file.name.toLowerCase().endsWith('.png');

        if (!isValidImage) {
            message.error('Only JPG / JPEG / PNG images are allowed.');
            set_error_message('Only JPG / JPEG / PNG images are allowed.');
            return Upload.LIST_IGNORE;
        }

        if (file.size > MAX_SIZE_BYTES) {
            message.error('Image must be smaller than 10 MB.');
            set_error_message('Image must be smaller than 10 MB.');
            return Upload.LIST_IGNORE;
        }

        set_error_message('');
        return false;
    };

    // Form validator to enforce constraints on submit as well
    const fileListValidator = async (_: any, value: UploadFile[]) => {
        if (!value || value.length === 0) {
            return Promise.reject(new Error('Please upload an image!'));
        }

        const file = value[0] as UploadFile & { originFileObj?: RcFile };
        const rcFile =
            (file.originFileObj as RcFile) ?? (file as unknown as RcFile);

        if (!rcFile) return Promise.reject(new Error('Invalid file'));

        const isValidImage =
            rcFile.type === 'image/jpeg' ||
            rcFile.type === 'image/png' ||
            rcFile.name.toLowerCase().endsWith('.jpg') ||
            rcFile.name.toLowerCase().endsWith('.jpeg') ||
            rcFile.name.toLowerCase().endsWith('.png');

        if (!isValidImage)
            return Promise.reject(
                new Error('Only JPG / JPEG / PNG images are allowed.')
            );
        if (rcFile.size > MAX_SIZE_BYTES)
            return Promise.reject(
                new Error('Image must be smaller than 10 MB.')
            );

        return Promise.resolve();
    };

    // When the upload area changes, clear any error message if the current selection is valid.
    const handleUploadChange = ({ fileList }: { fileList: UploadFile[] }) => {
        if (!fileList || fileList.length === 0) return set_error_message('');
        const f = fileList[0] as UploadFile & { originFileObj?: RcFile };
        const rcFile = (f.originFileObj as RcFile) ?? (f as unknown as RcFile);
        if (!rcFile) return;
        const isValidImage =
            rcFile.type === 'image/jpeg' ||
            rcFile.type === 'image/png' ||
            rcFile.name.toLowerCase().endsWith('.jpg') ||
            rcFile.name.toLowerCase().endsWith('.jpeg') ||
            rcFile.name.toLowerCase().endsWith('.png');
        if (!isValidImage)
            return set_error_message(
                'Only JPG / JPEG / PNG images are allowed.'
            );
        if (rcFile.size > MAX_SIZE_BYTES)
            return set_error_message('Image must be smaller than 10 MB.');
        set_error_message('');
    };

    // Handle form value changes (we use this to auto-generate the code when the name changes)
    const onFormValuesChange = (changedValues: any, allValues: any) => {
        // only react when name changes
        if (Object.prototype.hasOwnProperty.call(changedValues, 'name')) {
            const nameValue = (
                changedValues.name ??
                allValues.name ??
                ''
            ).toString();

            if (!nameValue.trim()) {
                // clear code when name is removed
                form.setFieldsValue({ code: '' });
            } else {
                const slugBase = nameValue
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, '_')
                    .replace(/[^a-z0-9_]/g, ''); // keep letters, numbers, underscore

                const suffix = generate4DigitSuffix();
                const newCode = slugBase ? `${slugBase}_${suffix}` : suffix;
                form.setFieldsValue({ code: newCode });
            }
        }

        // clear any previous error messages on any change
        set_error_message('');
    };

    return (
        <Modal
            title={addParentCategory ? 'Add Subcategory' : 'Add Category'}
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                setAddParentCategory(null);
            }}
            onOk={() => {
                form.validateFields().then(values => {
                    handleAddSave(values);
                });
            }}
            destroyOnClose
        >
            <Form
                form={form}
                onValuesChange={onFormValuesChange}
                layout="vertical"
            >
                {/* Upload */}
                <Form.Item
                    name="image"
                    label="Upload Image"
                    valuePropName="fileList"
                    getValueFromEvent={e =>
                        Array.isArray(e) ? e : e?.fileList
                    }
                    rules={[{ validator: fileListValidator }]}
                    extra={
                        <span className="dark:text-white text-gray-900">
                            Accepted types: <strong>JPG / JPEG / PNG</strong>.
                            Max size: <strong>10 MB</strong>.
                        </span>
                    }
                >
                    <Upload
                        listType="picture-card"
                        beforeUpload={beforeUpload}
                        maxCount={1}
                        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                        onPreview={handlePreview}
                        previewFile={async file => getBase64(file as File)}
                        onChange={handleUploadChange}
                        style={{ width: '100%' }}
                    >
                        {/* Full-width upload button content */}
                        <div
                            style={{
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                minHeight: 96,
                            }}
                            className="dark:text-white text-black"
                        >
                            <UploadOutlined style={{ fontSize: 24 }} />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                {/* Name */}
                <Form.Item
                    name="name"
                    label="Category Name"
                    rules={[{ required: true }]}
                >
                    <Input className={inputStyle} />
                </Form.Item>

                {/* Code (auto-generated with 4-digit suffix) */}
                <Form.Item
                    name="code"
                    label="Category Code"
                >
                    <Input className={inputStyle} />
                </Form.Item>

                {/* Status */}
                <Form.Item
                    name="status"
                    label="Status"
                    initialValue="draft"
                    rules={[{ required: true }]}
                >
                    <Select
                        className={inputStyle}
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                            { value: 'draft', label: 'Draft' },
                        ]}
                    />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    name="description"
                    label="Description"
                >
                    <Input.TextArea
                        rows={4}
                        className={inputStyle}
                    />
                </Form.Item>

                {/* Error */}
                {error_message && (
                    <p className="text-red-500">{error_message}</p>
                )}
            </Form>
        </Modal>
    );
}
