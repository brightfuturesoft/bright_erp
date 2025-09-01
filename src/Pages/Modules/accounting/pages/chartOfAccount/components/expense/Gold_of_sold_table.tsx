import { useState, useContext } from 'react';
import { Button, Pagination, Empty, message } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
import AddNewAccountModal, {
    ExpenseFormValues,
} from '../../AddNewAccountModal';

export interface ExpenseItem {
    _id: string;
    ac_name: string;
    amount: number;
    description: string;
    status: boolean;
}

const GoldOfSoldTable: React.FC = () => {
    const { user } = useContext(Erp_context);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ExpenseItem | null>(null);
    const [errorMsg, setErrorMsg] = useState('');
    const pageSize = 5;

    // Fetch expenses
    const { data: expenses = [], refetch } = useQuery({
        queryKey: ['expenses', user?.workspace_id],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}coa/expense/get-expense`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: user?._id!,
                        workspace_id: user?.workspace_id!,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch expenses');
            const data = await res.json();
            return data.data || [];
        },
        enabled: !!user?.workspace_id,
    });

    const paginatedData = expenses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    // Handle Add / Edit submit
    const handleSubmit = async (values: ExpenseFormValues) => {
        try {
            const url = editingItem
                ? `${import.meta.env.VITE_BASE_URL}coa/expense/update-expense`
                : `${import.meta.env.VITE_BASE_URL}coa/expense/create-expense`;

            const method = editingItem ? 'PUT' : 'POST';

            const body = editingItem
                ? { ...values, id: editingItem._id }
                : values;

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: user?._id!,
                    workspace_id: user?.workspace_id!,
                },
                body: JSON.stringify(body),
            });

            const result = await res.json();
            if (result.error) setErrorMsg(result.message);
            else {
                message.success(
                    editingItem ? 'Expense updated' : 'Expense added'
                );
                setIsModalOpen(false);
                setEditingItem(null);
                refetch();
            }
        } catch (err) {
            console.error(err);
            message.error('Operation failed');
        }
    };

    return (
        <div>
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Expenses</h2>
                <Button
                    type="primary"
                    className="bg-blue-500 dark:bg-light-dark !shadow-none px-4 rounded !h-[40px] text-white"
                    onClick={() => {
                        setEditingItem(null);
                        setIsModalOpen(true);
                    }}
                >
                    Add Items
                </Button>
            </div>

            <div className="border-gray-200 dark:border-gray-700 border overflow-x-auto rounded-lg">
                <table className="min-w-full">
                    <thead className="dark:text-gray-200">
                        <tr>
                            <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                                Cost
                            </th>
                            <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                                AC Name
                            </th>
                            <th className="border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-light-dark px-6 py-3 border-b font-medium text-left text-xs uppercase leading-4 tracking-wider">
                                Description
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
                                    colSpan={5}
                                    className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b text-center whitespace-nowrap"
                                >
                                    <Empty
                                        className="flex flex-col justify-center items-center"
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{ height: 60 }}
                                        description={
                                            <span className="text-dark dark:text-gray-400">
                                                No Expenses Found!
                                            </span>
                                        }
                                    />
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-nowrap">
                                        <div className="text-sm leading-5">
                                            {item.amount}
                                        </div>
                                    </td>
                                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-nowrap">
                                        <div className="text-sm leading-5">
                                            {item.ac_name}
                                        </div>
                                    </td>
                                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b w-[300px] text-justify whitespace-nowrap">
                                        <div className="text-sm leading-5">
                                            {item.description}
                                        </div>
                                    </td>
                                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-nowrap">
                                        {item.status ? (
                                            <div className="flex justify-center items-center bg-[#00800038] dark:bg-[#00802038] rounded-full w-[90px] h-[25px] text-[#306830] text-xs dark:text-green-400">
                                                Active
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center bg-[#ff00222f] dark:bg-[#80004638] rounded-full w-[90px] h-[25px] text-[red] text-xs dark:text-red-400">
                                                Inactive
                                            </div>
                                        )}
                                    </td>
                                    <td className="border-gray-200 dark:border-gray-700 px-6 py-4 border-b whitespace-nowrap">
                                        <button
                                            onClick={() => {
                                                setEditingItem(item);
                                                setIsModalOpen(true);
                                            }}
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {expenses.length > pageSize && (
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={expenses.length}
                    onChange={setCurrentPage}
                    className="mt-4 flex justify-end"
                />
            )}

            <AddNewAccountModal
                isModalOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingItem(null);
                }}
                onSubmit={handleSubmit}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
                initialValues={editingItem || undefined}
                isEditing={!!editingItem}
            />
        </div>
    );
};

export default GoldOfSoldTable;
