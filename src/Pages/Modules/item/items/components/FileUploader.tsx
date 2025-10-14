import React from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { Dragger } = Upload;

interface FileUploaderProps {
    uploadProps: UploadProps;
}

const FileUploader: React.FC<FileUploaderProps> = ({ uploadProps }) => {
    return (
        <div className="mx-auto w-2/5">
            <div className="p-12">
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="dark:text-white text-black">
                        Click or drag file to this area to upload
                    </p>
                    <p className="dark:text-gray-400 text-black">
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                    </p>
                </Dragger>
            </div>
        </div>
    );
};

export default FileUploader;
