import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';

export const useItemsData = (_id?: string) => {
    const { user } = useContext(Erp_context);
    const queryClient = useQueryClient();

    const fetcher = async (url: string, params?: Record<string, any>) => {
        let queryString = '';
        if (params) {
            const query = new URLSearchParams(
                params as Record<string, string>
            ).toString();
            queryString = `?${query}`;
        }

        const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}${url}${queryString}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: user._id,
                    workspace_id: user.workspace_id,
                },
            }
        );

        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        const data = await res.json();
        return data.data;
    };

    const mutateFetcher = async (url: string, method: string, body: any) => {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                Authorization: user._id,
                workspace_id: user.workspace_id,
            },
            body: JSON.stringify(body),
        });

        if (!res.ok) throw new Error(`Failed to ${method} ${url}`);
        const data = await res.json();
        queryClient.invalidateQueries(); // auto refetch
        return data;
    };

    // --- Queries ---
    const brandQuery = useQuery({
        queryKey: ['brandData_product', _id],
        queryFn: () =>
            fetcher('items/brand/get-brand', _id ? { id: _id } : undefined),
    });
    const itemQuery = useQuery({
        queryKey: ['itemData_product', _id],
        queryFn: () =>
            fetcher('items/item/get-item', _id ? { _id: _id } : undefined),
    });
    const categoryQuery = useQuery({
        queryKey: ['categories_product', _id],
        queryFn: () =>
            fetcher(
                'items/category/get-category',
                _id ? { id: _id } : undefined
            ),
    });
    const manufacturerQuery = useQuery({
        queryKey: ['manufacturers_product', _id],
        queryFn: () =>
            fetcher(
                'items/manufacturer/get-manufacture',
                _id ? { id: _id } : undefined
            ),
    });
    const attributeQuery = useQuery({
        queryKey: ['attributes_product', _id],
        queryFn: () =>
            fetcher(
                'items/attribute/get-attribute',
                _id ? { id: _id } : undefined
            ),
    });
    const colorQuery = useQuery({
        queryKey: ['colors_product', _id],
        queryFn: () =>
            fetcher('items/color/get-color', _id ? { id: _id } : undefined),
    });
    const sizeQuery = useQuery({
        queryKey: ['sizes_product', _id],
        queryFn: () =>
            fetcher('items/size/get-size', _id ? { id: _id } : undefined),
    });

    // --- Item Mutations ---
    const addItem = (payload: any) =>
        mutateFetcher('items/item/create-item', 'POST', payload);
    const editItem = (payload: any) =>
        mutateFetcher('items/item/update-item', 'PATCH', payload);
    const deleteItem = (id: string) =>
        mutateFetcher('items/item/delete-item', 'DELETE', { id });

    // Update status only
    const updateItemStatus = (id: string, status: string) =>
        mutateFetcher(`items/item/update-item-status/${id}`, 'PATCH', {
            status,
        });

    return {
        brandData: brandQuery.data,
        categories: categoryQuery.data,
        itemsData: itemQuery.data,
        manufacturers: manufacturerQuery.data,
        attributes: attributeQuery.data,
        colors: colorQuery.data,
        sizes: sizeQuery.data,
        isLoading:
            brandQuery.isLoading ||
            categoryQuery.isLoading ||
            manufacturerQuery.isLoading ||
            attributeQuery.isLoading ||
            colorQuery.isLoading ||
            sizeQuery.isLoading ||
            itemQuery.isLoading,
        isError:
            brandQuery.isError ||
            categoryQuery.isError ||
            manufacturerQuery.isError ||
            attributeQuery.isError ||
            colorQuery.isError ||
            sizeQuery.isError ||
            itemQuery.isError,
        refetch: () => {
            brandQuery.refetch();
            itemQuery.refetch();
            categoryQuery.refetch();
            manufacturerQuery.refetch();
            attributeQuery.refetch();
            colorQuery.refetch();
            sizeQuery.refetch();
        },
        addItem,
        editItem,
        deleteItem,
        updateItemStatus,
    };
};
