import { Button, DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { UploadCloud, X } from 'lucide-react';
import React from 'react';

const Basic_Information = ({
    getRootProps,
    uploadedImage,
    getInputProps,
    handleDeleteImage,
    setDate,
}) => {
    const dateFormat = 'YYYY-MM-DD';

    const handleDateChange = (date, dateString) => {
        setDate(dayjs(dateString).format('YYYY-MM-DD'));
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDatePickerChange = (
        date: dayjs.Dayjs | null,
        dateString: string
    ) => {};

    return (
        <div className="mt-3 dark:bg-gray-800  bg-[#a2a2f514] p-4">
            <h4 className="text-sm md:pb-0 pb-4 font-semibold text-gray-500">
                Basic Information
            </h4>

            <div className="grid md:grid-cols-4 gap-3">
                <div className="md:col-span-3  text-light">
                    <div className="grid md:grid-cols-3  border-b md:mb-2 dark:border-gray-700 gap-3">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="Nahid" />
                        </Form.Item>

                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true }]}
                        >
                            <Input
                                type="email"
                                placeholder="nahid@example.com"
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true }]}
                        >
                            <Input
                                type="tel"
                                placeholder="+88017123456"
                            />
                        </Form.Item>

                        <Form.Item
                            name="website"
                            label="Website"
                        >
                            <Input
                                type="url"
                                placeholder="https://example.com"
                            />
                        </Form.Item>

                        <Form.Item
                            name="customer_type"
                            label="Customer Type"
                        >
                            <Select
                                placeholder="Select an option"
                                className="custom-select"
                            >
                                <Select.Option value="option1">
                                    Option 1
                                </Select.Option>
                                <Select.Option value="option2">
                                    Option 2
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="as_Supplier"
                            label="As Supplier"
                        >
                            <Select
                                placeholder="Select an option"
                                className="custom-select"
                            >
                                <Select.Option value="option1">
                                    Option 1
                                </Select.Option>
                                <Select.Option value="option2">
                                    Option 2
                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <Form.Item
                            name="opening_balance"
                            label="Opening Balance"
                        >
                            <Input
                                type="url"
                                placeholder="00.0000"
                            />
                        </Form.Item>

                        <Form.Item
                            name="till_date"
                            label="Till Date"
                        >
                            <DatePicker
                                defaultValue={dayjs('2019-09-03', dateFormat)}
                                minDate={dayjs('2019-06-01', dateFormat)}
                                maxDate={dayjs('2020-06-30', dateFormat)}
                                onChange={handleDateChange}
                            />
                        </Form.Item>
                    </div>
                </div>

                <div>
                    <div className=" dark:text-white">
                        <div
                            {...getRootProps()}
                            className="border-dashed border-2 relative h-[280px] flex items-center justify-center border-gray-300 p-4 overflow-hidden text-center cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            {uploadedImage ? (
                                <div className="overflow-hidden">
                                    <img
                                        src={uploadedImage}
                                        alt="Uploaded"
                                        className="w-full h-[270px] object-cover"
                                    />
                                    <button
                                        onClick={handleDeleteImage}
                                        className="absolute top-2 right-2 w-[30px] h-[30px] bg-red-500 dark:text-white text-black flex items-center justify-center text-xl rounded-full"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col">
                                    <p>Drag 'n' drop an image here</p>
                                    <div className="text-center">OR</div>
                                    <Button
                                        type="primary"
                                        icon={<UploadCloud size={20} />}
                                        className="mt-4 flex items-center justify-center"
                                    >
                                        <p>Upload Image</p>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Basic_Information;
