import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const getBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
const handlePreview = async file => {
    let src;
    if (typeof file.url === 'string') {
        src = file.url;
    } else if (file.thumbUrl) {
        src = file.thumbUrl;
    } else if (file.originFileObj) {
        src = await getBase64(file.originFileObj);
    }
    if (!src) return;
    const img = new Image();
    img.src = src;
    const win = window.open('');
    win?.document.write(img.outerHTML);
};
export default function Category_edit_modal({
    isOpen,
    setIsOpen,
    editingCategory,
    setEditingCategory,
    handleEditSave,
    error_message,
    set_error_message,
}) {
    const [form] = Form.useForm();
    useEffect(() => {
        if (editingCategory && isOpen) {
            const imageUrl =
                typeof editingCategory.image === 'string'
                    ? editingCategory.image
                    : editingCategory.image?.url || '';
            const initialFileList = imageUrl
                ? [
                      {
                          uid: '-1',
                          name: 'current-image.png',
                          status: 'done',
                          url: imageUrl,
                      },
                  ]
                : [];
            form.setFieldsValue({
                ...editingCategory,
                image: initialFileList,
            });
        } else {
            form.resetFields();
        }
    }, [editingCategory, isOpen]);
    return _jsx(Modal, {
        title: 'Edit Category',
        open: isOpen,
        onCancel: () => {
            setIsOpen(false);
            setEditingCategory(null);
        },
        onOk: () => {
            form.validateFields().then(values => {
                handleEditSave(values);
            });
        },
        destroyOnClose: true,
        children: _jsxs(Form, {
            form: form,
            onChange: () => set_error_message(''),
            layout: 'vertical',
            children: [
                _jsx(Form.Item, {
                    name: 'image',
                    label: 'Upload Image',
                    valuePropName: 'fileList',
                    getValueFromEvent: e =>
                        Array.isArray(e) ? e : e && e.fileList,
                    rules: [
                        { required: true, message: 'Please upload an image!' },
                    ],
                    children: _jsx(Upload, {
                        listType: 'picture-card',
                        beforeUpload: () => false,
                        maxCount: 1,
                        accept: 'image/*',
                        onPreview: handlePreview,
                        previewFile: async file => getBase64(file),
                        onChange: () => set_error_message(''),
                        children: _jsxs('div', {
                            className: 'dark:text-white text-black',
                            children: [
                                _jsx(UploadOutlined, {}),
                                _jsx('div', {
                                    style: { marginTop: 8 },
                                    children: 'Upload',
                                }),
                            ],
                        }),
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'name',
                    label: 'Name',
                    rules: [{ required: true }],
                    children: _jsx(Input, {}),
                }),
                _jsx(Form.Item, {
                    name: 'code',
                    label: 'Code',
                    rules: [{ required: true }],
                    children: _jsx(Input, {}),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [{ required: true }],
                    children: _jsx(Select, {
                        options: [
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                            { value: 'draft', label: 'Draft' },
                        ],
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    label: 'Description',
                    children: _jsx(Input.TextArea, {
                        className: 'dark:text-white text-black',
                    }),
                }),
                error_message &&
                    _jsx('p', {
                        style: { color: 'red' },
                        children: error_message,
                    }),
            ],
        }),
    });
}
