import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, Button, message } from 'antd';
import { useState, useEffect } from 'react';
const { Dragger } = Upload;
const SingleImageUpload = ({ uploadedFiles, setUploadedFiles }) => {
    const [fileList, setFileList] = useState([]);
    useEffect(() => {
        if (uploadedFiles.length === 0) setFileList([]);
        else {
            // existing image thakle set kore
            setFileList([
                {
                    uid: '-1',
                    name: 'Existing Image',
                    status: 'done',
                    url: uploadedFiles[0],
                },
            ]);
        }
    }, [uploadedFiles]);
    const uploadProps = {
        name: 'file',
        multiple: false,
        accept: '.jpg,.jpeg,.png,.gif,.webp',
        fileList,
        onRemove(file) {
            setFileList([]);
            setUploadedFiles([]);
        },
        beforeUpload(file) {
            if (fileList.length >= 1) {
                message.warning('You can only upload 1 image at a time');
                return Upload.LIST_IGNORE;
            }
            setFileList([file]);
            setUploadedFiles([file]); // file object, onFinish e upload hobe
            return false; // prevent auto upload
        },
    };
    return _jsx('div', {
        className: 'w-full h-96',
        children:
            fileList.length === 0
                ? _jsxs(Dragger, {
                      ...uploadProps,
                      className:
                          'h-full flex flex-col items-center justify-center dark:bg-gray-800 dark:text-white rounded',
                      children: [
                          _jsx('p', {
                              className: 'ant-upload-drag-icon',
                              children: _jsx(InboxOutlined, {}),
                          }),
                          _jsx('p', {
                              className:
                                  'text-black dark:text-white text-center',
                              children:
                                  'Click or drag file to upload (Only JPG, PNG, GIF, WEBP allowed)',
                          }),
                      ],
                  })
                : _jsxs('div', {
                      className: 'relative w-full h-full',
                      children: [
                          _jsx('img', {
                              src: fileList[0].originFileObj
                                  ? URL.createObjectURL(
                                        fileList[0].originFileObj
                                    )
                                  : fileList[0].url,
                              alt: 'uploaded',
                              className:
                                  'w-full h-full object-contain rounded-md border dark:border-gray-600',
                          }),
                          _jsx(Button, {
                              type: 'primary',
                              danger: true,
                              size: 'small',
                              className: 'absolute top-2 right-2',
                              onClick: () => {
                                  setFileList([]);
                                  setUploadedFiles([]);
                              },
                              children: 'Delete',
                          }),
                      ],
                  }),
    });
};
export default SingleImageUpload;
