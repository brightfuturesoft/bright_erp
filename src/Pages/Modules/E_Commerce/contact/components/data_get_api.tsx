import { useContext } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Erp_context } from '@/provider/ErpContext';

export const useContactsData = (_id?: string) => {
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
        const isFormData = body instanceof FormData;

        const res = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
            method,
            headers: {
                ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
                Authorization: user._id,
                workspace_id: user.workspace_id,
            },
            body: isFormData ? body : JSON.stringify(body),
        });

        if (!res.ok) throw new Error(`Failed to ${method} ${url}`);
        const data = await res.json();
        queryClient.invalidateQueries();
        return data;
    };

    // --- Queries ---
    const contactQuery = useQuery({
        queryKey: ['contacts', _id],
        queryFn: () =>
            fetcher(
                'ecommerce/contacts/get-contacts',
                _id ? { id: _id } : undefined
            ),
    });

    // --- Contact Mutations ---
    const addContact = (payload: any) =>
        mutateFetcher('ecommerce/contacts/create-contact', 'POST', payload);
    const editContact = (payload: any) =>
        mutateFetcher('ecommerce/contacts/update-contact', 'PATCH', payload);
    const deleteContact = (id: string) =>
        mutateFetcher('ecommerce/contacts/delete-contact', 'DELETE', { id });

    return {
        contacts: contactQuery.data,
        isLoading: contactQuery.isLoading,
        isError: contactQuery.isError,
        refetch: () => {
            contactQuery.refetch();
        },
        addContact,
        editContact,
        deleteContact,
    };
};
