import { useMutation, useQueryClient, QueryKey } from '@tanstack/react-query';

// Define the types for the POST request's parameters
interface PostData {
    [key: string]: any; // This allows you to pass any key-value pairs as data
}

// Define the type for the API response
interface ApiResponse {
    // Define the shape of your API response here
    success: boolean;
    message: string;
    data?: any; // Adjust this based on your actual response data
}

// Define the type for the hook's return value
interface UsePostApiReturn {
    mutate: () => void;
    isLoading: boolean;
    isError: boolean;
    error: Error | null; // More specific error type
    data: ApiResponse | null; // More specific data type
}

// Custom hook for POST requests
const usePostApi = (
    url: string,
    data: PostData,
    queryKey?: QueryKey
): UsePostApiReturn => {
    const queryClient = useQueryClient();

    // Define the mutation for the POST request
    const mutation = useMutation<ApiResponse, Error>(
        // @ts-ignore
        async () => {
            const baseURL = import.meta.env.VITE_BASE_URL || ''; // Base URL from environment variables
            const fullUrl = `${baseURL}${url}`; // Construct the full URL

            const response = await fetch(fullUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Pass the data in the body
            });

            if (!response.ok) {
                throw new Error('Failed to post data');
            }
            // @ts-ignore
            return response.json() as ApiResponse;
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
