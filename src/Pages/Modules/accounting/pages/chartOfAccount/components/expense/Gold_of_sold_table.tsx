import { useState, useContext } from 'react';
import { Button, Pagination, Empty, message, Dropdown, MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import AddNewAccountModal from '../../AddNewAccountModal';
import EditAccountModal, { ExpenseFormValues } from '../../EditAccountMOdal';
import { EntityType } from '../Entity';

export interface TableItem {
    _id: string;
    ac_name: string;
    description: string;
    status?: boolean;
    date?: string;
}
interface DynamicTableProps {
    entity: EntityType;
    pageSize?: number;
    data?: TableItem[];
}

const Gold_of_sold_table: React.FC<DynamicTableProps> = ({
    entity,
    pageSize = 5,
    data,
}) => {
    const { user } = useContext(Erp_context);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<TableItem | null>(null);
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
                        Authorization: user?._id!,
                        workspace_id: user?.workspace_id!,
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

    const formatEntityForHeader = (entity: string) => {
        return entity.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    };

    const paginatedData = itemsToShow.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // add data
    const handleAdd = async (values: Omit<TableItem, '_id'>) => {
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
    const handleEdit = async (values: ExpenseFormValues & { id: string }) => {
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
    const handleDelete = async (id: string) => {
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

    const getActionsMenu = (item: TableItem): MenuProps['items'] => [
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

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">
                    {formatEntityForHeader(entity)}
                </h2>
                <Button
                    type="primary"
                    className="bg-blue-500 dark:bg-light-dark !shadow-none px-4 rounded !h-[40px] text-white"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Item
                </Button>
            </div>

            <div className="border-gray-200 dark:border-gray-700 border overflow-x-auto rounded-lg">
                <table className="min-w-full">
                    <thead className="dark:text-gray-200">
                        <tr>
                            <th className="px-6 py-3 border-b text-left text-xs uppercase">
                                AC Name
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs uppercase">
                                Description
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs uppercase">
                                Status
                            </th>
                            <th className="px-6 py-3 border-b text-left text-xs uppercase">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="dark:text-gray-500">
                        {paginatedData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-4 border-b text-center"
                                >
                                    <Empty
                                        description={`No ${entity} Found!`}
                                    />
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((item, idx) => (
                                <tr
                                    key={item._id || idx}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    <td className="px-6 py-4 border-b">
                                        {item.ac_name}
                                    </td>
                                    <td className="px-6 py-4 border-b w-[300px] text-justify">
                                        {item.description}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        {item.status ? (
                                            <div className="bg-green-100 dark:bg-green-800 rounded-full w-[90px] h-[25px] text-green-800 dark:text-green-400 text-xs flex items-center justify-center">
                                                Active
                                            </div>
                                        ) : (
                                            <div className="bg-red-100 dark:bg-red-800 rounded-full w-[90px] h-[25px] text-red-600 dark:text-red-400 text-xs flex items-center justify-center">
                                                Inactive
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 border-b">
                                        <Dropdown
                                            menu={{
                                                items: getActionsMenu(item),
                                            }}
                                            trigger={['click']}
                                        >
                                            <Button
                                                type="text"
                                                icon={<EllipsisOutlined />}
                                            />
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* pagination for item show */}
            {itemsToShow.length > pageSize && (
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={itemsToShow.length}
                    onChange={setCurrentPage}
                    className="mt-4 flex justify-end"
                />
            )}

            {/* Add Modal */}
            <AddNewAccountModal
                entity={entity}
                isModalOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSubmit={handleAdd}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
            />

            {/* Edit Modal */}
            {editingItem && (
                <EditAccountModal
                    entity={entity}
                    isOpen={!!editingItem}
                    onCancel={() => setEditingItem(null)}
                    onSubmit={handleEdit}
                    record={editingItem}
                />
            )}
        </div>
    );
};

export default Gold_of_sold_table;
