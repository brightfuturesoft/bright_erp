import { Modal } from "antd";
import { Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";

interface AddNewAccountModalProps {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const AddNewAccountModal: React.FC<AddNewAccountModalProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
}) => {
  const onGenderChange = (value: string) => {
    console.log(value);
  };

  return (
    <Modal
      title="Add a new account"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <form className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="acName">Account Name</label>
          <Input
            name="ac_name"
            className="focus:border-[1px] bg-transparent p-2 border focus:border-blue-600 rounded w-full h-[42px] hover"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="acName">Account Category</label>
          <Form.Item name="gender" rules={[{ required: true }]}>
            <Select
              className="hover:!border-none"
              onChange={onGenderChange}
              allowClear
            >
              <Select.Option value="mobile_banking">Mobile Bank</Select.Option>
              <Select.Option value="bank">Bank</Select.Option>
              <Select.Option value="cash">Cash</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <div className="space-y-1">
          <label htmlFor="acName">Description</label>

          <TextArea
            name="description"
            rows={6}
            className="border-gray-700 hover:border-gray-700 focus:border-[1px] bg-transparent hover:!bg-transparent focus:!bg-transparent p-2 border focus:border-blue-600 rounded w-full h-[42px] text-black dark:text-light"
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddNewAccountModal;
