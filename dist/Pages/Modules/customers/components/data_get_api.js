import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';
export const useCombinedCustomers = _id => {
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
    const posQuery = useQuery({
        queryKey: ['pos-customers', _id],
        queryFn: () =>
            fetcher(
                'customers/get-pos-customers',
                _id ? { id: _id } : undefined
            ),
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
    const addPosCustomer = payload =>
        mutateFetcher('pos/customers/create', 'POST', payload);
    const editPosCustomer = payload =>
        mutateFetcher('customers/update-pos-customers', 'PATCH', payload);
    const deletePosCustomer = id =>
        mutateFetcher('pos/customers/delete', 'DELETE', { id });
    const addEcomCustomer = payload =>
        mutateFetcher('ecommerce/customers/create-customer', 'POST', payload);
    const editEcomCustomer = payload =>
        mutateFetcher('ecommerce/customers/update-customer', 'PATCH', payload);
    const deleteEcomCustomer = id =>
        mutateFetcher('ecommerce/customers/delete-customer', 'DELETE', { id });
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
