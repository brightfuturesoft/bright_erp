/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { Trash } from 'lucide-react';

const EditCategoryModal: React.FC<{
    visible: boolean;
    onCancel: () => void;
    onOk: (values: any) => void;
    category: any;
}> = ({ visible, onCancel, onOk, category }) => {
    const [form] = Form.useForm();
    const [imagePreview, setImagePreview] = useState<string | null>(
        category.img || null
    );
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    form.setFieldsValue({
        ...category,
        parentCategory: category.parentCategory?.name,
    });

    const handleFinish = (values: any) => {
        const data = {
            id: category?.id,
            name: values?.name ?? category?.name,
            img: values?.img ?? category?.img,
            position: values?.position ?? category?.position,
            children: category?.children,
        };
        onOk(values);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Display file name
            setSelectedFile(file);

            // Display image preview
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    setImagePreview(reader.result);
                    form.setFieldsValue({ image: reader.result });
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setImagePreview(null);
        setSelectedFile(null);
        form.setFieldsValue({ image: null });
    };

    return (
        <Modal
            title={`Edit Category: ${category.name}`}
            visible={visible}
            onCancel={onCancel}
            width={600}
            footer={false}
        >
            <Form
                form={form}
                onFinish={handleFinish}
                layout="vertical"
            >
                <div className="md:grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter category name',
                                },
                            ]}
                        >
                            <Input className="dark:text-gray-300 text-black" />
                        </Form.Item>
                        <Form.Item
                            name="position"
                            label="Position"
                        >
                            <Input className="dark:text-gray-300 text-black" />
                        </Form.Item>
                    </div>
                    <div>
                        <div className="border border-dashed rounded overflow-hidden dark:border-gray-700 border-gray-400 h-[160px] mt-4 relative m-auto p-2 text-center flex items-center justify-center">
                            <h3 className="absolute dark:text-light flex flex-col  text-dark">
                                Upload{' '}
                                <span className="text-xs text-primary">
                                    Category Image
                                </span>
                            </h3>

                            <Form.Item
                                name="image"
                                className="w-full h-full absolute top-0 left-0 right-0 bottom-0"
                                // rules={[{ required: true, message: 'Please upload category image' }]}
                            >
                                {!imagePreview && (
                                    <input
                                        id="imageUpload"
                                        className="h-[400px] absolute -top-20 left-0 right-0 bottom-0 "
                                        type="file"
                                        // style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        accept="image/*"
                                    />
                                )}

                                {imagePreview && (
                                    <div className="flex  items-center justify-center w-full h-[160px] mt-[-3px] z-20">
                                        <img
                                            className=" w-full h-full object-cover"
                                            src={imagePreview}
                                            alt="Preview"
                                            style={{
                                                maxWidth: '100%',
                                                marginTop: '10px',
                                            }}
                                        />
                                        <div className="absolute bg-gradient-to-t  from-black to-transparent  w-full left-0 h-[60px] flex items-center  justify-center pb-3 right-0 bottom-0 z-[8000]">
                                            <Button
                                                danger
                                                shape="circle"
                                                onClick={handleDeleteImage}
                                                className=" bg-[#cf2b49ea] !text-[#ffffff] hover:!bg-[#ff0040]"
                                            >
                                                <Trash size={16} />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <div className="flex mt-3 gap-2 items-center justify-end">
                    <Button
                        key="cancel"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        key="submit"
                        htmlType="submit"
                        type="primary"
                        onClick={() => form.submit()}
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};

export default EditCategoryModal;
