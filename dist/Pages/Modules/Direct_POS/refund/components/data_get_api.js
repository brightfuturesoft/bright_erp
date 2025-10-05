import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
export const useRefundOrdersData = _id => {
    const { user } = useContext(Erp_context);
    const queryClient = useQueryClient();
    const fetcher = async (url, params) => {
        let queryString = '';
        if (params) {
            const query = new URLSearchParams(params).toString();
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
    const mutateFetcher = async (url, method, body) => {
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
        queryClient.invalidateQueries();
        return data;
    };
    // --- Queries ---
    const orderQuery = useQuery({
        queryKey: ['orders', _id],
        queryFn: async () => {
            const data = await fetcher(
                'direct-pos/orders/get-refund-orders',
                _id ? { id: _id } : undefined
            );
            return data;
        },
    });
    const workspace_Query = useQuery({
        queryKey: ['workspace', _id],
        queryFn: () =>
            fetcher(
                'ecommerce/orders/get-workspace',
                _id ? { id: _id } : undefined
            ),
    });
    // --- Order Mutations ---
    const addOrder = payload =>
        mutateFetcher('direct-pos/orders/create-order', 'POST', payload);
    const editOrder = payload =>
        mutateFetcher('direct-pos/orders/update-order', 'PATCH', payload);
    const deleteOrder = id =>
        mutateFetcher('direct-pos/orders/delete-order', 'DELETE', { id });
    return {
        orders: orderQuery.data,
        workspace: workspace_Query.data,
        isLoading: orderQuery.isLoading,
        isError: orderQuery.isError,
        refetch: () => {
            orderQuery.refetch();
        },
        addOrder,
        editOrder,
        deleteOrder,
    };
};
