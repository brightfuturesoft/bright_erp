import React, { useState } from 'react';
import { Upload, Button, Form, Input, Select } from 'antd';
import type { UploadFile, UploadProps } from 'antd';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const AddCustomer: React.FC = () => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const handlePreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as Blob);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        // Include the uploaded photo in the form data
        if (fileList.length > 0) {
            formData.append('photo', fileList[0].originFileObj as Blob);
        }

        const data = Object.fromEntries(formData.entries());


        console.log(data);
        // Here you can submit the form data to your backend or perform any other action
    };

    return (
        <div className="py-6 mx-auto">
            <form className="max-w-7xl mx-auto dark:text-light text-dark p-6 dark:bg-light-dark bg-gray-100 shadow-md rounded" onSubmit={handleSubmit}>
                <h2 className="text-xl mb-4">Add Customer</h2>
                <div className="md:grid grid-cols-10 gap-4 mb-4">
                    <div className="mb-4">
                        <label htmlFor="photo" className="block mb-1">Photo:</label>
                        <ImgCrop
                            rotationSlider>
                            <Upload

                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleChange}
                                onPreview={handlePreview}
                            >
                                {fileList.length < 1 && <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>}
                            </Upload>
                        </ImgCrop>
                    </div>
                    <div className='col-span-9 md:space-y-2'>
                        <div>
                            <label htmlFor="firstName" className="block mb-1">First Name:</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="dark:text-light bg-transparent border border-gray-700 w-full rounded px-3 py-2"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block mb-1">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full dark:text-light bg-transparent border border-gray-700 rounded px-3 py-2"
                            />
                        </div>

                    </div>
                </div>

                <div className="mb-4">
                    <label htmlFor="phone" className="block mb-1">Phone:</label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="w-full dark:text-light bg-transparent border border-gray-700 rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block mb-1">Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        className="w-full dark:text-light bg-transparent border border-gray-700 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="customerType" className="block mb-1">Customer Type:</label>
                    <select
                        id="customerType"
                        name="customerType"
                        className="w-full dark:text-light bg-transparent border border-gray-700 rounded px-3 py-2"
                    >
                        <option value="">Select Customer Type</option>
                        <option value="Regular">Regular</option>
                        <option value="Premium">Premium</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="website" className="block mb-1">Website:</label>
                    <input
                        type="text"
                        id="website"
                        name="website"
                        className="w-full dark:text-light bg-transparent border border-gray-700 rounded px-3 py-2"
                    />
                </div>
                {/* Add dropdowns for Country, State, District, Thana here */}
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default AddCustomer;
