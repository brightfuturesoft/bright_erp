import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Dropdown, Empty, Space, Pagination } from "antd";
import {
  DownloadOutlined,
  ExceptionOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CookingPot, Info, Pencil } from "lucide-react";
import DashboardTitle from "../../../CommonComponents/DashboardTitle";

const Journals: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const pageSize = 5;

  const data = [
    {
      reference_number: "1245434",
      date: "2024-05-31",
      status: true,
      description: "dfasdfasfasf",
      field: [
        {
          description: "sadfasdsasfas",
          account: "2nd menu item",
          debit: 4322,
          credit: 2340,
          status: "not-added",
        },
        {
          description: "DASFFAS",
          account: "",
          debit: 34,
          credit: 23,
          status: "not-added",
        },
      ],
      totalDebit: 4356,
      totalCredit: 2363,
      totalDifference: 1993,
    },
    {
      reference_number: "1245434",
      date: "2024-05-31",
      status: true,
      description: "dfasdfasfasf",
      field: [
        {
          description: "sadfasdsasfas",
          account: "2nd menu item",
          debit: 4322,
          credit: 2340,
          status: "not-added",
        },
        {
          description: "DASFFAS",
          account: "",
          debit: 34,
          credit: 23,
          status: "not-added",
        },
      ],
      totalDebit: 4356,
      totalCredit: 2363,
      totalDifference: 1993,
    },
    {
      reference_number: "1245434",
      date: "2024-05-31",
      status: false,
      description: "dfasdfasfasf",
      field: [
        {
          description: "sadfasdsasfas",
          account: "2nd menu item",
          debit: 4322,
          credit: 2340,
          status: "not-added",
        },
        {
          description: "DASFFAS",
          account: "",
          debit: 34,
          credit: 23,
          status: "not-added",
        },
      ],
      totalDebit: 4356,
      totalCredit: 2363,
      totalDifference: 1993,
    },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredData = data.filter(
    (item) =>
      item.reference_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Journals");
    XLSX.writeFile(workbook, "Journals.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Journals", 20, 10);
    doc.autoTable({
      head: [["Reference No", "Date", "Description", "Amount", "Status"]],
      body: data.map((row) => [
        row.reference_number,
        row.date,
        row.description,
        row.amount,
        row.status,
      ]),
    });
    doc.save("Journals.pdf");
  };

  const items = [
    {
      key: "1",
      label: (
        <button className="px-6" onClick={downloadExcel}>
          <ExceptionOutlined /> EXCEL
        </button>
      ),
    },
    {
      key: "2",
      label: (
        <button className="px-6" onClick={downloadPDF}>
          <FilePdfOutlined /> PDF
        </button>
      ),
    },
  ];

  return (
    <section>
      <header className="flex justify-between items-center border-gray-200 dark:border-gray-800 mt-3 pb-4 border-b">
        <DashboardTitle title={"Journals"} />
        <div className="flex items-center gap-2">
          <div className="md:flex items-center border-gray-200 dark:border-gray-700 hidden border rounded w-[300px] h-[40px]">
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent px-2 focus-visible:border-none w-full focus:outline-none h-full text-dark text-sm dark:text-light placeholder:dark:text-light"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <Space wrap>
            <Dropdown menu={{ items }} placement="bottomLeft">
              <Button
                type="primary"
                shape="circle"
                icon={<DownloadOutlined />}
                size="large"
              />
            </Dropdown>
          </Space>
          <Link to="/dashboard/accounting/chart_of_account/add_journals">
            <Button
              className="bg-primary border-none text-light"
              type="primary"
            >
              Add Journal
            </Button>
          </Link>
        </div>
      </header>
      <main className="text-dark dark:text-light">
        <div className="border-gray-200 dark:border-gray-700 border w-[92vw] md:w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="dark:text-gray-200">
              <tr>
                <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                  Reference No
                </th>
                <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                  Date
                </th>
                <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                  Description
                </th>
                <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                  Amount
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
                    colSpan="6"
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
                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b text-blue-500 hover:text-blue-300 whitespace-no-wrap duration-100 cursor-pointer">
                      <div className="text-sm leading-5">{`3233423`}</div>
                    </td>
                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-no-wrap">
                      <div className="text-sm leading-5">{itm?.date}</div>
                    </td>
                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b w-[300px] text-justify text-nowrap whitespace-no-wrap">
                      <div className="text-sm leading-5">
                        {itm?.description}
                      </div>
                    </td>
                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b w-[300px] text-justify text-nowrap whitespace-no-wrap">
                      <div className="text-sm leading-5">
                        {itm?.totalCredit}
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
                    <td className="flex items-center gap-1 border-gray-200 dark:border-gray-700 px-6 py-6 border-b whitespace-no-wrap">
                      <Link
                        to={`/dashboard/accounting/chart_of_account/journals_details/123`}
                      >
                        <Button
                          type="text"
                          shape="circle"
                          className="bg-[#3faa4cfa] hover:!bg-[green] p-1 !text-light"
                        >
                          <Info size={16} strokeWidth={2} />
                        </Button>
                      </Link>

                      <Link
                        to={`/dashboard/accounting/chart_of_account/journals/12`}
                      >
                        <Button type="primary" shape="circle" className="p-1">
                          <Pencil size={16} strokeWidth={2} />
                        </Button>
                      </Link>

                      <Button
                        type="primary"
                        shape="circle"
                        className="bg-[#ff0066] hover:!bg-[#b0295f] p-1 !text-light"
                      >
                        <CookingPot size={16} strokeWidth={2} />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredData.length}
            onChange={handlePageChange}
          />
        </div>
      </main>
    </section>
  );
};

export default Journals;
