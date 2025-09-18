'use client';

import React, { useContext, useState } from 'react';
import {
    Table,
    Space,
    Dropdown,
    message,
    Tag,
    Modal,
    Input,
    Button,
    Badge,
} from 'antd';
import { EllipsisVertical, Mail } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';
import { NewsletterType } from '../Newsletter_Type';

interface DataTableProps {
    data: NewsletterType[];
    onEditClick?: (newsletter: NewsletterType) => void;
    refetch?: () => void;
    onSelectionChange?: (selectedEmails: string[]) => void;
}

const NewsletterDataTable: React.FC<DataTableProps> = ({
    data,
    onEditClick,
    refetch,
    onSelectionChange,
}) => {
    const { user } = useContext(Erp_context);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

    // Modal + form state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false); // ✅ Loading state

    // Delete newsletter
    const handleDelete = async (newsletter: NewsletterType) => {
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
    const handleToggleStatus = async (newsletter: NewsletterType) => {
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
        onChange: (
            selectedKeys: React.Key[],
            selectedRows: NewsletterType[]
        ) => {
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

    return (
        <div className="dark">
            <Table
                dataSource={data}
                rowKey="_id"
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                columns={[
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email',
                    },
                    {
                        title: 'Status',
                        dataIndex: 'status',
                        key: 'status',
                        render: (status: string) =>
                            status === 'Active' ? (
                                <Tag color="green">Active</Tag>
                            ) : (
                                <Tag color="red">Inactive</Tag>
                            ),
                    },
                    {
                        title: 'Subscription At',
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: (date: string) =>
                            new Date(date).toLocaleString() || '-',
                    },
                    {
                        title: 'Updated At',
                        dataIndex: 'updatedAt',
                        key: 'updatedAt',
                        render: (date: string) =>
                            new Date(date).toLocaleString() || '-',
                    },
                    {
                        title: 'Actions',
                        key: 'actions',
                        render: (_, record) => (
                            <Space size="middle">
                                <Dropdown
                                    menu={{
                                        items: [
                                            {
                                                key: 'edit',
                                                label: (
                                                    <div
                                                        onClick={() =>
                                                            onEditClick?.(
                                                                record
                                                            )
                                                        }
                                                    >
                                                        Edit
                                                    </div>
                                                ),
                                            },
                                            {
                                                key: 'toggle',
                                                label: (
                                                    <div
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                record
                                                            )
                                                        }
                                                    >
                                                        {record.status ===
                                                        'Active'
                                                            ? 'Make Inactive'
                                                            : 'Make Active'}
                                                    </div>
                                                ),
                                            },
                                            {
                                                key: 'delete',
                                                label: (
                                                    <div
                                                        onClick={() =>
                                                            handleDelete(record)
                                                        }
                                                    >
                                                        Delete
                                                    </div>
                                                ),
                                            },
                                        ],
                                    }}
                                    trigger={['click']}
                                >
                                    <a>
                                        <EllipsisVertical className="hover:cursor-pointer" />
                                    </a>
                                </Dropdown>
                            </Space>
                        ),
                    },
                ]}
            />

            {selectedEmails.length > 0 && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: 30,
                        right: 30,
                        zIndex: 1000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<Mail size={20} />}
                        style={{
                            backgroundColor: '#1890ff',
                            borderColor: '#1890ff',
                            position: 'relative',
                            width: 60,
                            height: 60,
                            padding: 0,
                        }}
                        onClick={() => setIsModalOpen(true)}
                    />
                    <span
                        style={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            backgroundColor: '#f5222d',
                            color: '#fff',
                            borderRadius: '50%',
                            padding: '4px 7px',
                            fontSize: 12,
                            fontWeight: 'bold',
                        }}
                    >
                        {selectedEmails.length}
                    </span>
                </div>
            )}

            {/* Modal */}
            <Modal
                title={<span className="dark:text-white">Send Mail</span>}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => setIsModalOpen(false)}
                    >
                        Cancel
                    </Button>,
                    <Button
                        key="send"
                        type="primary"
                        onClick={handleSendMail}
                        loading={loading} // ✅ show loading spinner
                        className="dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        Send
                    </Button>,
                ]}
                className="dark:bg-gray-900"
                bodyStyle={{ backgroundColor: '#1f2937' }}
            >
                <div className="mb-4 text-gray-300">
                    <label>To:</label>
                    <Input.TextArea
                        value={selectedEmails.join(', ')}
                        rows={2}
                        readOnly
                        className="dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
                <div className="mb-4 text-gray-300">
                    <label>Subject:</label>
                    <Input
                        placeholder="Enter subject"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
                <div className="text-gray-300">
                    <label>Body:</label>
                    <Input.TextArea
                        placeholder="Enter body"
                        rows={4}
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        className="dark:bg-gray-800 dark:text-gray-200"
                    />
                </div>
            </Modal>
        </div>
    );
};

export default NewsletterDataTable;
