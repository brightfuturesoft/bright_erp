import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Modal, Form, Input as AntdInput, Upload } from 'antd';
import { EditOutlined, DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CommonBtn from '../../../Hooks/CommonBtn';

interface DataType {
    key: React.Key;
    photo: string;
    name: string;
    email: string;
    phone: string;
    customerType: string;
    website: string;
}

const initialData: DataType[] = [];
for (let i = 0; i < 10; i++) {
    initialData.push({
        key: i,
        photo: `https://via.placeholder.com/150?text=Photo+${i}`,
        name: `Edward King ${i}`,
        email: `edward.king${i}@example.com`,
        phone: `123456789${i}`,
        customerType: i % 2 === 0 ? 'Regular' : 'Premium',
        website: `https://website${i}.com`,
    });
}

const customerDefaultValue = {
    key: 0,
    photo: 'https://via.placeholder.com/150?text=Photo+Default',
    name: 'nahid 360',
    email: 'mdnahid360s@gmail.com',
    phone: '01303531371',
    customerType: 'Regular',
    website: 'https://defaultwebsite.com',
};

const ManageDirectSale: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [form] = Form.useForm();

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchText(value);
        const filteredData = initialData.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase()) ||
            item.email.toLowerCase().includes(value.toLowerCase()) ||
            item.phone.includes(value) ||
            item.customerType.toLowerCase().includes(value.toLowerCase()) ||
            item.website.toLowerCase().includes(value.toLowerCase())
        );
        setData(filteredData);
    };



    const handleEdit = (record: DataType) => {
        setEditingRecord({ ...customerDefaultValue, ...record });
        setIsModalVisible(true);
    };

    const handleDelete = (key: React.Key) => {
        const newData = data.filter((item) => item.key !== key);
        setData(newData);
    };

    const handleModalOk = () => {
        setIsModalVisible(false);
        setEditingRecord(null);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setEditingRecord(null);
    };

    const handleFormSubmit = (values: DataType) => {
        console.log('Edited values:', values);
        const newData = data.map((item) => {
            if (item.key === values.key) {
                return values;
            }
            return item;
        });
        setData(newData);
        form.resetFields(); // Reset form fields
        handleModalOk(); // Close modal
    };


    useEffect(() => {
        if (editingRecord) {
            form.setFieldsValue(editingRecord);
        }
    }, [editingRecord, form]);



    // const data = [
    //     {
    //         item: 'tis is photo url',
    //         nam: 'nahid 360',
    //         unit: '10',
    //         quantity: 10,
    //         price: 100,
    //         discount: 4,
    //         vat: 30,
    //         amount: 12,
    //         inventory: 'ds;ak'
    //     }
    // ]

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            render: (photo) => <img src={photo} alt="Photo" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Customer Type',
            dataIndex: 'customerType',
        },
        {
            title: 'Website',
            dataIndex: 'website',
            render: (website) => <a href={website} target="_blank" rel="noopener noreferrer">{website}</a>,
        },
        {
            title: 'Action',
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    />
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.key)}
                    />
                </>
            ),
        },
    ];

    return (
        <div>
            <div className='mt-3' style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Button className='!bg-[#3946d1] !text-white !border-none !rounded' size='large' type='primary' onClick={start} disabled={!hasSelected} loading={loading}>
                        Reload
                    </Button>
                    <span style={{ marginLeft: 8 }}>
                        {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        className='bg-transparent border border-gray-700 rounded px-3 py-2 text-white placeholder:text-gray-600'
                        placeholder="Search by Name, Email, Phone, Type, or Website"
                        value={searchText}
                        onChange={handleSearch}
                        style={{ width: 200 }}
                    />

                    <Link className='!bg-[#3946d1] !text-white !border-none !rounded py-2.5 px-4 text-sm text-nowrap ' to={`create-customer`}>+Add Customer</Link>
                </div>
            </div>
            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />

            <Modal
                title="Edit Customer"
                visible={isModalVisible}
                onOk={handleModalOk}
                onCancel={handleModalCancel}
                footer={null}
            >
                {editingRecord && (
                    <Form
                        form={form}
                        initialValues={editingRecord}
                        onFinish={handleFormSubmit}
                    >
                        <Form.Item
                            name="key"
                            style={{ display: 'none' }}
                        >
                            <AntdInput />
                        </Form.Item>

                        <div className="edit-img relative">
                            <Form.Item
                                name="photo"
                                label="Photo URL"
                                rules={[{ required: true, message: 'Please input the photo URL!' }]}
                            >
                                <Upload
                                    name="photo"
                                    action="/uploadPhoto"
                                    listType="picture"
                                    beforeUpload={() => false} // To prevent immediate upload
                                    maxCount={1} // Restrict to only one file upload
                                >
                                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                                </Upload>

                            </Form.Item>

                        </div>

                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[{ required: true, message: 'Please input the name!' }]}
                        >
                            <AntdInput />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[{ required: true, message: 'Please input the email!' }]}
                        >
                            <AntdInput />
                        </Form.Item>
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[{ required: true, message: 'Please input the phone!' }]}
                        >
                            <AntdInput />
                        </Form.Item>
                        <Form.Item
                            name="customerType"
                            label="Customer Type"
                            rules={[{ required: true, message: 'Please select the customer type!' }]}
                        >
                            <AntdInput />
                        </Form.Item>
                        <Form.Item
                            name="website"
                            label="Website"
                            rules={[{ required: true, message: 'Please input the website!' }]}
                        >
                            <AntdInput />
                        </Form.Item>
                        <Form.Item>
                            <CommonBtn back={false} type="submit">
                                Update
                            </CommonBtn>
                        </Form.Item>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default ManageDirectSale;
