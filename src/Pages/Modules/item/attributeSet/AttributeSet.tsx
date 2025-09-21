import { useContext, useEffect, useState } from 'react';
import { Button, message } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';

import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { DataType } from './AttributeSet.type';
import Attribute_modal from './components/Attribute_modal';
import Attribute_table from './components/Attribute_table';

const AttributeSet = () => {
    const { user } = useContext(Erp_context);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAttribute, setEditingAttribute] = useState<DataType | null>(
        null
    );
    const [searchValue, setSearchValue] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Fetch manufacturer data
    const {
        data: attributeData,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['attributeData'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/attribute/get-attribute`,
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
        attributeData?.filter((item: DataType) => {
            return (
                item.attribute_set
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
        setEditingAttribute(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleEditClick = (attribute: DataType) => {
        setEditingAttribute(attribute);
        setIsModalOpen(true);
        setErrorMsg('');
    };
    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingAttribute(null);
        setErrorMsg('');
    };

    // Add/Edit submit
    const handleSubmit = async (values: any) => {
        const payload: any = {
            attribute_set: values.attribute_set,
            code: values.code,
            description: values.description,
            status: values.status ? 'active' : 'inactive',
        };
        let url = `${import.meta.env.VITE_BASE_URL}items/attribute/create-attribute`;
        let method = 'POST';
        // If editing, use update endpoint
        if (editingAttribute) {
            url = `${import.meta.env.VITE_BASE_URL}items/attribute/update-attribute`;
            method = 'PUT';
            payload.id = editingAttribute._id;
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
            setEditingAttribute(null);
            setErrorMsg('');
            message.success(
                editingAttribute ? 'Attribute updated' : 'Attribute added'
            );
            refetch();
        }
    };

    // Delete manufacturer
    const handleDelete = async (attribute: DataType) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/attribute/delete-attribute`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: attribute._id }),
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
    const handleMakeInactive = async (attribute: DataType) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/attribute/update-attribute`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: attribute._id, status: 'inactive' }),
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
    const handleMakeActive = async (attribute: DataType) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/attribute/update-attribute`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: attribute._id, status: 'active' }),
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
    const handleRemoveDiscount = async (attribute: DataType) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/attribute/update-attribute`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: attribute._id, discount: 'N/A' }),
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

    return (
        <div>
            <Section
                title="Attribute Sets"
                sideComponent={
                    <Button
                        type="primary"
                        onClick={handleAddClick}
                    >
                        Add New
                    </Button>
                }
            >
                <TableController
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <Attribute_table
                    tableData={filteredData}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                    onMakeInactive={handleMakeInactive}
                    onMakeActive={handleMakeActive}
                    onRemoveDiscount={handleRemoveDiscount}
                />
            </Section>
            <Attribute_modal
                open={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleSubmit}
                editingAttribute={editingAttribute}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
            />
        </div>
    );
};

export default AttributeSet;
