import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// @ts-nocheck
import { useCallback, useState } from 'react';
import { Button, Form, Space, Switch } from 'antd';
import { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import DashboardHeader from '@/Pages/Modules/CommonComponents/DashboardHeader';
const AddCustomer = ({ initialValue, onSave }) => {
    const [date, setDate] = useState(initialValue || '');
    const [form] = Form.useForm();
    const [uploadedImage, setUploadedImage] = useState(null);
    const [imgFile, setImgFile] = useState(null);
    const [addressOn, setAddressOn] = useState(false);
    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        setImgFile(file);
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
        }
    }, []);
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
    });
    const handleDeleteImage = e => {
        e.stopPropagation();
        setUploadedImage(null);
    };
    const handleSubmit = () => {
        form.validateFields()
            .then(values => {
                const allData = {
                    ...values,
                    imgFile,
                    till_date: date,
                };
                onSave(allData);
            })
            .catch(info => {
                console.log('Validation failed:', info);
            });
    };
    return _jsxs('div', {
        className: 'dark:text-light text-black',
        children: [
            _jsx(DashboardHeader, {
                children: _jsx('h1', {
                    className: 'text-lg font-semibold dark:text-gray-50',
                    children: 'Add Customer',
                }),
            }),
            _jsxs(Form, {
                form: form,
                layout: 'vertical',
                children: [
                    _jsx(AddBasic_Information, {
                        getRootProps: getRootProps,
                        uploadedImage: uploadedImage,
                        getInputProps: getInputProps,
                        handleDeleteImage: handleDeleteImage,
                        setDate: setDate,
                    }),
                    _jsx('br', {}),
                    _jsxs('div', {
                        onClick: () => setAddressOn(!addressOn),
                        className:
                            'flex items-center gap-2 font-semibold dark:text-light',
                        children: [
                            _jsx(Space, {
                                direction: 'horizontal',
                                children: _jsx(Switch, {
                                    className: 'dark:bg-gray-700 bg-gray-200',
                                    defaultChecked: false,
                                }),
                            }),
                            _jsx('p', { children: 'Add Address' }),
                        ],
                    }),
                    addressOn && _jsx(Add_AddressInfo, {}),
                    _jsx('br', {}),
                    _jsxs('div', {
                        className: 'flex items-center justify-end gap-2',
                        children: [
                            _jsx(Link, {
                                to: `/dashboard/customer`,
                                children: _jsx(Button, {
                                    className:
                                        'bg-danger hover:!text-danger !text-light mb-5',
                                    danger: true,
                                    children: 'Cancel',
                                }),
                            }),
                            _jsx(Form.Item, {
                                children: _jsx(Button, {
                                    type: 'primary',
                                    onClick: handleSubmit,
                                    children: '+Add',
                                }),
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
};
export default AddCustomer;
