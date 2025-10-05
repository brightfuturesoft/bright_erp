import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useState } from 'react';
import { Button, message } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import Brand_table from './components/Brand_table';
import Brand_modal from './components/Brand_modal';
const Brand = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBrand, setEditingBrand] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    // Fetch manufacturer data
    const {
        data: brandData,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['brandData'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/brand/get-brand`,
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
        brandData?.filter(item => {
            return (
                item.brand?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.code?.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.description
                    ?.toLowerCase()
                    .includes(searchValue.toLowerCase())
            );
        }) ?? [];
    // Add/Edit modal open/close
    const handleAddClick = () => {
        setEditingBrand(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = brand => {
        setEditingBrand(brand);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingBrand(null);
        setErrorMsg('');
    };
    // Add/Edit submit
    const handleSubmit = async values => {
        const payload = {
            brand: values.brand,
            code: values.code,
            description: values.description,
            status: values.status ? 'active' : 'inactive',
        };
        let url = `${import.meta.env.VITE_BASE_URL}items/brand/create-brand`;
        let method = 'POST';
        // If editing, use update endpoint
        if (editingBrand) {
            url = `${import.meta.env.VITE_BASE_URL}items/brand/update-brand`;
            method = 'PUT';
            payload.id = editingBrand._id;
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
            setEditingBrand(null);
            setErrorMsg('');
            message.success(editingBrand ? 'Brand updated' : 'Brand added');
            refetch();
        }
    };
    // Delete manufacturer
    const handleDelete = async brand => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/brand/delete-brand`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: brand._id }),
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
    const handleMakeInactive = async brand => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/brand/update-brand`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: brand._id, status: 'inactive' }),
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
    const handleMakeActive = async brand => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/brand/update-brand`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: brand._id, status: 'active' }),
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
    const handleRemoveDiscount = async brand => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/brand/update-brand`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: brand._id, discount: 'N/A' }),
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
                title: 'Brands',
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
                    _jsx(Brand_table, {
                        tableData: filteredData,
                        onEdit: handleEditClick,
                        onDelete: handleDelete,
                        onMakeInactive: handleMakeInactive,
                        onMakeActive: handleMakeActive,
                        onRemoveDiscount: handleRemoveDiscount,
                    }),
                ],
            }),
            _jsx(Brand_modal, {
                open: isModalOpen,
                onClose: handleModalClose,
                onSubmit: handleSubmit,
                editingBrand: editingBrand,
                errorMsg: errorMsg,
                setErrorMsg: setErrorMsg,
            }),
        ],
    });
};
export default Brand;
