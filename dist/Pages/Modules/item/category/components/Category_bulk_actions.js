import { jsxs as _jsxs, jsx as _jsx } from 'react/jsx-runtime';
import { Button, Popconfirm, message } from 'antd';
export default function Category_bulk_actions({
    selectedCategories,
    categories,
    handleDelete,
    handleDeleteSelected,
    setSelectedCategories,
}) {
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
    return _jsxs('div', {
        className:
            'mt-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center dark:bg-blue-950 dark:text-blue-200',
        children: [
            _jsxs('span', {
                className: 'text-sm dark:text-blue-200',
                children: [selectedCategories?.length, ' categories selected'],
            }),
            _jsx('div', {
                className: 'flex gap-2',
                children: _jsx(Popconfirm, {
                    title: 'Delete selected categories?',
                    description: 'This action cannot be undone.',
                    okText: 'Yes',
                    cancelText: 'No',
                    onConfirm: handleBulkDelete,
                    children: _jsx(Button, {
                        danger: true,
                        children: 'Delete Selected',
                    }),
                }),
            }),
        ],
    });
}
