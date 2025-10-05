'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useState } from 'react';
import {
    Table,
    Space,
    Dropdown,
    message,
    Tag,
    Modal,
    Input,
    Button,
} from 'antd';
import { EllipsisVertical, Mail } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
const NewsletterDataTable = ({
    data,
    onEditClick,
    refetch,
    onSelectionChange,
}) => {
    const { user } = useContext(Erp_context);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedEmails, setSelectedEmails] = useState([]);
    // Modal + form state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false); // ✅ Loading state
    // Delete newsletter
    const handleDelete = async newsletter => {
        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/newsletter/delete-newsletter`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: newsletter._id }),
            }
        );
        const result = await res.json();
        if (result.error) message.error(result.message);
        else {
            message.success('Newsletter deleted successfully');
            refetch?.();
        }
    };
    // Toggle Active/Inactive
    const handleToggleStatus = async newsletter => {
        const newStatus =
            newsletter.status === 'Active' ? 'Inactive' : 'Active';
        await fetch(
            `${import.meta.env.VITE_BASE_URL}ecommerce/newsletter/update-newsletter`,
            {
                method: 'PATCH',
                headers: {
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: newsletter._id, status: newStatus }),
            }
        );
        message.success(`Newsletter ${newStatus.toLowerCase()} successfully`);
        refetch?.();
    };
    // Row selection
    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedKeys, selectedRows) => {
            setSelectedRowKeys(selectedKeys);
            const emails = selectedRows.map(r => r.email);
            setSelectedEmails(emails);
            onSelectionChange?.(emails);
        },
    };
    // Handle send mail
    const handleSendMail = async () => {
        if (!subject || !body) {
            message.error('Please fill subject and body');
            return;
        }
        setLoading(true); // ✅ start loading
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/sendmail/send-mail`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        to: selectedEmails,
                        subject,
                        body,
                    }),
                }
            );
            const result = await res.json();
            if (result.success) {
                message.success('Mail sent successfully!');
                setIsModalOpen(false);
                setSubject('');
                setBody('');
            } else {
                message.error(result.message || 'Failed to send mail');
            }
        } catch (error) {
            message.error('Error while sending mail');
            console.error(error);
        } finally {
            setLoading(false); // ✅ stop loading
        }
    };
    return _jsxs('div', {
        className: 'dark',
        children: [
            _jsx(Table, {
                dataSource: data,
                rowKey: '_id',
                rowSelection: {
                    type: 'checkbox',
                    ...rowSelection,
                },
                columns: [
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: status =>
                            status === 'Active'
                                ? _jsx(Tag, {
                                      color: 'green',
                                      children: 'Active',
                                  })
                                : _jsx(Tag, {
                                      color: 'red',
                                      children: 'Inactive',
                                  }),
                    },
                    {
                        title: 'Subscription At',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: date => new Date(date).toLocaleString() || '-',
                    },
                    {
                        title: 'Updated At',
                        dataIndex: 'updatedAt',
                        key: 'updatedAt',
                        render: date => new Date(date).toLocaleString() || '-',
                    },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) =>
                            _jsx(Space, {
                                size: 'middle',
                                children: _jsx(Dropdown, {
                                    menu: {
                                        items: [
                                            {
                                                key: 'edit',
                                                label: _jsx('div', {
                                                    onClick: () =>
                                                        onEditClick?.(record),
                                                    children: 'Edit',
                                                }),
                                            },
                                            {
                                                key: 'toggle',
                                                label: _jsx('div', {
                                                    onClick: () =>
                                                        handleToggleStatus(
                                                            record
                                                        ),
                                                    children:
                                                        record.status ===
                                                        'Active'
                                                            ? 'Make Inactive'
                                                            : 'Make Active',
                                                }),
                                            },
                                            {
                                                key: 'delete',
                                                label: _jsx('div', {
                                                    onClick: () =>
                                                        handleDelete(record),
                                                    children: 'Delete',
                                                }),
                                            },
                                        ],
                                    },
                                    trigger: ['click'],
                                    children: _jsx('a', {
                                        children: _jsx(EllipsisVertical, {
                                            className: 'hover:cursor-pointer',
                                        }),
                                    }),
                                }),
                            }),
                    },
                ],
            }),
            selectedEmails.length > 0 &&
                _jsxs('div', {
                    style: {
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                    children: [
                        _jsx(Button, {
                            type: 'primary',
                            shape: 'circle',
                            size: 'large',
                            icon: _jsx(Mail, { size: 20 }),
                            style: {
                                backgroundColor: '#1890ff',
                                borderColor: '#1890ff',
                                position: 'relative',
                                width: 60,
                                height: 60,
                                padding: 0,
                            },
                            onClick: () => setIsModalOpen(true),
                        }),
                        _jsx('span', {
                            style: {
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                backgroundColor: '#f5222d',
                                color: '#fff',
                                borderRadius: '50%',
                                padding: '4px 7px',
                                fontSize: 12,
                                fontWeight: 'bold',
                            },
                            children: selectedEmails.length,
                        }),
                    ],
                }),
            _jsxs(Modal, {
                title: _jsx('span', {
                    className: 'dark:text-white',
                    children: 'Send Mail',
                }),
                open: isModalOpen,
                onCancel: () => setIsModalOpen(false),
                footer: [
                    _jsx(
                        Button,
                        {
                            onClick: () => setIsModalOpen(false),
                            children: 'Cancel',
                        },
                        'cancel'
                    ),
                    _jsx(
                        Button,
                        {
                            type: 'primary',
                            onClick: handleSendMail,
                            loading: loading,
                            className:
                                'dark:bg-blue-600 dark:hover:bg-blue-500',
                            children: 'Send',
                        },
                        'send'
                    ),
                ],
                className: 'dark:bg-gray-900',
                bodyStyle: { backgroundColor: '#1f2937' },
                children: [
                    _jsxs('div', {
                        className: 'mb-4 text-gray-300',
                        children: [
                            _jsx('label', { children: 'To:' }),
                            _jsx(Input.TextArea, {
                                value: selectedEmails.join(', '),
                                rows: 2,
                                readOnly: true,
                                className:
                                    'dark:bg-gray-800 dark:text-gray-200',
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'mb-4 text-gray-300',
                        children: [
                            _jsx('label', { children: 'Subject:' }),
                            _jsx(Input, {
                                placeholder: 'Enter subject',
                                value: subject,
                                onChange: e => setSubject(e.target.value),
                                className:
                                    'dark:bg-gray-800 dark:text-gray-200',
                            }),
                        ],
                    }),
                    _jsxs('div', {
                        className: 'text-gray-300',
                        children: [
                            _jsx('label', { children: 'Body:' }),
                            _jsx(Input.TextArea, {
                                placeholder: 'Enter body',
                                rows: 4,
                                value: body,
                                onChange: e => setBody(e.target.value),
                                className:
                                    'dark:bg-gray-800 dark:text-gray-200',
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
};
export default NewsletterDataTable;
