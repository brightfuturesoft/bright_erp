import { Button, Form, Input, Upload } from 'antd';
import { UploadCloud } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const BasicInformation = ({
    getRootProps,
    uploadedImage,
    getInputProps,
    handleDeleteImage,
}) => {
    return (
        <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-500">
                Basic Information
            </h4>

            <div className="md:grid grid-cols-4 gap-4 mt-3">
                <div className="col-span-3">
                    <Form.Item
                        name="note"
                        label="Note"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </div>

                <div className="col-span-1 md:p-0  pt-4">
                    <div
                        {...getRootProps()}
                        className="border-dashed border-2 h-[280px] flex items-center justify-center border-gray-300 p-4 text-center cursor-pointer"
                    >
                        <input {...getInputProps()} />
                        {uploadedImage ? (
                            <div className="relative">
                                <img
                                    src={uploadedImage}
                                    alt="Uploaded"
                                    className="w-full h-auto"
                                />
                                <button
                                    onClick={handleDeleteImage}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
                                >
                                    &times;
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
    );
};

export default BasicInformation;
