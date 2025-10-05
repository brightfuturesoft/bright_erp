import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Button,
    Dropdown,
    Empty,
    Space,
    Pagination,
    message,
    Modal,
} from 'antd';
import {
    DownloadOutlined,
    ExceptionOutlined,
    FilePdfOutlined,
} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { CookingPot, Info, Pencil } from 'lucide-react';
import DashboardTitle from '../../CommonComponents/DashboardTitle';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
const { confirm } = Modal;
const Journals = () => {
    const { user } = useContext(Erp_context);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const pageSize = 5;
    const { data: journalsData = [], refetch } = useQuery({
        queryKey: ['journals', user?.workspace_id],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}transaction/journal/get-journals`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch journals');
            const data = await res.json();
            return data.data || [];
        },
        enabled: !!user?.workspace_id,
    });
    // ✅ Handle Delete
    const handleDelete = async id => {
        confirm({
            title: 'Are you sure you want to delete this journal?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    const res = await fetch(
                        `${import.meta.env.VITE_BASE_URL}transaction/journal/delete-journal`,
                        {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `${user?._id}`,
                                workspace_id: `${user?.workspace_id}`,
                            },
                            body: JSON.stringify({ id }),
                        }
                    );
                    if (!res.ok) throw new Error('Failed to delete journal');
                    message.success('Journal deleted successfully');
                    refetch();
                } catch (error) {
                    message.error('Error deleting journal');
                }
            },
        });
    };
    // Search filter
    const filteredData =
        journalsData.filter(
            item =>
                item.reference_number
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                item.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
        ) ?? [];
    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
    const handleSearchChange = e => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };
    const handlePageChange = page => {
        setCurrentPage(page);
    };
    // Excel download
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(journalsData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Journals');
        XLSX.writeFile(workbook, 'Journals.xlsx');
    };
    // PDF download
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('Journals', 20, 10);
        doc.autoTable({
            head: [['Reference No', 'Date', 'Description', 'Amount', 'Status']],
            body: filteredData.map(row => [
                row.reference_number,
                row.date,
                row.description,
                row.totalCredit,
                row.status ? 'Active' : 'Inactive',
            ]),
            startY: 20,
            theme: 'striped',
            headStyles: { fillColor: [22, 160, 133] },
        });
        doc.save('Journals.pdf');
    };
    const items = [
        {
            key: '1',
            label: _jsxs('button', {
                className: 'px-6',
                onClick: downloadExcel,
                children: [_jsx(ExceptionOutlined, {}), ' EXCEL'],
            }),
        },
        {
            key: '2',
            label: _jsxs('button', {
                className: 'px-6',
                onClick: downloadPDF,
                children: [_jsx(FilePdfOutlined, {}), ' PDF'],
            }),
        },
    ];
    return _jsxs('section', {
        children: [
            _jsxs('header', {
                className:
                    'flex justify-between items-center border-gray-200 dark:border-gray-800 mt-3 pb-4 border-b',
                children: [
                    _jsx(DashboardTitle, { title: 'Journals' }),
                    _jsxs('div', {
                        className: 'flex items-center gap-2',
                        children: [
                            _jsx('div', {
                                className:
                                    'md:flex items-center border-gray-200 dark:border-gray-700 hidden border rounded w-[300px] h-[40px]',
                                children: _jsx('input', {
                                    type: 'text',
                                    placeholder: 'Search...',
                                    className:
                                        'bg-transparent px-2 focus-visible:border-none w-full focus:outline-none h-full text-dark text-sm dark:text-light placeholder:dark:text-light',
                                    value: searchQuery,
                                    onChange: handleSearchChange,
                                }),
                            }),
                            _jsx(Space, {
                                wrap: true,
                                children: _jsx(Dropdown, {
                                    menu: { items },
                                    placement: 'bottomLeft',
                                    children: _jsx(Button, {
                                        type: 'primary',
                                        shape: 'circle',
                                        icon: _jsx(DownloadOutlined, {}),
                                        size: 'large',
                                    }),
                                }),
                            }),
                            _jsx(Link, {
                                to: '/dashboard/accounting/chart_of_account/add_journals',
                                children: _jsx(Button, {
                                    className:
                                        'bg-primary border-none text-light',
                                    type: 'primary',
                                    children: 'Add Journal',
                                }),
                            }),
                        ],
                    }),
                ],
            }),
            _jsxs('main', {
                className: 'text-dark dark:text-light',
                children: [
                    _jsx('div', {
                        className:
                            'border-gray-200 dark:border-gray-700 border w-[92vw] md:w-full overflow-x-auto',
                        children: _jsxs('table', {
                            className: 'min-w-full',
                            children: [
                                _jsx('thead', {
                                    className: 'dark:text-gray-200',
                                    children: _jsxs('tr', {
                                        children: [
                                            _jsx('th', {
                                                className:
                                                    'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase',
                                                children: 'Reference No',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase',
                                                children: 'Date',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase',
                                                children: 'Description',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase',
                                                children: 'Debit',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase',
                                                children: 'Credit',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase',
                                                children: 'Status',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase',
                                                children: 'Action',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('tbody', {
                                    className: 'dark:text-gray-500',
                                    children:
                                        paginatedData.length === 0
                                            ? _jsx('tr', {
                                                  children: _jsx('td', {
                                                      colSpan: 7,
                                                      className:
                                                          'border-gray-200 dark:border-gray-700 px-6 py-4 border-b text-center',
                                                      children: _jsx(Empty, {
                                                          description:
                                                              'No Journals Found!',
                                                      }),
                                                  }),
                                              })
                                            : paginatedData.map((itm, index) =>
                                                  _jsxs(
                                                      'tr',
                                                      {
                                                          children: [
                                                              _jsx('td', {
                                                                  className:
                                                                      'border-gray-200 dark:border-gray-700 px-6 py-4 border-b text-blue-500 cursor-pointer',
                                                                  children:
                                                                      itm.reference_number,
                                                              }),
                                                              _jsx('td', {
                                                                  className:
                                                                      'border-gray-200 dark:border-gray-700 px-6 py-4 border-b',
                                                                  children:
                                                                      itm.date,
                                                              }),
                                                              _jsx('td', {
                                                                  className:
                                                                      'border-gray-200 dark:border-gray-700 px-6 py-4 border-b w-[300px] text-justify',
                                                                  children:
                                                                      itm.description,
                                                              }),
                                                              _jsx('td', {
                                                                  className:
                                                                      'border-gray-200 dark:border-gray-700 px-6 py-4 border-b text-green-600',
                                                                  children:
                                                                      itm.totalDebit,
                                                              }),
                                                              _jsx('td', {
                                                                  className:
                                                                      'border-gray-200 dark:border-gray-700 px-6 py-4 border-b text-red-600',
                                                                  children:
                                                                      itm.totalCredit,
                                                              }),
                                                              _jsx('td', {
                                                                  className:
                                                                      'border-gray-200 dark:border-gray-700 px-6 py-4 border-b',
                                                                  children:
                                                                      itm.status
                                                                          ? _jsx(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'bg-green-100 dark:bg-green-800 rounded-full w-[90px] h-[25px] text-green-800 text-xs flex items-center justify-center',
                                                                                    children:
                                                                                        'Active',
                                                                                }
                                                                            )
                                                                          : _jsx(
                                                                                'div',
                                                                                {
                                                                                    className:
                                                                                        'bg-red-100 dark:bg-red-800 rounded-full w-[90px] h-[25px] text-red-600 text-xs flex items-center justify-center',
                                                                                    children:
                                                                                        'Inactive',
                                                                                }
                                                                            ),
                                                              }),
                                                              _jsxs('td', {
                                                                  className:
                                                                      'flex items-center gap-1 border-gray-200 dark:border-gray-700 px-6 py-6 border-b',
                                                                  children: [
                                                                      _jsx(
                                                                          Link,
                                                                          {
                                                                              to: `/dashboard/accounting/chart_of_account/journals_details/${itm._id}`,
                                                                              children:
                                                                                  _jsx(
                                                                                      Button,
                                                                                      {
                                                                                          type: 'text',
                                                                                          shape: 'circle',
                                                                                          className:
                                                                                              'bg-[#3faa4cfa] p-1 !text-light',
                                                                                          children:
                                                                                              _jsx(
                                                                                                  Info,
                                                                                                  {
                                                                                                      size: 16,
                                                                                                  }
                                                                                              ),
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          Link,
                                                                          {
                                                                              to: `/dashboard/accounting/chart_of_account/journals/${itm._id}`,
                                                                              children:
                                                                                  _jsx(
                                                                                      Button,
                                                                                      {
                                                                                          type: 'primary',
                                                                                          shape: 'circle',
                                                                                          className:
                                                                                              'p-1',
                                                                                          children:
                                                                                              _jsx(
                                                                                                  Pencil,
                                                                                                  {
                                                                                                      size: 16,
                                                                                                  }
                                                                                              ),
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                      _jsx(
                                                                          Button,
                                                                          {
                                                                              type: 'primary',
                                                                              shape: 'circle',
                                                                              className:
                                                                                  'bg-[#ff0066] p-1 !text-light',
                                                                              onClick:
                                                                                  () =>
                                                                                      handleDelete(
                                                                                          itm._id
                                                                                      ),
                                                                              children:
                                                                                  _jsx(
                                                                                      CookingPot,
                                                                                      {
                                                                                          size: 16,
                                                                                      }
                                                                                  ),
                                                                          }
                                                                      ),
                                                                  ],
                                                              }),
                                                          ],
                                                      },
                                                      index
                                                  )
                                              ),
                                }),
                            ],
                        }),
                    }),
                    _jsx('div', {
                        className: 'mt-4',
                        children: _jsx(Pagination, {
                            current: currentPage,
                            pageSize: pageSize,
                            total: filteredData.length,
                            onChange: handlePageChange,
                        }),
                    }),
                ],
            }),
        ],
    });
};
export default Journals;
