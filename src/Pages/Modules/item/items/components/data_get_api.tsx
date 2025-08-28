import { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';

// Custom hook
export const useItemsData = () => {
    const { user } = useContext(Erp_context);
    const fetcher = async (url: string) => {
        if (!user) throw new Error('User not found');
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `${user._id}`,
                workspace_id: `${user.workspace_id}`,
            },
        });
        if (!res.ok) throw new Error(`Failed to fetch ${url}`);
        const data = await res.json();
        return data.data;
    };

    const brandQuery = useQuery({
        queryKey: ['brandData_product'],
        queryFn: () => fetcher('items/brand/get-brand'),
    });

    const itemQuery = useQuery({
        queryKey: ['itemData_product'],
        queryFn: () => fetcher('items/item/get-item'),
    });

    const categoryQuery = useQuery({
        queryKey: ['categories_product'],
        queryFn: () => fetcher('items/category/get-category'),
    });

    const manufacturerQuery = useQuery({
        queryKey: ['manufacturers_product'],
        queryFn: () => fetcher('items/manufacturer/get-manufacture'),
    });

    const attributeQuery = useQuery({
        queryKey: ['attributes_product'],
        queryFn: () => fetcher('items/attribute/get-attribute'),
    });

    return {
        brandData: brandQuery.data,
        categories: categoryQuery.data,
        itemsData: itemQuery.data,
        manufacturers: manufacturerQuery.data,
        attributes: attributeQuery.data,
        isLoading:
            brandQuery.isLoading ||
            categoryQuery.isLoading ||
            manufacturerQuery.isLoading ||
            attributeQuery.isLoading,
        isError:
            brandQuery.isError ||
            categoryQuery.isError ||
            manufacturerQuery.isError ||
            attributeQuery.isError,
    };
};
