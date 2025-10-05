import { instance } from './axiosInstance';
const API_BASE = '/api/v1'; // matches your backend route prefix
export const getExpenses = workspace_id => {
    return instance.get(`${API_BASE}/get-expense`, {
        headers: { workspace_id },
    });
};
export const createExpense = (workspace_id, data) => {
    return instance.post(`${API_BASE}/create-expense`, data, {
        headers: { workspace_id },
    });
};
export const updateExpense = (workspace_id, data) => {
    return instance.put(`${API_BASE}/update-expense`, data, {
        headers: { workspace_id },
    });
};
export const deleteExpense = (workspace_id, id) => {
    return instance.delete(`${API_BASE}/delete-expense`, {
        headers: { workspace_id },
        data: { id },
    });
};
