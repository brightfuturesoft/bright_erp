import { jsx as _jsx } from 'react/jsx-runtime';
import { Dropdown, Space, Table, Tag } from 'antd';
import { EllipsisVertical } from 'lucide-react';
const Color_table = ({
    tableData,
    onEdit,
    onMakeInactive,
    onMakeActive,
    onDelete,
}) => {
    const tableHead = [
        {
            title: 'COLOR',
            dataIndex: 'code',
            key: 'code',
            render: text =>
                _jsx('div', {
                    className: 'size-8 border border-gray-700 rounded',
                    style: { backgroundColor: text },
                }),
        },
        {
            title: 'COLOR NAME',
            dataIndex: 'color_name',
            key: 'color_name',
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: status =>
                _jsx(Tag, {
                    color:
                        status === true || status === 'active'
                            ? 'green'
                            : 'red',
                    children:
                        status === true || status === 'active'
                            ? 'Active'
                            : 'Inactive',
                }),
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_, record) => {
                const items = [
                    {
                        key: '1',
                        label: _jsx('div', {
                            onClick: () => onEdit(record),
                            children: 'Edit',
                        }),
                    },
                    {
                        key: '2',
                        label: _jsx('div', {
                            children:
                                record.status === 'active'
                                    ? _jsx('div', {
                                          onClick: () => onMakeInactive(record),
                                          children: 'Make Inactive',
                                      })
                                    : _jsx('div', {
                                          onClick: () => onMakeActive(record),
                                          children: 'Make Active',
                                      }),
                        }),
                    },
                    {
                        key: '3',
                        label: _jsx('div', {
                            onClick: () => onDelete(record),
                            children: 'Delete',
                        }),
                    },
                ];
                return _jsx(Space, {
                    size: 'middle',
                    children: _jsx(Dropdown, {
                        menu: { items },
                        trigger: ['click'],
                        children: _jsx('a', {
                            children: _jsx(EllipsisVertical, {
                                className: 'hover:cursor-pointer',
                            }),
                        }),
                    }),
                });
            },
        },
    ];
    return _jsx(Table, {
        columns: tableHead,
        dataSource: tableData,
        rowKey: 'id',
        pagination: { pageSize: 10 },
    });
};
export default Color_table;
