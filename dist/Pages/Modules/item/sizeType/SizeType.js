import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
// SizeType.tsx
import { useState, useContext } from 'react';
import { Button, message, Dropdown } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import DataTable from './components/DataTable';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import AddSizeTypeModal from './components/AddsizeType';
import EditSizeTypeModal from './components/EditsizeType';
import { EllipsisVertical } from 'lucide-react';
const SizeType = () => {
    const { user } = useContext(Erp_context);
    const [searchValue, setSearchValue] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingSize, setEditingSize] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    // Fetch size types
    const { data: sizeData, refetch } = useQuery({
        queryKey: ['sizeData'],
        queryFn: async () => {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/size/get-size`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!res.ok) throw new Error('Failed to fetch size types');
            const data = await res.json();
            return data.data;
        },
    });
    const filteredData =
        sizeData?.filter(item =>
            item.sizeType.toLowerCase().includes(searchValue.toLowerCase())
        ) ?? [];
    // Add new
    const handleAddClick = () => {
        setIsAddModalOpen(true);
        setErrorMsg('');
    };
    const handleAddSubmit = async values => {
        const payload = {
            sizeType: values.sizeType,
            addedType: values.addedType,
            status: values.status ? true : false,
        };
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/size/create-size`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await res.json();
            if (result.error) setErrorMsg(result.message);
            else {
                message.success('Size added');
                setIsAddModalOpen(false);
                refetch();
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to add size');
        }
    };
    // Edit
    const handleEditClick = size => {
        setEditingSize(size);
        setIsEditModalOpen(true);
        setErrorMsg('');
    };
    const handleEditSubmit = async values => {
        if (!editingSize) return;
        const payload = {
            id: editingSize._id,
            sizeType: values.sizeType,
            addedType: values.addedType,
            status: values.status ? true : false,
        };
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/size/update-size`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await res.json();
            if (result.error) setErrorMsg(result.message);
            else {
                message.success('Size updated');
                setIsEditModalOpen(false);
                setEditingSize(null);
                refetch();
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to update size');
        }
    };
    // Toggle active/inactive
    const handleToggleStatus = async size => {
        const payload = {
            id: size._id,
            sizeType: size.sizeType,
            addedType: size.addedType,
            status: !size.status, // toggle
        };
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/size/update-size`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await res.json();
            if (result.error) message.error(result.message);
            else {
                message.success(
                    `Size marked as ${payload.status ? 'Active' : 'Inactive'}`
                );
                refetch();
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to update size status');
        }
    };
    // Delete
    const handleDelete = async size => {
        const payload = { id: size._id };
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/size/delete-size`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                    body: JSON.stringify(payload),
                }
            );
            const result = await res.json();
            if (result.error) message.error(result.message);
            else {
                message.success('Size deleted successfully');
                refetch();
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to delete size');
        }
    };
    // Dropdown menu for actions
    const renderActions = size => {
        const items = [
            {
                key: 'edit',
                label: _jsx('div', {
                    onClick: () => handleEditClick(size),
                    children: 'Edit',
                }),
            },
            {
                key: 'toggleStatus',
                label: _jsx('div', {
                    onClick: () => handleToggleStatus(size),
                    children: size.status ? 'Make Inactive' : 'Make Active',
                }),
            },
            {
                key: 'delete',
                label: _jsx('div', {
                    onClick: () => handleDelete(size),
                    children: 'Delete',
                }),
            },
        ];
        return _jsx(Dropdown, {
            menu: { items },
            trigger: ['click'],
            children: _jsx(Button, { children: _jsx(EllipsisVertical, {}) }),
        });
    };
    return _jsxs('div', {
        children: [
            _jsxs(Section, {
                title: 'Item Sizes',
                sideComponent: _jsx(Button, {
                    type: 'primary',
                    onClick: handleAddClick,
                    children: 'Add New',
                }),
                children: [
                    _jsx(TableController, {
                        searchValue: searchValue,
                        setSearchValue: setSearchValue,
                    }),
                    _jsx(DataTable, {
                        data: filteredData,
                        renderAction: renderActions,
                    }),
                ],
            }),
            _jsx(AddSizeTypeModal, {
                open: isAddModalOpen,
                onClose: () => setIsAddModalOpen(false),
                onSubmit: handleAddSubmit,
                errorMsg: errorMsg,
                setErrorMsg: setErrorMsg,
            }),
            _jsx(EditSizeTypeModal, {
                open: isEditModalOpen,
                onClose: () => setIsEditModalOpen(false),
                onSubmit: handleEditSubmit,
                editingSize: editingSize,
                errorMsg: errorMsg,
                setErrorMsg: setErrorMsg,
            }),
        ],
    });
};
export default SizeType;
