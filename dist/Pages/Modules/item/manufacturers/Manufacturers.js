import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useState } from 'react';
import { Button, message } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import Manufacturers_table from './components/Manufacturers_table';
import Manufacturer_modal from './components/Manufacturer_modal';
const Manufacturers = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingManufacturer, setEditingManufacturer] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    // Fetch manufacturer data
    const {
        data: manufacturerData,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['manufacturerData'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/manufacturer/get-manufacture`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch manufacturers');
            const data = await response.json();
            return data.data;
        },
    });
    // Filtered data by search
    const filteredData =
        manufacturerData?.filter(item => {
            return (
                item.manufacturer
                    ?.toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                item.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description
                    ?.toLowerCase()
                    .includes(searchValue.toLowerCase())
            );
        }) ?? [];
    // Add/Edit modal open/close
    const handleAddClick = () => {
        setEditingManufacturer(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = manufacturer => {
        setEditingManufacturer(manufacturer);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingManufacturer(null);
        setErrorMsg('');
    };
    // Add/Edit submit
    const handleSubmit = async values => {
        const payload = {
            manufacturer: values.manufacturer,
            code: values.code,
            description: values.description,
            status: values.status ? 'active' : 'inactive',
        };
        let url = `${import.meta.env.VITE_BASE_URL}items/manufacturer/create-manufacture`;
        let method = 'POST';
        // If editing, use update endpoint
        if (editingManufacturer) {
            url = `${import.meta.env.VITE_BASE_URL}items/manufacturer/update-manufacture`;
            method = 'PUT';
            payload.id = editingManufacturer._id;
        }
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user?._id}`,
                workspace_id: `${user?.workspace_id}`,
            },
            body: JSON.stringify(payload),
        });
        const result = await response.json();
        if (result.error) {
            setErrorMsg(result.message);
        } else {
            setIsModalOpen(false);
            setEditingManufacturer(null);
            setErrorMsg('');
            message.success(
                editingManufacturer
                    ? 'Manufacturer updated'
                    : 'Manufacturer added'
            );
            refetch();
        }
    };
    // Delete manufacturer
    const handleDelete = async manufacturer => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/manufacturer/delete-manufacture`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: manufacturer._id }),
            }
        );
        const result = await response.json();
        if (result.error) {
            message.error(result.message);
        } else {
            message.success('Manufacturer deleted');
            refetch();
        }
    };
    // Make inactive
    const handleMakeInactive = async manufacturer => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/manufacturer/update-manufacture`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({
                    id: manufacturer._id,
                    status: 'inactive',
                }),
            }
        );
        const result = await response.json();
        if (result.error) {
            message.error(result.message);
        } else {
            message.success('Manufacturer made inactive');
            refetch();
        }
    };
    // Make active
    const handleMakeActive = async manufacturer => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/manufacturer/update-manufacture`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({
                    id: manufacturer._id,
                    status: 'active',
                }),
            }
        );
        const result = await response.json();
        if (result.error) {
            message.error(result.message);
        } else {
            message.success('Manufacturer made active');
            refetch();
        }
    };
    // Remove discount
    const handleRemoveDiscount = async manufacturer => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/manufacturer/update-manufacture`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: manufacturer._id, discount: 'N/A' }),
            }
        );
        const result = await response.json();
        if (result.error) {
            message.error(result.message);
        } else {
            message.success('Discount removed');
            refetch();
        }
    };
    return _jsxs('div', {
        children: [
            _jsxs(Section, {
                title: 'Manufacturers',
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
                    _jsx(Manufacturers_table, {
                        tableData: filteredData,
                        onEdit: handleEditClick,
                        onDelete: handleDelete,
                        onMakeInactive: handleMakeInactive,
                        onMakeActive: handleMakeActive,
                        onRemoveDiscount: handleRemoveDiscount,
                    }),
                ],
            }),
            _jsx(Manufacturer_modal, {
                open: isModalOpen,
                onClose: handleModalClose,
                onSubmit: handleSubmit,
                editingManufacturer: editingManufacturer,
                errorMsg: errorMsg,
                setErrorMsg: setErrorMsg,
            }),
        ],
    });
};
export default Manufacturers;
