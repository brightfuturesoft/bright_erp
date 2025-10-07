// import { ColumnsType } from "antd/es/table";
// import { Customer } from "./CustomerType";
// import { Breakpoint, Button, Dropdown } from "antd";
// import { MoreOutlined } from "@ant-design/icons";
// export const columns: ColumnsType<Customer> = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       responsive: ["xs", "sm", "md", "lg", "xl"] as Breakpoint[],
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       responsive: ["xs", "sm", "md", "lg", "xl"] as Breakpoint[],
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       responsive: ["xs", "sm", "md", "lg", "xl"] as Breakpoint[],
//     },
//     {
//       title: "Customer Since",
//       dataIndex: "customerSince",
//       responsive: ["sm", "md", "lg", "xl"] as Breakpoint[],
//     },
//     {
//       title: "Customer Code",
//       dataIndex: "customerCode",
//       responsive: ["sm", "md", "lg", "xl"] as Breakpoint[],
//     },
//     {
//       title: "Customer Type",
//       dataIndex: "customerType",
//       responsive: ["sm", "md", "lg", "xl"] as Breakpoint[],
//     },
//     {
//       title: "Status",
//       dataIndex: "customerStatus",
//       render: (status: string) => (
//         <div
//           className={`status-badge px-2 pt-0.5 flex items-center justify-center pb-0.5 !w-[70px] shape-z ${
//             status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white"
//           }`}
//         >
//           {status}
//         </div>
//       ),
//       responsive: ["sm", "md", "lg", "xl"] as Breakpoint[],
//     },
//     {
//       title: "Actions",
//       dataIndex: "actions",
//       render: (_, record) => (
//         <Dropdown overlay={menu(record)} trigger={["click"]}>
//           <Button
//             className="dark:text-light text-dark dark:bg-gray-700 dark:hover:!bg-gray-600 bg-gray-50"
//             icon={<MoreOutlined className="dark:text-light text-dark" />}
//           />
//         </Dropdown>
//       ),
//       responsive: ["xs", "sm", "md", "lg", "xl"] as Breakpoint[],
//     },
//   ];
