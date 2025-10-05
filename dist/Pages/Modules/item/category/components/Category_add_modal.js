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
export default function Category_add_modal({
    isOpen,
    setIsOpen,
    addParentCategory,
    setAddParentCategory,
    handleAddSave,
    error_message,
    set_error_message,
    user,
}) {
    const [form] = Form.useForm();
    // 🔹 Common style for all inputs
    const inputStyle =
        'w-full rounded-md border bg-white text-black dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700';
    useEffect(() => {
        if (isOpen) form.resetFields();
    }, [isOpen]);
    return _jsx(Modal, {
        title: addParentCategory ? 'Add Subcategory' : 'Add Category',
        open: isOpen,
        onCancel: () => {
            setIsOpen(false);
            setAddParentCategory(null);
        },
        onOk: () => {
            form.validateFields().then(values => {
                handleAddSave(values);
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
                        Array.isArray(e) ? e : e?.fileList,
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
                    children: _jsx(Input, { className: inputStyle }),
                }),
                _jsx(Form.Item, {
                    label: 'Code',
                    shouldUpdate: (prev, curr) => prev.name !== curr.name,
                    children: ({ getFieldValue, setFieldsValue }) => {
                        const nameValue = getFieldValue('name') || '';
                        const codeValue = nameValue
                            .toLowerCase()
                            .replace(/\s/g, '_');
                        setTimeout(() => {
                            setFieldsValue({ code: codeValue });
                        }, 0);
                        return _jsx(Form.Item, {
                            name: 'code',
                            noStyle: true,
                            children: _jsx(Input, {
                                className: inputStyle,
                                value: codeValue,
                            }),
                        });
                    },
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    initialValue: 'draft',
                    rules: [{ required: true }],
                    children: _jsx(Select, {
                        className: inputStyle,
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
                        rows: 4,
                        className: inputStyle,
                    }),
                }),
                error_message &&
                    _jsx('p', {
                        className: 'text-red-500',
                        children: error_message,
                    }),
            ],
        }),
    });
}
