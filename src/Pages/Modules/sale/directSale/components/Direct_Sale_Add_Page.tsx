import { InboxOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Select,
    Button,
    Typography,
    Upload,
    Spin,
    message,
} from 'antd';
import { useContext, useState } from 'react';
import { Erp_context } from '@/provider/ErpContext';
import { useNavigate } from 'react-router-dom';
import uploadImage from '@/helpers/hooks/uploadImage';
import DirectSaleItems from './DirectSaleItems';
import DirectSaleSummary from './DirectSaleSummary';
import { DatePicker } from 'antd';
import SingleImageUpload from './SingleImageUpload';

const { Dragger } = Upload;
const { TextArea } = Input;
const { Text } = Typography;

const AddDirectSale: React.FC = () => {
    const { user } = useContext(Erp_context);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    const uploadProps = {
        name: 'file',
        multiple: true,
        accept: '.jpg,.jpeg,.png,.gif,.webp',
        action: '/upload',
        onChange(info: any) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                console.log(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (
        <Spin spinning={loading}>
            <Form
                form={form}
                layout="vertical"
                onFinish={async values => {
                    try {
                        setLoading(true);
                        const payload = {
                            ...values,
                            attachments: uploadedFiles,
                        };

                        const res = await fetch(
                            `${import.meta.env.VITE_BASE_URL}sales/direct/create-direct-sale`,
                            {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    authorization: `${user?._id}`,
                                    workspace_id: `${user?.workspace_id}`,
                                },
                                body: JSON.stringify(payload),
                            }
                        );

                        const data = await res.json();
                        if (!data.error) {
                            message.success('Direct sale added successfully');
                            navigate(-1);
                            form.resetFields();
                            setUploadedFiles([]);
                        } else {
                            message.error(
                                data.message || 'Something went wrong'
                            );
                        }
                    } catch (err) {
                        console.error(err);
                        message.error('Network error');
                    } finally {
                        setLoading(false);
                    }
                }}
            >
                <h1 className="text-xl dark:text-white my-5 font-semibold">
                    Add Direct Sale
                </h1>
                <div className="grid grid-cols-4 gap-6">
                    <div className="col-span-2 space-y-4">
                        <Form.Item
                            label="Direct Sale Number"
                            name="sale_number"
                        >
                            <Input
                                disabled
                                placeholder="Auto Generated"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Sale Date"
                            name="sale_date"
                            rules={[
                                {
                                    required: true,
                                    message: 'Sale Date is required',
                                },
                            ]}
                        >
                            <DatePicker
                                className="w-full bg-white text-black dark:bg-gray-800 dark:text-white border dark:border-gray-700 rounded"
                                popupClassName="dark:bg-gray-900 dark:text-white" // popup calendar dark mode
                            />
                        </Form.Item>

                        <Form.Item
                            label="Customer"
                            name="customer"
                            rules={[
                                {
                                    required: true,
                                    message: 'Customer is required',
                                },
                            ]}
                        >
                            <Select placeholder="Select Customer" />
                        </Form.Item>

                        <Form.Item
                            label="Sales Person"
                            name="sales_person"
                            rules={[
                                {
                                    required: true,
                                    message: 'Sales Person is required',
                                },
                            ]}
                        >
                            <Select placeholder="Select User" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                        >
                            <TextArea
                                rows={3}
                                placeholder="Description"
                                className="dark-placeholder"
                            />
                        </Form.Item>
                    </div>

                    <div className="col-span-1 space-y-4 w-[500px] ml-20">
                        <p className="font-semibold dark:text-white my-2">
                            Upload File
                        </p>
                        <SingleImageUpload
                            uploadedFiles={uploadedFiles}
                            setUploadedFiles={setUploadedFiles}
                        />
                    </div>
                </div>
                <DirectSaleItems form={form} />

                <div className="w-full flex flex-col lg:flex-row gap-20">
                    {/* Notes/Terms */}
                    <div className="flex-1 my-10">
                        <Form.Item
                            label="Notes/Terms"
                            name="notes"
                        >
                            <TextArea
                                rows={6}
                                placeholder="Enter notes or terms"
                                className="dark-placeholder w-full h-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </Form.Item>
                    </div>

                    {/* DirectSaleSummary */}
                    <div className="w-full lg:w-[500px] pb-20">
                        <DirectSaleSummary form={form} />
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-800 py-4 px-5 flex justify-end gap-3 shadow-md z-50 border-t dark:border-gray-700">
                    <Button onClick={() => navigate(-1)}>Cancel</Button>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        Save
                    </Button>
                </div>
            </Form>
        </Spin>
    );
};

export default AddDirectSale;
