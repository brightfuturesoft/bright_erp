import { InboxOutlined } from '@ant-design/icons';
import { Upload, Button, message } from 'antd';
import { useState, useEffect } from 'react';
const { Dragger } = Upload;

interface Props {
    uploadedFiles: string[];
    setUploadedFiles: (files: string[]) => void;
}

const SingleImageUpload: React.FC<Props> = ({
    uploadedFiles,
    setUploadedFiles,
}) => {
    const [fileList, setFileList] = useState<any[]>([]);

    useEffect(() => {
        if (uploadedFiles.length === 0) setFileList([]);
    }, [uploadedFiles]);

    const uploadProps = {
        name: 'file',
        multiple: false,
        accept: '.jpg,.jpeg,.png,.gif,.webp',
        fileList,
        action: '/upload', // replace with your upload URL
        onChange(info: any) {
            const { status } = info.file;
            if (status === 'done') {
                message.success(`${info.file.name} uploaded successfully`);
                setUploadedFiles([info.file.name]);
            } else if (status === 'error') {
                message.error(`${info.file.name} upload failed.`);
            }
            setFileList(info.fileList.slice(-1));
        },
        onRemove(file: any) {
            setFileList([]);
            setUploadedFiles([]);
        },
        beforeUpload(file: any) {
            if (fileList.length >= 1) {
                message.warning('You can only upload 1 image at a time');
                return Upload.LIST_IGNORE;
            }
            return true;
        },
    };

    return (
        <div className="w-full h-96">
            {fileList.length === 0 ? (
                <Dragger
                    {...uploadProps}
                    className="h-full flex flex-col items-center justify-center dark:bg-gray-800 dark:text-white rounded"
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="text-black dark:text-white text-center">
                        Click or drag file to upload (Only JPG, PNG, GIF, WEBP
                        allowed)
                    </p>
                </Dragger>
            ) : (
                <div className="relative w-full h-full">
                    <img
                        src={URL.createObjectURL(fileList[0].originFileObj)}
                        alt="uploaded"
                        className="w-full h-full object-contain rounded-md border dark:border-gray-600"
                    />
                    <Button
                        type="primary"
                        danger
                        size="small"
                        className="absolute top-2 right-2"
                        onClick={() => {
                            setFileList([]);
                            setUploadedFiles([]);
                        }}
                    >
                        Delete
                    </Button>
                </div>
            )}
        </div>
    );
};

export default SingleImageUpload;
