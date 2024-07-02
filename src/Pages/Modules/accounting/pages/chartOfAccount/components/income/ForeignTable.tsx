import { useState } from "react";
import { Button, Form, Input, Modal, Select, Pagination, Empty } from "antd";
import TextArea from "antd/es/input/TextArea";

const ForeignTable: React.FC = ({ data }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page

  const pageSize = 5; // Set the number of items per page

  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  const costData =
    data?.data?.filter((itm) => itm.category === "Foreign") || [];
  const paginatedData = costData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
    console.log("Edit Form Data:", values);
    setIsEditModalOpen(false);
  };

  const onAddFinish = (values) => {
    console.log("Add Form Data:", values);
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
            <h2 className="font-semibold text-2xl dark:text-light capitalize">
              {data?.label}
            </h2>
            <Button
              type="primary"
              className="bg-blue-500 dark:bg-light-dark !shadow-none px-4 rounded !h-[40px] text-white"
              onClick={showAddModal}
            >
              Add Items
            </Button>
          </div>
          <div className="border-gray-200 dark:border-gray-700 border overflow-x-auto">
            <table className="min-w-full">
              <thead className="dark:text-gray-200">
                <tr>
                  <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                    Cost
                  </th>
                  <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                    AC Name
                  </th>
                  <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                    Description
                  </th>
                  <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                    Status
                  </th>
                  <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="dark:text-gray-500">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b text-center whitespace-no-wrap"
                    >
                      <Empty
                        className="flex flex-col justify-center items-center"
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{ height: 60 }}
                        description={
                          <span className="text-dark dark:text-gray-400">
                            No Data Found!
                          </span>
                        }
                      ></Empty>
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((itm, index) => (
                    <tr key={index}>
                      <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-no-wrap">
                        <div className="text-sm leading-5">{itm.amount}</div>
                      </td>
                      <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-no-wrap">
                        <div className="text-sm leading-5">{itm?.ac_name}</div>
                      </td>
                      <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b w-[300px] text-justify text-nowrap whitespace-no-wrap">
                        <div className="text-sm leading-5">
                          {itm?.description}
                        </div>
                      </td>
                      <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-no-wrap">
                        {itm?.status ? (
                          <div className="flex justify-center items-center bg-[#00800038] dark:bg-[#00802038] rounded-full w-[90px] h-[25px] text-[#306830] text-xs dark:text-green-400">
                            Active
                          </div>
                        ) : (
                          <div className="flex justify-center items-center bg-[#ff00222f] dark:bg-[#80004638] rounded-full w-[90px] h-[25px] text-[red] text-xs dark:text-red-400">
                            Inactive
                          </div>
                        )}
                      </td>
                      <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-no-wrap">
                        <button
                          onClick={showEditModal}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* Pagination */}
        {costData.length > pageSize && (
          <div className="flex justify-end mt-4">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={costData.length}
              onChange={handlePageChange}
            />
          </div>
        )}
        {/* Add Item Modal */}
        <Modal
          footer={false}
          className="!shadow-none"
          title={`Add Expense Account > ${data?.label}`}
          open={isAddModalOpen}
          onOk={handleAddOk}
          onCancel={handleAddCancel}
        >
          <Form form={addForm} onFinish={onAddFinish}>
            <Form.Item
              name="ac_name"
              rules={[
                { required: true, message: "Please input the account name!" },
              ]}
            >
              <Input className="rounded h-[42px]" placeholder="Account Name" />
            </Form.Item>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <TextArea
                className="dark:border-gray-700 bg-transparent hover:!bg-transparent focus-within:bg-transparent focus:bg-transparent text-dark dark:text-light"
                showCount
                maxLength={100}
                placeholder="Description"
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item className="p-0 text-start">
              <Button
                type="primary"
                htmlType="submit"
                className="shadow-none mr-2 rounded"
              >
                Add
              </Button>
              <Button
                className="!bg-red-600 shadow-none border-none rounded text-light hover:!text-light"
                ghost={true}
                onClick={handleAddCancel}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        {/* Edit Item Modal */}
        <Modal
          footer={false}
          className="!shadow-none"
          title={`Update Expense Account > ${data?.label}`}
          open={isEditModalOpen}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
        >
          <Form form={editForm} onFinish={onEditFinish}>
            <div className="gap-2 grid grid-cols-2">
              <Form.Item
                name="ac_name"
                rules={[
                  { required: true, message: "Please input the account name!" },
                ]}
              >
                <Input
                  className="rounded h-[42px]"
                  placeholder="Account Name"
                />
              </Form.Item>
              <Form.Item
                name="accountCategory"
                rules={[
                  {
                    required: true,
                    message: "Please select the account category!",
                  },
                ]}
              >
                <Select
                  placeholder="Select a category"
                  className="w-full"
                  options={[
                    { value: "costOfGoodsSold", label: "Cost of Goods Sold" },
                    { value: "operatingExpense", label: "Operating Expense" },
                    { value: "payrollExpense", label: "Payroll Expense" },
                    {
                      value: "uncategorizedExpense",
                      label: "Uncategorized Expense",
                    },
                  ]}
                />
              </Form.Item>
            </div>
            <Form.Item
              name="description"
              rules={[
                { required: true, message: "Please input the description!" },
              ]}
            >
              <TextArea
                className="dark:border-gray-700 bg-transparent hover:!bg-transparent focus-within:bg-transparent focus:bg-transparent text-dark dark:text-light"
                showCount
                maxLength={100}
                placeholder="Description"
                style={{ height: 120, resize: "none" }}
              />
            </Form.Item>
            <Form.Item className="p-0 text-start">
              <Button
                type="primary"
                htmlType="submit"
                className="shadow-none mr-2 rounded"
              >
                Update
              </Button>
              <Button
                className="!bg-red-600 shadow-none border-none rounded text-light hover:!text-light"
                ghost={true}
                onClick={handleEditCancel}
              >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ForeignTable;
