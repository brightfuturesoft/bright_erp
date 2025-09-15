import { instance } from './axiosInstance';

const API_BASE = '/api/v1'; // matches your backend route prefix

export const getExpenses = (workspace_id: string) => {
    return instance.get(`${API_BASE}/get-expense`, {
        headers: { workspace_id },
    });
};

export const createExpense = (workspace_id: string, data: any) => {
    return instance.post(`${API_BASE}/create-expense`, data, {
        headers: { workspace_id },
    });
};

export const updateExpense = (workspace_id: string, data: any) => {
    return instance.put(`${API_BASE}/update-expense`, data, {
        headers: { workspace_id },
    });
};

export const deleteExpense = (workspace_id: string, id: string) => {
    return instance.delete(`${API_BASE}/delete-expense`, {
        headers: { workspace_id },
        data: { id },
    });
};
