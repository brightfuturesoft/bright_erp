import React, { useState } from 'react';
import { Upload, Button, DatePicker, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CommonBtn from '../../../../Hooks/CommonBtn';

const AddDirectSale: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [selectedPerson, setSelectedPerson] = useState<string>('');
    const [selectCustomer, setSelecetCustomer] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        if (file) {
            formData.append('photo', file);
        }

        formData.append('salePerson', selectedPerson);
        formData.append('customer', selectCustomer);

        const data = Object.fromEntries(formData.entries());
        console.log(data);
        // Submit form data to backend or perform any other action
    };

    const handleSelectChange = (value: string) => {
        setSelectedPerson(value);
    };
    const handleSelectCustomer = (value: string) => {
        setSelecetCustomer(value);
    };

    const handleChange = ({ fileList }: { fileList: any }) => {
        if (fileList.length > 0) {
            setFile(fileList[0].originFileObj);
        } else {
            setFile(null);
        }
    };

    return (
        <div className="py-6 mx-auto">
            <form className="max-w-7xl mx-auto dark:text-light text-dark p-6 dark:bg-light-dark bg-gray-100 shadow-md rounded" onSubmit={handleSubmit}>
                <h2 className="text-xl mb-4">Add Sale Item</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
                        <div>
                            <label htmlFor="sale_no" className="block mb-1">Sale No (auto generate):</label>
                            <input
                                readOnly
                                value={203847}
                                type="text"
                                id="sale_no"
                                name="sale_no"
                                className="dark:text-light bg-transparent border border-gray-700 w-full rounded px-3 py-2"
                            />
                        </div>
                        <div className="upload-box relative pt-2 md:pt-0 md:pb-0 pb-7">
                            <label htmlFor="photo" className="block mb-1">Photo:</label>
                            <Upload
                                beforeUpload={() => false}
                                onChange={handleChange}
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="mb-4 pt-2 pb-7">
                        <label htmlFor="sale_date" className="block mb-1">Sale Date:</label>
                        <DatePicker
                            id="sale_date"
                            name="sale_date"
                            className="dark:!text-light focus-within:bg-transparent hover:border-gray-700 focus-within:border-gray-200 hover:!bg-transparent bg-transparent border border-gray-700 w-full rounded px-3 py-2"
                            format="YYYY-MM-DD"
                            placeholder=""
                        />
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

                <div className="flex items-center w-full  gap-3">
                    <div className="mb-4 select-box relative w-full">
                        <label htmlFor="selectPerson" className="block mb-1">Customers</label>
                        <Select
                            defaultValue="jack"
                            style={{ width: 200 }}
                            onChange={handleSelectCustomer}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'Yiminghe' },
                                { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </div>
                    <div className="mb-4 select-box relative w-full">
                        <label htmlFor="selectPerson" className="block mb-1">Select Person</label>
                        <Select
                            defaultValue="jack"
                            style={{ width: 200 }}
                            onChange={handleSelectChange}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'Yiminghe' },
                                { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                        />
                    </div>

                </div>
                <div className="mb-4 mt-2">
                    <label htmlFor="description" className="block mb-1">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        className="w-full h-[160px] dark:text-light bg-transparent border border-gray-700 rounded px-3 py-2"
                    />
                </div>
                {/* Add dropdowns for Country, State, District, Thana here */}
                <CommonBtn
                    back={true}
                    type="submit"
                >
                    Submit
                </CommonBtn>
            </form>
        </div>
    );
};

export default AddDirectSale;
