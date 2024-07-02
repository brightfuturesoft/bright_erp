import React, { useState } from "react";
import { Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CommonBtn from "../../../Hooks/CommonBtn";

const AddCustomer: React.FC = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Add the uploaded file data to form data
    if (file) {
      formData.append("photo", file);
    }

    const data = Object.fromEntries(formData.entries());
    console.log(data);
    // Here you can submit the form data to your backend or perform any other action
  };

  const handleChange = ({ fileList }) => {
    // Capture the file data
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
    } else {
      setFile(null);
    }
  };

  return (
    <div className="mx-auto py-6">
      <form
        className="bg-gray-100 dark:bg-light-dark shadow-md mx-auto p-6 rounded max-w-7xl text-dark dark:text-light"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-4 text-xl">Add Customer</h2>
        <div className="">
          <div className="md:space-y-2">
            <div>
              <label htmlFor="firstName" className="block mb-1">
                {" "}
                Name:
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light"
              />
            </div>

            <div className="relative pt-2 pb-7 upload-box">
              <label htmlFor="photo" className="block mb-1">
                Photo:
              </label>
              <Upload
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleChange}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
              </Upload>
            </div>

            <div className="mb-4 pt-2 pb-7">
              <label htmlFor="email" className="block mb-1">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block mb-1">
            Phone:
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1">
            Address:
          </label>
          <textarea
            id="address"
            name="address"
            className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="customerType" className="block mb-1">
            Customer Type:
          </label>
          <select
            id="customerType"
            name="customerType"
            className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light"
          >
            <option value="">Select Customer Type</option>
            <option value="Regular">Regular</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="website" className="block mb-1">
            Website:
          </label>
          <input
            type="text"
            id="website"
            name="website"
            className="border-gray-700 bg-transparent px-3 py-2 border rounded w-full dark:text-light"
          />
        </div>
        <CommonBtn back={true} type="submit">
          Submit
        </CommonBtn>
      </form>
    </div>
  );
};

export default AddCustomer;
