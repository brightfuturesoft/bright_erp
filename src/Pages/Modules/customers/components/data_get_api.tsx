import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';

export const useCombinedCustomers = (_id?: string) => {
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
    const posQuery = useQuery({
        queryKey: ['pos-customers', _id],
        queryFn: () => fetcher('pos/customers', _id ? { id: _id } : undefined),
    });

    const ecommerceQuery = useQuery({
        queryKey: ['ecommerce-customers', _id],
        queryFn: () =>
            fetcher(
                'ecommerce/customers/get-customer',
                _id ? { id: _id } : undefined
            ),
    });

    // Combined customers
    const combinedCustomers = [
        ...(posQuery.data || []).map(c => ({
            id: c._id.$oid || c._id,
            name: c.name,
            email: c.email,
            phone: c.phone,
            customerType: 'POS',
            workspace_id: c.workspace_id,
            raw: c,
        })),
        ...(ecommerceQuery.data || []).map(c => ({
            id: c._id.$oid || c._id,
            name: c.full_name,
            email: c.email,
            phone: c.phone_number,
            customerType: 'Ecommerce',
            workspace_id: c.workspace_id,
            raw: c,
        })),
    ];

    // --- Mutations ---
    const addPosCustomer = (payload: any) =>
        mutateFetcher('pos/customers/create', 'POST', payload);
    const editPosCustomer = (payload: any) =>
        mutateFetcher('pos/customers/update', 'PATCH', payload);
    const deletePosCustomer = (id: string) =>
        mutateFetcher('pos/customers/delete', 'DELETE', { id });

    const addEcomCustomer = (payload: any) =>
        mutateFetcher('ecommerce/customers/create', 'POST', payload);
    const editEcomCustomer = (payload: any) =>
        mutateFetcher('ecommerce/customers/update', 'PATCH', payload);
    const deleteEcomCustomer = (id: string) =>
        mutateFetcher('ecommerce/customers/delete', 'DELETE', { id });

    return {
        customers: combinedCustomers,
        isLoading: posQuery.isLoading || ecommerceQuery.isLoading,
        isError: posQuery.isError || ecommerceQuery.isError,
        refetch: () => {
            posQuery.refetch();
            ecommerceQuery.refetch();
        },
        addPosCustomer,
        editPosCustomer,
        deletePosCustomer,
        addEcomCustomer,
        editEcomCustomer,
        deleteEcomCustomer,
    };
};
