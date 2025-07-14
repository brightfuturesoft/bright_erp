import React, { useState, useEffect } from 'react';
import {
    Button,
    Table,
    Input,
    Modal,
    Form,
    Upload,
    Dropdown,
    Menu,
    Select,
} from 'antd';
import {
    DeleteOutlined,
    MoreOutlined,
    ReloadOutlined,
    SearchOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { SearchBar } from '../../../../../common/SearchBar';
import { Edit } from 'lucide-react';
import DashboardContentHeader from '../../../../../wraper/DashboardContentHeader';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';

const { Option } = Select;

interface DataType {
    key: React.Key;
    photo: string;
    name: string;
    email: string;
    phone: string;
    customerType: string;
    customerSince: string;
    customerCode?: string;
    customerStatus?: string;
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
        customerSince: 'https://defaultwebsite.com',
        customerCode: `CODE-${i}`,
        customerStatus: i % 2 === 0 ? 'Active' : 'Inactive',
    });
}

const customerDefaultValue = {
    key: 0,
    photo: 'https://via.placeholder.com/150?text=Photo+Default',
    name: 'nahid 360',
    email: 'mdnahid360s@gmail.com',
    phone: '01303531371',
    customerType: 'Regular',
    customerSince: 'https://defaultwebsite.com',
};

const ManageCustomer: React.FC = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchOn, setSearchOn] = useState(false);
    const [data, setData] = useState(initialData);
    const [searchText, setSearchText] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<DataType | null>(null);
    const [form] = Form.useForm();
    const [filterCustomerType, setFilterCustomerType] = useState('');
    const [filterCustomerStatus, setFilterCustomerStatus] = useState('');

    const start = () => {
        setLoading(true);
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };

    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
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
        filterData(value, filterCustomerType, filterCustomerStatus);
    };

    const handleFilterChange = (type: string, value: string) => {
        if (type === 'customerType') {
            setFilterCustomerType(value);
        } else {
            setFilterCustomerStatus(value);
        }
        filterData(
            searchText,
            type === 'customerType' ? value : filterCustomerType,
            type === 'customerStatus' ? value : filterCustomerStatus
        );
    };

    const filterData = (
        searchValue: string,
        customerType: string,
        customerStatus: string
    ) => {
        const filteredData = initialData.filter(
            item =>
                (item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                    item.email
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    item.phone.includes(searchValue) ||
                    item.customerType
                        .toLowerCase()
                        .includes(searchValue.toLowerCase()) ||
                    item.customerSince
                        .toLowerCase()
                        .includes(searchValue.toLowerCase())) &&
                (customerType ? item.customerType === customerType : true) &&
                (customerStatus ? item.customerStatus === customerStatus : true)
        );
        setData(filteredData);
    };

    const handleEdit = (record: DataType) => {
        setEditingRecord({ ...customerDefaultValue, ...record });
        setIsModalVisible(true);
    };

    const handleDelete = (key: React.Key) => {
        const newData = data.filter(item => item.key !== key);
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
        const newData = data.map(item => {
            if (item.key === values.key) {
                return values;
            }
            return item;
        });
        setData(newData);
        form.resetFields();
        handleModalOk();
    };

    useEffect(() => {
        if (editingRecord) {
            form.setFieldsValue(editingRecord);
        }
    }, [editingRecord, form]);

    const menu = (record: DataType) => (
        <Menu className="w-[160px]">
            <Menu.Item
                key="edit"
                onClick={() => handleEdit(record)}
            >
                <div className="flex items-center gap-1">
                    <Edit size={17} /> Edit
                </div>
            </Menu.Item>
            <Menu.Item
                key="delete"
                onClick={() => handleDelete(record.key)}
            >
                <div className="flex items-center gap-1">
                    <DeleteOutlined /> Delete
                </div>
            </Menu.Item>
        </Menu>
    );

    const columns = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            render: photo => (
                <img
                    src={photo}
                    alt="Photo"
                    style={{ width: 50, height: 50 }}
                />
            ),
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
            title: 'Customer Since',
            dataIndex: 'customerSince',
        },
        {
            title: 'Customer Code',
            dataIndex: 'customerCode',
        },
        {
            title: 'Customer Type',
            dataIndex: 'customerType',
        },
        {
            title: 'Status',
            dataIndex: 'customerStatus',
            render: status => (
                <div
                    className={`status-badge px-2 pt-0.5 flex items-center justify-center pb-0.5 !w-[70px] shape-z ${
                        status === 'Active'
                            ? 'bg-green-500 text-white'
                            : 'bg-red-500 text-white'
                    }`}
                >
                    {status}
                </div>
            ),
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (_, record) => (
                <Dropdown
                    overlay={menu(record)}
                    trigger={['click']}
                >
                    <Button icon={<MoreOutlined />} />
                </Dropdown>
            ),
        },
    ];

    return (
        <div className="dark:text-light text-dark md:w-full w-[90vw] m-auto">
            <DashboardContentHeader>
                <DashboardTitle title="Manage Customer" />

                <div className="md:flex hidden items-center gap-2">
                    <Select
                        placeholder="Filter by Customer Type"
                        onChange={value =>
                            handleFilterChange('customerType', value)
                        }
                        style={{ width: 200 }}
                    >
                        <Option value="">All</Option>
                        <Option value="Regular">Regular</Option>
                        <Option value="Premium">Premium</Option>
                    </Select>
                    <Select
                        placeholder="Filter by Customer Status"
                        onChange={value =>
                            handleFilterChange('customerStatus', value)
                        }
                        style={{ width: 200 }}
                    >
                        <Option value="">All</Option>
                        <Option value="Active">Active</Option>
                        <Option value="Inactive">Inactive</Option>
                    </Select>
                </div>

                <div className="md:hidden flex items-center gap-1">
                    <Link
                        className="!bg-[#3946d1] w-[32px] h-[32px] flex items-center justify-center rounded-full !border-none !text-white text-nowrap text-sm"
                        to={`create-customer`}
                    >
                        <PlusOutlined style={{ fontSize: 14 }} />
                    </Link>

                    <Button
                        className="!bg-[#3946d1] rounded-full !border-none !text-white"
                        size="medium"
                        shape={'circle'}
                        type="primary"
                        onClick={start}
                        disabled={!hasSelected}
                        loading={loading}
                        icon={
                            <ReloadOutlined
                                className={`${loading ? 'rotate-45' : 'rotate-0'} duration-150`}
                            />
                        }
                    />
                    <Button
                        onClick={() => setSearchOn(!searchOn)}
                        className="!bg-[#3946d1] rounded-full !border-none !text-white"
                        size="medium"
                        shape={'circle'}
                        type="primary"
                        loading={loading}
                        icon={<SearchOutlined style={{ fontSize: 16 }} />}
                    />
                </div>
            </DashboardContentHeader>

            {searchOn && (
                <div className="relative">
                    <SearchBar
                        searchText={searchText}
                        handleSearch={handleSearch}
                    />
                </div>
            )}

            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                scroll={{ x: 1300 }}
            />

            <EditCustomerModal
                isModalVisible={isModalVisible}
                handleModalOk={handleModalOk}
                handleModalCancel={handleModalCancel}
                editingRecord={editingRecord}
                form={form}
                handleFormSubmit={handleFormSubmit}
            />
        </div>
    );
};

export default ManageCustomer;
