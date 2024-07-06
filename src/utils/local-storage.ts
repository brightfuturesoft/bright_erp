import { instance } from '../helpers/axios/axiosInstance';
import { getBaseUrl } from '../helpers/config/envConfig';

export const setToLocalStorage = (key: string, token: string) => {
    if (!key || typeof window === 'undefined') {
        return '';
    }
    return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return '';
    }
    return localStorage.getItem(key);
};
export const getRefreshToken = async () => {
    // console.log("rrrrrrrrrrr");
    return await instance({
        url: `${getBaseUrl()}/auth/refresh-token`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
};
