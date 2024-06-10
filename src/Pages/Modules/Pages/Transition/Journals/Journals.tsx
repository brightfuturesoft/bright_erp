import React, { useState } from 'react';
import { Button, Dropdown, Empty, Space } from 'antd';
import DashboardTitle from '../../../CommonComponents/DashboardTitle';
import { DownloadOutlined, ExceptionOutlined, FilePdfOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Journals: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 5; // Set the number of items per page

    const data = [
        {
            "reference_number": "JV-2024-00000097",
            "date": "9 Jun 2024",
            "description": "Cash to Bank",
            "amount": "৳ 50,000.00",
            "status": "Canceled"
        },
        {
            "reference_number": "JV-2024-00000096",
            "date": "7 Jun 2024",
            "description": "Investment - 50,000",
            "amount": "৳ 50,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000095",
            "date": "7 Jun 2024",
            "description": "Cash Transfer to IFIC = 150,000",
            "amount": "৳ 150,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000094",
            "date": "4 Jun 2024",
            "description": "Asset On Bank",
            "amount": "৳ 50,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000093",
            "date": "4 Jun 2024",
            "description": "aa",
            "amount": "৳ 1,200.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000092",
            "date": "28 May 2024",
            "description": "Bank to Cash",
            "amount": "৳ 10,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000091",
            "date": "26 May 2024",
            "description": "Wid from bank",
            "amount": "৳ 20,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000090",
            "date": "16 May 2024",
            "description": "Nishan Loan",
            "amount": "৳ 100,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000089",
            "date": "16 May 2024",
            "description": "Opening balance - 5000",
            "amount": "৳ 5,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000088",
            "date": "12 May 2024",
            "description": "AC Depreciation",
            "amount": "৳ 5,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000087",
            "date": "12 May 2024",
            "description": "Vendor payment",
            "amount": "৳ 50,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000086",
            "date": "12 May 2024",
            "description": "AC purchased",
            "amount": "৳ 50,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000085",
            "date": "10 May 2024",
            "description": "Investment",
            "amount": "৳ 50,000.00",
            "status": "Active"
        },
        {
            "reference_number": "JV-2024-00000084",
            "date": "8 May 2024",
            "description": "p",
            "amount": "৳ 2,000.00",
            "status": "Canceled"
        }
    ];

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    const filteredData = data.filter(item =>
        item.reference_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

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
            head: [['Reference No', 'Date', 'Description', 'Amount', 'Status']],
            body: data.map(row => [
                row.reference_number,
                row.date,
                row.description,
                row.amount,
                row.status
            ]),
        });
        doc.save('Journals.pdf');
    };

    const items = [
        {
            key: '1',
            label: (
                <button className='px-6' onClick={downloadExcel}>
                    <ExceptionOutlined /> EXCEL
                </button>
            ),
        },
        {
            key: '2',
            label: (
                <button className='px-6' onClick={downloadPDF}>
                    <FilePdfOutlined /> PDF
                </button>
            ),
        }
    ];

    return (
        <section>
            <header className='flex justify-between items-center border-b pb-4 dark:border-gray-800 border-gray-200'>
                <DashboardTitle title={"Journals"} />
                <div className='flex items-center gap-2'>
                    <div className="md:flex hidden items-center border dark:border-gray-700 border-gray-200 w-[300px]  h-[40px] rounded">
                        <input
                            type="text"
                            placeholder='Search...'
                            className="w-full focus-visible:border-none focus:outline-none bg-transparent h-full dark:text-light text-dark placeholder:dark:text-light px-2 text-sm"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <Space wrap>
                        <Dropdown menu={{ items }} placement="bottomLeft">
                            <Button type="primary" shape="circle" icon={<DownloadOutlined />} size="large" />
                        </Dropdown>
                    </Space>
                    <Button className='bg-primary text-light border-none' type='primary'>Add Journal</Button>
                </div>
            </header>
            <main className='dark:text-light text-dark'>
                <div className="overflow-x-auto  border dark:border-gray-700 border-gray-200">
                    <table className="min-w-full">
                        <thead className='dark:text-gray-200'>
                            <tr>
                                <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                    Reference No
                                </th>
                                <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 border-b dark:border-gray-700 border-gray-200 dark:bg-light-dark bg-gray-100 text-left text-xs leading-4 font-medium uppercase tracking-wider">
                                    Amount
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
                                        <td colSpan="6" className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200 text-center">
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
                                            <td className="px-6 py-4 whitespace-no-wrap cursor-pointer hover:text-blue-300 duration-100 text-blue-500 border-b dark:border-gray-700 border-gray-200">
                                                <div className="text-sm leading-5">{itm.reference_number}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200">
                                                <div className="text-sm leading-5">{itm?.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200 w-[300px] text-justify text-nowrap">
                                                <div className="text-sm leading-5">{itm?.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200 w-[300px] text-justify text-nowrap">
                                                <div className="text-sm leading-5">{itm?.amount}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200">
                                                {itm?.status ? <div className="dark:bg-[#00802038] bg-[#00800038] dark:text-green-400 text-[#306830] w-[90px] rounded-full flex items-center justify-center text-xs h-[25px]">Active</div>
                                                    :
                                                    <div className="dark:bg-[#80004638] bg-[#ff00222f] text-[red] dark:text-red-400 w-[90px] rounded-full flex items-center justify-center text-xs h-[25px]">Inactive</div>}
                                            </td>
                                            <td className="px-6 py-4 whitespace-no-wrap border-b dark:border-gray-700 border-gray-200">
                                                {/* <button onClick={showEditModal} className="text-blue-500 hover:text-blue-700">Edit</button> */}
                                            </td>
                                        </tr>
                                    )))
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </section>
    );
};

export default Journals;
