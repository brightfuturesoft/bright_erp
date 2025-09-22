import React from 'react';
import { Button, Popconfirm, message } from 'antd';
import { Category } from '../CategoryDashboard';

interface Props {
    selectedCategories: string[];
    categories: Category[];
    handleDelete: (cat: Category) => Promise<void> | void;
    handleDeleteSelected?: () => void;
    setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Category_bulk_actions({
    selectedCategories,
    categories,
    handleDelete,
    handleDeleteSelected,
    setSelectedCategories,
}: Props) {
    if (!selectedCategories?.length) return null;

    const handleBulkDelete = async () => {
        if (handleDeleteSelected) {
            handleDeleteSelected();
            return;
        }

        try {
            const toDelete = categories.filter(c =>
                selectedCategories.includes(c._id)
            );
            await Promise.all(toDelete.map(cat => handleDelete(cat)));
            message.success(`${toDelete.length} categories deleted`);
            setSelectedCategories([]);
        } catch (error) {
            console.error('Bulk delete failed:', error);
            message.error('Failed to delete selected categories');
        }
    };
    console.log('categories', categories);
    console.log('selectedCategories', selectedCategories);

    return (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center dark:bg-blue-950 dark:text-blue-200">
            <span className="text-sm dark:text-blue-200">
                {selectedCategories?.length} categories selected
            </span>
            <div className="flex gap-2">
                <Popconfirm
                    title="Delete selected categories?"
                    description="This action cannot be undone."
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleBulkDelete}
                >
                    <Button danger>Delete Selected</Button>
                </Popconfirm>
            </div>
        </div>
    );
}
