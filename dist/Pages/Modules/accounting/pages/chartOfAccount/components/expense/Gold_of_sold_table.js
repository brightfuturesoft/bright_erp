import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext } from 'react';
import { Button, Pagination, Empty, message, Dropdown } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import AddNewAccountModal from '../../AddNewAccountModal';
import EditAccountModal from '../../EditAccountMOdal';
const Gold_of_sold_table = ({ entity, pageSize = 5, data }) => {
    const { user } = useContext(Erp_context);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const { data: fetchedItems = [], refetch } = useQuery({
        queryKey: [entity, user?.workspace_id],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}coa/${entity}/get-${entity}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user?._id,
                        workspace_id: user?.workspace_id,
                    },
                }
            );
            if (!res.ok) throw new Error(`Failed to fetch ${entity}`);
            const data = await res.json();
            return data.data || [];
        },
        enabled: !!user?.workspace_id && !data,
    });
    const itemsToShow = data || fetchedItems;
    const formatEntityForHeader = entity => {
        return entity.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };
    const paginatedData = itemsToShow.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
    // add data
    const handleAdd = async values => {
        try {
            if (!user?._id || !user?.workspace_id) {
                message.error('User or workspace not loaded yet.');
                return;
            }
            const payload = {
                ac_name: values.ac_name.trim(),
                description: values.description || '',
                status: values.status ?? false,
                date: values.date || new Date().toISOString(),
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}coa/${entity}/create-${entity}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await res.json();
            if (!res.ok || result.error) {
                setErrorMsg(result.message || 'Bad Request');
                message.error(result.message || 'Failed to add item');
            } else {
                message.success(
                    `${formatEntityForHeader(entity)} added successfully`
                );
                setIsAddModalOpen(false);
                refetch();
            }
        } catch (err) {
            console.error(err);
            message.error(`Failed to add ${formatEntityForHeader(entity)}`);
        }
    };
    //edit the data
    const handleEdit = async values => {
        try {
            if (!user?._id || !user?.workspace_id) {
                message.error('User or workspace not loaded yet.');
                return;
            }
            const payload = {
                id: values.id,
                ac_name: values.ac_name.trim(),
                description: values.description || '',
                status: values.status ?? false,
            };
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}coa/${entity}/update-${entity}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await res.json();
            if (!res.ok || result.error) {
                setErrorMsg(result.message || 'Bad Request');
                message.error(result.message || 'Failed to update item');
            } else {
                message.success(
                    `${formatEntityForHeader(entity)} updated successfully`
                );
                setEditingItem(null);
                refetch();
            }
        } catch (err) {
            console.error(err);
            message.error(`Failed to update ${formatEntityForHeader(entity)}`);
        }
    };
    //  Delete function
    const handleDelete = async id => {
        try {
            if (!user?._id || !user?.workspace_id) return;
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}coa/${entity}/delete-${entity}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user._id,
                        workspace_id: user.workspace_id,
                    },
                    body: JSON.stringify({ id }),
                }
            );
            const result = await res.json();
            if (!res.ok || result.error) {
                message.error(result.message || 'Failed to delete item');
            } else {
                message.success(
                    `${formatEntityForHeader(entity)} deleted successfully`
                );
                refetch();
            }
        } catch (err) {
            console.error(err);
            message.error(`Failed to delete ${formatEntityForHeader(entity)}`);
        }
    };
    const getActionsMenu = item => [
        {
            key: 'edit',
            label: 'Edit',
            onClick: () => setEditingItem(item),
        },
        {
            key: 'delete',
            label: 'Delete',
            onClick: () => handleDelete(item._id),
        },
    ];
    return _jsxs('div', {
        children: [
            _jsxs('div', {
                className: 'flex justify-between mb-4',
                children: [
                    _jsx('h2', {
                        className: 'text-xl font-bold',
                        children: formatEntityForHeader(entity),
                    }),
                    _jsx(Button, {
                        type: 'primary',
                        className:
                            'bg-blue-500 dark:bg-light-dark !shadow-none px-4 rounded !h-[40px] text-white',
                        onClick: () => setIsAddModalOpen(true),
                        children: 'Add Item',
                    }),
                ],
            }),
            _jsx('div', {
                className:
                    'border-gray-200 dark:border-gray-700 border overflow-x-auto rounded-lg',
                children: _jsxs('table', {
                    className: 'min-w-full',
                    children: [
                        _jsx('thead', {
                            className: 'dark:text-gray-200',
                            children: _jsxs('tr', {
                                children: [
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 border-b text-left text-xs uppercase',
                                        children: 'AC Name',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 border-b text-left text-xs uppercase',
                                        children: 'Description',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 border-b text-left text-xs uppercase',
                                        children: 'Status',
                                    }),
                                    _jsx('th', {
                                        className:
                                            'px-6 py-3 border-b text-left text-xs uppercase',
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
                                              colSpan: 5,
                                              className:
                                                  'px-6 py-4 border-b text-center',
                                              children: _jsx(Empty, {
                                                  description: `No ${entity} Found!`,
                                              }),
                                          }),
                                      })
                                    : paginatedData.map((item, idx) =>
                                          _jsxs(
                                              'tr',
                                              {
                                                  className:
                                                      'hover:bg-gray-50 dark:hover:bg-gray-700',
                                                  children: [
                                                      _jsx('td', {
                                                          className:
                                                              'px-6 py-4 border-b',
                                                          children:
                                                              item.ac_name,
                                                      }),
                                                      _jsx('td', {
                                                          className:
                                                              'px-6 py-4 border-b w-[300px] text-justify',
                                                          children:
                                                              item.description,
                                                      }),
                                                      _jsx('td', {
                                                          className:
                                                              'px-6 py-4 border-b',
                                                          children: item.status
                                                              ? _jsx('div', {
                                                                    className:
                                                                        'bg-green-100 dark:bg-green-800 rounded-full w-[90px] h-[25px] text-green-800 dark:text-green-400 text-xs flex items-center justify-center',
                                                                    children:
                                                                        'Active',
                                                                })
                                                              : _jsx('div', {
                                                                    className:
                                                                        'bg-red-100 dark:bg-red-800 rounded-full w-[90px] h-[25px] text-red-600 dark:text-red-400 text-xs flex items-center justify-center',
                                                                    children:
                                                                        'Inactive',
                                                                }),
                                                      }),
                                                      _jsx('td', {
                                                          className:
                                                              'px-6 py-4 border-b',
                                                          children: _jsx(
                                                              Dropdown,
                                                              {
                                                                  menu: {
                                                                      items: getActionsMenu(
                                                                          item
                                                                      ),
                                                                  },
                                                                  trigger: [
                                                                      'click',
                                                                  ],
                                                                  children:
                                                                      _jsx(
                                                                          Button,
                                                                          {
                                                                              type: 'text',
                                                                              icon: _jsx(
                                                                                  EllipsisOutlined,
                                                                                  {}
                                                                              ),
                                                                          }
                                                                      ),
                                                              }
                                                          ),
                                                      }),
                                                  ],
                                              },
                                              item._id || idx
                                          )
                                      ),
                        }),
                    ],
                }),
            }),
            itemsToShow.length > pageSize &&
                _jsx(Pagination, {
                    current: currentPage,
                    pageSize: pageSize,
                    total: itemsToShow.length,
                    onChange: setCurrentPage,
                    className: 'mt-4 flex justify-end',
                }),
            _jsx(AddNewAccountModal, {
                entity: entity,
                isModalOpen: isAddModalOpen,
                onClose: () => setIsAddModalOpen(false),
                onSubmit: handleAdd,
                errorMsg: errorMsg,
                setErrorMsg: setErrorMsg,
            }),
            editingItem &&
                _jsx(EditAccountModal, {
                    entity: entity,
                    isOpen: !!editingItem,
                    onCancel: () => setEditingItem(null),
                    onSubmit: handleEdit,
                    record: editingItem,
                }),
        ],
    });
};
export default Gold_of_sold_table;
