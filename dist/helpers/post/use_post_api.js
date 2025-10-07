import { Erp_context } from '@/provider/ErpContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
// Custom hook for POST requests
const usePostApi = (url, data, queryKey) => {
    const { user } = useContext(Erp_context);
    const queryClient = useQueryClient();
    // Define the mutation for the POST request
    const mutation = useMutation(
        // @ts-ignore
        async () => {
            const baseURL = import.meta.env.VITE_BASE_URL || ''; // Base URL from environment variables
            const fullUrl = `${baseURL}${url}`; // Construct the full URL
            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `${user?._id}`,
                },
                body: JSON.stringify(data), // Pass the data in the body
            });
            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            // @ts-ignore
            return response.json();
        },
        {
            onSuccess: () => {
                if (queryKey) {
                    // @ts-ignore
                    queryClient.invalidateQueries(queryKey);
                }
            },
        }
    );
    return {
        mutate: mutation.mutate,
        // @ts-ignore
        isLoading: mutation.isLoading,
        isError: mutation.isError,
        error: mutation.error,
        // @ts-ignore
        data: mutation.data,
    };
};
export default usePostApi;
