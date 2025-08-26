import React from 'react';
import { Button } from 'antd';

export default function Category_bulk_actions({
    selectedCategories,
    categories,
    handleDelete,
    setSelectedCategories,
}: any) {
    if (!selectedCategories?.length) return null;
    return (
        <div
            className={`mt-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center dark:bg-blue-950 dark:text-blue-200`}
        >
            <span className={`text-sm dark:text-blue-200`}>
                {selectedCategories?.length} categories selected
            </span>
            <div className="flex gap-2">
                <Button>Bulk Edit</Button>
                <Button
                    danger
                    onClick={() => {
                        selectedCategories?.forEach(id => {
                            const cat = categories?.find(c => c.id === id);
                            if (cat) handleDelete(cat);
                        });
                        setSelectedCategories([]);
                    }}
                >
                    Delete Selected
                </Button>
            </div>
        </div>
    );
}
