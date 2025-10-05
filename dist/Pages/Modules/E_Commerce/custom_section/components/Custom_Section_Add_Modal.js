'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useEffect, useContext } from 'react';
import { Modal, Form, Upload, Input, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Erp_context } from '@/provider/ErpContext';
const getBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
const handlePreview = async file => {
    let src;
    if (typeof file.url === 'string') src = file.url;
    else if (file.thumbUrl) src = file.thumbUrl;
    else if (file.originFileObj) src = await getBase64(file.originFileObj);
    if (!src) return;
    const img = new Image();
    img.src = src;
    const win = window.open('');
    win?.document.write(img.outerHTML);
};
const CustomSectionModal = ({
    isOpen,
    setIsOpen,
    handleAddSave,
    error_message,
    set_error_message,
    editingSection,
    isDarkMode = false,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            if (editingSection) {
                form.setFieldsValue({
                    title: editingSection.title || '',
                    description: editingSection.description || '',
                    button_text: editingSection.button_text || '',
                    url: editingSection.url || '',
                    status: editingSection.status || 'Active',
                    image: editingSection.image
                        ? [
                              {
                                  uid: '-1',
                                  name: 'section.png',
                                  status: 'done',
                                  url: editingSection.image,
                              },
                          ]
                        : [],
                });
            } else {
                form.setFieldsValue({ status: 'Active' });
            }
        }
    }, [isOpen, editingSection, form]);
    return _jsx(Modal, {
        title: editingSection ? 'Edit Section' : 'Add Section',
        open: isOpen,
        onCancel: () => setIsOpen(false),
        onOk: () => form.validateFields().then(values => handleAddSave(values)),
        destroyOnClose: true,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onChange: () => set_error_message(''),
            children: [
                _jsx(Form.Item, {
                    name: 'image',
                    label: 'Section Image',
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
                        className: 'dark-upload',
                        children: _jsxs('div', {
                            className: 'dark-upload-btn',
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
                    name: 'title',
                    label: 'Section Title',
                    rules: [
                        { required: true, message: 'Please enter a title!' },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter section title',
                        className: 'dark-input',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'button_text',
                    label: 'Button Text',
                    rules: [
                        {
                            required: true,
                            message: 'Please enter button text!',
                        },
                    ],
                    children: _jsx(Input, {
                        placeholder: 'Enter button text',
                        className: 'dark-input',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'url',
                    label: 'Section URL',
                    rules: [{ required: true, message: 'Please enter a URL!' }],
                    children: _jsx(Input, {
                        placeholder: 'Enter section URL',
                        className: 'dark-input',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [
                        { required: true, message: 'Please select status!' },
                    ],
                    children: _jsxs(Select, {
                        placeholder: 'Select status',
                        className: 'dark-input',
                        children: [
                            _jsx(Select.Option, {
                                value: 'Active',
                                children: 'Active',
                            }),
                            _jsx(Select.Option, {
                                value: 'Inactive',
                                children: 'Inactive',
                            }),
                        ],
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'description',
                    label: 'Description',
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter description (optional)',
                        className: 'dark-input',
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
};
export default CustomSectionModal;
