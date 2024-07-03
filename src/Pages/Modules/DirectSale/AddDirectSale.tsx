import { useState } from 'react';
import { Upload, Button, DatePicker, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import CommonBtn from '../../../Hooks/CommonBtn';

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
        <div className="mx-auto py-6">
            <form
                className="bg-gray-100 dark:bg-light-dark shadow-md mx-auto p-6 rounded max-w-7xl text-dark dark:text-light"
                onSubmit={handleSubmit}
            >
                <h2 className="mb-4 text-xl">Add Sale Item</h2>
                <div className="space-y-4">
                    <div className="md:gap-4 grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <label
                                htmlFor="sale_no"
                                className="block mb-1"
                            >
                                Sale No (auto generate):
                            </label>
                            <input
                                readOnly
                                value={203847}
                                type="text"
                                id="sale_no"
                                name="sale_no"
                                className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light"
                            />
                        </div>
                        <div className="relative pt-2 md:pt-0 pb-7 md:pb-0 upload-box">
                            <label
                                htmlFor="photo"
                                className="block mb-1"
                            >
                                Photo:
                            </label>
                            <Upload
                                beforeUpload={() => false}
                                onChange={handleChange}
                                listType="picture"
                                maxCount={1}
                            >
                                <Button icon={<UploadOutlined />}>
                                    Upload (Max: 1)
                                </Button>
                            </Upload>
                        </div>
                    </div>
                    <div className="mb-4 pt-2 pb-7">
                        <label
                            htmlFor="sale_date"
                            className="block mb-1"
                        >
                            Sale Date:
                        </label>
                        <DatePicker
                            id="sale_date"
                            name="sale_date"
                            className="border-gray-700 hover:border-gray-700 focus-within:border-gray-200 bg-transparent hover:!bg-transparent focus-within:bg-transparent px-3 py-2 border rounded w-full dark:!text-light"
                            format="YYYY-MM-DD"
                            placeholder=""
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label
                        htmlFor="phone"
                        className="block mb-1"
                    >
                        Phone:
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light"
                    />
                </div>

                <div className="flex items-center gap-3 w-full">
                    <div className="relative mb-4 w-full select-box">
                        <label
                            htmlFor="selectPerson"
                            className="block mb-1"
                        >
                            Customers
                        </label>
                        <Select
                            defaultValue="jack"
                            style={{ width: 200 }}
                            onChange={handleSelectCustomer}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'Yiminghe' },
                                {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                },
                            ]}
                        />
                    </div>
                    <div className="relative mb-4 w-full select-box">
                        <label
                            htmlFor="selectPerson"
                            className="block mb-1"
                        >
                            Select Person
                        </label>
                        <Select
                            defaultValue="jack"
                            style={{ width: 200 }}
                            onChange={handleSelectChange}
                            options={[
                                { value: 'jack', label: 'Jack' },
                                { value: 'lucy', label: 'Lucy' },
                                { value: 'Yiminghe', label: 'Yiminghe' },
                                {
                                    value: 'disabled',
                                    label: 'Disabled',
                                    disabled: true,
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className="mt-2 mb-4">
                    <label
                        htmlFor="description"
                        className="block mb-1"
                    >
                        Description
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full h-[160px] dark:text-light"
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
