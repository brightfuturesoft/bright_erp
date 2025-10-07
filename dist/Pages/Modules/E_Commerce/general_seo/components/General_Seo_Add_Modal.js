'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useEffect } from 'react';
import { Modal, Form, Input, Select, Upload } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { UploadOutlined } from '@ant-design/icons';
// Convert File to Base64
const getBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
// Preview image in new tab
const handlePreview = async file => {
    let src;
    if (typeof file.url === 'string') src = file.url;
    else if (file.originFileObj) src = await getBase64(file.originFileObj);
    if (!src) return;
    const img = new Image();
    img.src = src;
    const win = window.open('');
    win?.document.write(img.outerHTML);
};
const SEOModal = ({
    isOpen,
    setIsOpen,
    handleSave,
    errorMessage,
    setErrorMessage,
    editingSEO,
    isDarkMode = false,
}) => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    useEffect(() => {
        if (isOpen) {
            form.resetFields();
            form.setFieldsValue({
                pageTitle: editingSEO?.pageTitle || '',
                metaDescription: editingSEO?.metaDescription || '',
                metaKeywords: editingSEO?.metaKeywords || '',
                slug: editingSEO?.slug || '',
                ogTitle: editingSEO?.ogTitle || '',
                ogDescription: editingSEO?.ogDescription || '',
                ogImage: editingSEO?.ogImage
                    ? [
                          {
                              uid: '-1',
                              name: 'og-image.png',
                              status: 'done',
                              url: editingSEO.ogImage,
                          },
                      ]
                    : [],
                canonicalUrl: editingSEO?.canonicalUrl || '',
                metaRobots: editingSEO?.metaRobots || 'index, follow',
                status: editingSEO?.status || 'Active',
            });
        }
    }, [isOpen, editingSEO, form]);
    return _jsx(Modal, {
        title: editingSEO ? 'Edit SEO' : 'Add SEO',
        open: isOpen,
        onCancel: () => setIsOpen(false),
        onOk: () => form.validateFields().then(values => handleSave(values)),
        destroyOnClose: true,
        className: isDarkMode ? 'dark' : '',
        width: 900,
        children: _jsxs(Form, {
            form: form,
            layout: 'vertical',
            onChange: () => setErrorMessage(''),
            children: [
                _jsx(Form.Item, {
                    name: 'pageTitle',
                    label: 'Page Title',
                    rules: [{ required: true, message: 'Enter page title!' }],
                    children: _jsx(Input, { placeholder: 'Enter page title' }),
                }),
                _jsx(Form.Item, {
                    name: 'metaDescription',
                    label: 'Meta Description',
                    rules: [
                        { required: true, message: 'Enter meta description!' },
                    ],
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter meta description',
                        rows: 3,
                        className:
                            'dark:bg-gray-800 dark:text-white dark:placeholder-white',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'metaKeywords',
                    label: 'Meta Keywords',
                    children: _jsx(Input, {
                        placeholder: 'Enter meta keywords (comma separated)',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'slug',
                    label: 'Slug / URL',
                    rules: [{ required: true, message: 'Enter slug!' }],
                    children: _jsx(Input, {
                        placeholder: 'Enter slug, e.g., /products/iphone-15',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'ogTitle',
                    label: 'OG Title',
                    children: _jsx(Input, {
                        placeholder: 'Enter OG title for social sharing',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'ogDescription',
                    label: 'OG Description',
                    children: _jsx(Input.TextArea, {
                        placeholder: 'Enter OG description',
                        rows: 3,
                        className:
                            'dark:bg-gray-800 dark:text-white dark:placeholder-white',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'ogImage',
                    label: 'OG Image',
                    valuePropName: 'fileList',
                    getValueFromEvent: e =>
                        Array.isArray(e) ? e : (e?.fileList ?? []),
                    rules: [{ required: true, message: 'Upload OG image!' }],
                    children: _jsx(Upload, {
                        listType: 'picture-card',
                        beforeUpload: () => false,
                        maxCount: 1,
                        onPreview: handlePreview,
                        children: _jsxs('div', {
                            className:
                                'dark:bg-gray-800 dark:text-white dark:placeholder-white',
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
                    name: 'canonicalUrl',
                    label: 'Canonical URL',
                    children: _jsx(Input, {
                        placeholder: 'Enter canonical URL if any',
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'metaRobots',
                    label: 'Meta Robots',
                    children: _jsx(Select, {
                        options: [
                            { value: 'index, follow', label: 'Index, Follow' },
                            {
                                value: 'noindex, nofollow',
                                label: 'NoIndex, NoFollow',
                            },
                        ],
                    }),
                }),
                _jsx(Form.Item, {
                    name: 'status',
                    label: 'Status',
                    rules: [{ required: true, message: 'Select status!' }],
                    children: _jsx(Select, {
                        options: [
                            { value: 'Active', label: 'Active' },
                            { value: 'Inactive', label: 'Inactive' },
                        ],
                    }),
                }),
                errorMessage &&
                    _jsx('p', {
                        style: { color: 'red' },
                        children: errorMessage,
                    }),
            ],
        }),
    });
};
export default SEOModal;
