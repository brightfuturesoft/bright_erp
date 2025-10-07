import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
export const useCustomersData = _id => {
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
        queryClient.invalidateQueries(); // auto refetch
        return data;
    };
    // --- Queries ---
    const customerQuery = useQuery({
        queryKey: ['customers', _id],
        queryFn: () =>
            fetcher(
                'ecommerce/customers/get-customer',
                _id ? { id: _id } : undefined
            ),
    });
    const workspaceQuery = useQuery({
        queryKey: ['workspace', _id],
        queryFn: () =>
            fetcher(
                'ecommerce/customers/get-workspace',
                _id ? { id: _id } : undefined
            ),
    });
    // --- Mutations ---
    const addCustomer = payload =>
        mutateFetcher('ecommerce/customers/create-customer', 'POST', payload);
    const editCustomer = payload =>
        mutateFetcher('ecommerce/customers/update-customer', 'PATCH', payload);
    const deleteCustomer = id =>
        mutateFetcher('ecommerce/customers/delete-customer', 'DELETE', { id });
    return {
        customers: customerQuery.data,
        isLoading: customerQuery.isLoading,
        isError: customerQuery.isError,
        refetch: () => {
            customerQuery.refetch();
        },
        addCustomer,
        editCustomer,
        deleteCustomer,
    };
};
