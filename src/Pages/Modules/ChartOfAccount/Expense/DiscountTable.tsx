import { Button, Form, Input, Modal, Select, Pagination, Empty } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';

const DiscountTable: React.FC = ({ data }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 5; // Set the number of items per page

    const [editForm] = Form.useForm();
    const [addForm] = Form.useForm();

    const discountData = data?.data?.filter(itm => itm.category === "Discount") || [];
    const paginatedData = discountData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    console.log(data, '-----------');

    const handleEditOk = () => {
        setIsEditModalOpen(false);
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
    };

    const handleAddOk = () => {
        setIsAddModalOpen(false);
    };

    const handleAddCancel = () => {
        setIsAddModalOpen(false);
    };

    const showEditModal = () => {
        setIsEditModalOpen(true);
    };

    const showAddModal = () => {
        setIsAddModalOpen(true);
    };

    const onEditFinish = (values) => {
        console.log('Edit Form Data:', values);
        setIsEditModalOpen(false);
    };

    const onAddFinish = (values) => {
        console.log('Add Form Data:', values);
        setIsAddModalOpen(false);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className="">
                <div className="py-2">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold dark:text-light capitalize">{data?.label}</h2>
                        <Button type='primary' className="dark:bg-light-dark bg-blue-500 text-white px-4 !shadow-none !h-[40px] rounded" onClick={showAddModal}>Add Items</Button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border dark:border-gray-700 border-gray-200">
                            <thead className='dark:text-gray-200'>
                                <tr>
                                    <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                        Cost
                                    </th>
                                    <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                        AC Name
                                    </th>
                                    <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                        Description
                                    </th>
                                    <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='dark:text-gray-500'>
                                {
                                    paginatedData.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200 text-center">
                                                <Empty
                                                    className='flex justify-center flex-col items-center'
                                                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                                    imageStyle={{ height: 60 }}
                                                    description={
                                                        <span className='dark:text-gray-400 text-dark'>
                                                            No Data Found!
                                                        </span>
                                                    }
                                                >
                                                </Empty>
                                            </td>
                                        </tr>)
                                        :
                                        (paginatedData.map((itm, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200">
                                                    <div className="text-sm leading-5">{itm.amount}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200">
                                                    <div className="text-sm leading-5">{itm?.ac_name}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200 w-[300px] text-justify text-nowrap">
                                                    <div className="text-sm leading-5">{itm?.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200">
                                                    {itm?.status ? <div className="dark:bg-[#00802038] bg-[#00800038] dark:text-green-400 text-[#306830] w-[90px] rounded-full flex items-center justify-center text-xs h-[25px]">Active</div>
                                                        :
                                                        <div className="dark:bg-[#80004638] bg-[#ff00222f] text-[red] dark:text-red-400 w-[90px] rounded-full flex items-center justify-center text-xs h-[25px]">Inactive</div>}
                                                </td>
                                                <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200">
                                                    <button onClick={showEditModal} className="text-blue-500 hover:text-blue-700">Edit</button>
                                                </td>
                                            </tr>
                                        )))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Pagination */}
                {discountData.length > pageSize && (
                    <div className="flex justify-end mt-4">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={discountData.length}
                            onChange={handlePageChange}
                        />
                    </div>
                )}
                {/* Add Item Modal */}
                <Modal footer={false} className='!shadow-none' title={`Add Expense Account > Discount`} open={isAddModalOpen} onOk={handleAddOk} onCancel={handleAddCancel}>
                    <Form form={addForm} onFinish={onAddFinish}>

                        <Form.Item name="ac_name" rules={[{ required: true, message: 'Please input the account name!' }]}>
                            <Input className='h-[42px] rounded' placeholder="Account Name" />
                        </Form.Item>
                        <Form.Item name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                            <TextArea
                                className='bg-transparent hover:!bg-transparent focus-within:bg-transparent focus:bg-transparent dark:border-gray-700 dark:text-light text-dark'
                                showCount
                                maxLength={100}
                                placeholder="Description"
                                style={{ height: 120, resize: 'none' }}
                            />
                        </Form.Item>
                        <Form.Item className="text-start p-0">
                            <Button type="primary" htmlType="submit" className="mr-2 shadow-none rounded">
                                Add
                            </Button>
                            <Button className="rounded !bg-red-600 shadow-none hover:!text-light text-light border-none" ghost={true} onClick={handleAddCancel}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
                {/* Edit Item Modal */}
                <Modal footer={false} className='!shadow-none' title="Update Expense Account > Discount" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
                    <Form form={editForm} onFinish={onEditFinish}>
                        <div className="grid grid-cols-2 gap-2">
                            <Form.Item name="ac_name" rules={[{ required: true, message: 'Please input the account name!' }]}>
                                <Input className='h-[42px] rounded' placeholder="Account Name" />
                            </Form.Item>
                            <Form.Item name="accountCategory" rules={[{ required: true, message: 'Please select the account category!' }]}>
                                <Select
                                    placeholder="Select a category"
                                    className="w-full "
                                    options={[
                                        { value: 'costOfGoodsSold', label: 'Cost of Goods Sold' },
                                        { value: 'operatingExpense', label: 'Operating Expense' },
                                        { value: 'payrollExpense', label: 'Payroll Expense' },
                                        { value: 'uncategorizedExpense', label: 'Uncategorized Expense' },
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                            <TextArea
                                className='bg-transparent hover:!bg-transparent focus-within:bg-transparent focus:bg-transparent dark:border-gray-700 dark:text-light text-dark'
                                showCount
                                maxLength={100}
                                placeholder="Description"
                                style={{ height: 120, resize: 'none' }}
                            />
                        </Form.Item>
                        <Form.Item className="text-start p-0">
                            <Button type="primary" htmlType="submit" className="mr-2 shadow-none rounded">
                                Update
                            </Button>
                            <Button className="rounded !bg-red-600 shadow-none hover:!text-light text-light border-none" ghost={true} onClick={handleEditCancel}>
                                Cancel
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        </div>
    );
};

export default DiscountTable;
