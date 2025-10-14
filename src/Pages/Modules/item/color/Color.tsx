import { useContext, useState } from 'react';
import { Button, message } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import { Erp_context } from '@/provider/ErpContext';
import { useQuery } from '@tanstack/react-query';
import { DataType } from './Color.type';
import Color_table from './components/Color_table';
import Color_modal from './components/Color_modal';

const Manufacturers = () => {
    const { user } = useContext(Erp_context);
    const [is_color_modal_open, set_is_color_modal_open] = useState(false);
    const [editing_color, set_editing_color] = useState<DataType | null>(null);
    const [search_value, set_search_value] = useState('');
    const [error_msg, set_error_msg] = useState('');

    // Fetch manufacturer data
    const {
        data: color_data,
        isLoading,
        isError,
        refetch,
    } = useQuery({
        queryKey: ['colorData'],
        queryFn: async () => {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}items/color/get-color`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                    },
                }
            );
            if (!response.ok) throw new Error('Failed to fetch color');
            const data = await response.json();
            return data.data;
        },
    });

    // Filtered data by search
    const filteredData =
        color_data?.filter((item: DataType) => {
            return item.color_name
                ?.toLowerCase()
                .includes(search_value.toLowerCase());
        }) ?? [];

    // Add/Edit modal open/close
    const handleAddClick = () => {
        set_editing_color(null);
        set_is_color_modal_open(true);
        set_error_msg('');
    };
    const handleEditClick = (color: DataType) => {
        set_editing_color(color);
        set_is_color_modal_open(true);
        set_error_msg('');
    };
    const handle_modal_close = () => {
        set_is_color_modal_open(false);
        set_editing_color(null);
        set_error_msg('');
    };

    // Add/Edit submit
    const handleSubmit = async (values: any) => {
        // Discount validation
        let discount = values.discount;
        console.log(discount, 'discount');
        const payload: any = {
            color_name: values.color_name,
            code: values.code,
            description: values.description,
            discount,
            status: values.status ? 'active' : 'inactive',
        };
        let url = `${import.meta.env.VITE_BASE_URL}items/color/create-color`;
        let method = 'POST';
        // If editing, use update endpoint
        if (editing_color) {
            url = `${import.meta.env.VITE_BASE_URL}items/color/update-color`;
            method = 'PUT';
            payload.id = editing_color._id;
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
            set_error_msg(result.message);
        } else {
            set_is_color_modal_open(false);
            set_editing_color(null);
            set_error_msg('');
            message.success(editing_color ? 'Color updated' : 'Color added');
            refetch();
        }
    };

    // Delete manufacturer
    const handleDelete = async (color: DataType) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/color/delete-color`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({ id: color._id }),
            }
        );
        const result = await response.json();
        if (result.error) {
            message.error(result.message);
        } else {
            message.success('Color deleted');
            refetch();
        }
    };

    // Make inactive
    const handleMakeInactive = async (color: DataType) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/color/update-color`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({
                    id: color._id,
                    status: 'inactive',
                }),
            }
        );
        const result = await response.json();
        if (result.error) {
            message.error(result.message);
        } else {
            message.success('Color made inactive');
            refetch();
        }
    };

    // Make active
    const handleMakeActive = async (color: DataType) => {
        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}items/color/update-color`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify({
                    id: color._id,
                    status: 'active',
                }),
            }
        );
        const result = await response.json();
        if (result.error) {
            message.error(result.message);
        } else {
            message.success('Color made active');
            refetch();
        }
    };

    return (
        <div>
            <Section
                title="Color"
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
                    searchValue={search_value}
                    setSearchValue={set_search_value}
                />
                <Color_table
                    tableData={filteredData}
                    onEdit={handleEditClick}
                    onDelete={handleDelete}
                    onMakeInactive={handleMakeInactive}
                    onMakeActive={handleMakeActive}
                />
            </Section>
            <Color_modal
                open={is_color_modal_open}
                onClose={handle_modal_close}
                onSubmit={handleSubmit}
                editing_color={editing_color}
                error_msg={error_msg}
                set_error_msg={set_error_msg}
            />
        </div>
    );
};

export default Manufacturers;
