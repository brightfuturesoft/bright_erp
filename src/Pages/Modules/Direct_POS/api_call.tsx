// api_request.ts
interface FetchOptions {
    userId?: string;
    workspaceId?: string;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

// common GET fetch wrapper
async function getRequest(
    endpoint: string,
    { userId, workspaceId }: FetchOptions = {}
) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(userId && { Authorization: userId }),
            ...(workspaceId && { workspace_id: workspaceId }),
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch ${endpoint}`);
    }

    const data = await response.json();
    return data.data;
}

// specific API functions
export const getCategories = (userId?: string, workspaceId?: string) =>
    getRequest('items/category/get-category', { userId, workspaceId });

export const getCustomers = async (userId?: string, workspaceId?: string) => {
    const data = await getRequest('customers/get-pos-customers', {
        userId,
        workspaceId,
    });
    return [{ _id: 'walk-in', name: 'Walk-in Customer' }, ...data];
};

export const getProducts = (userId?: string, workspaceId?: string) =>
    getRequest('customers-order/pos/get-product-for-pos', {
        userId,
        workspaceId,
    });

export const getTransactionId = (userId?: string, workspaceId?: string) =>
    getRequest('customers-order/pos/get-and-update-order-id', {
        userId,
        workspaceId,
    });
