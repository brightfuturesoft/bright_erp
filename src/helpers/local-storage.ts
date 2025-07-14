import { jwtDecode } from 'jwt-decode';
import { instance } from './axios/axiosInstance';
import { authKey, getBaseUrl } from './config/envConfig';
import { USER_ROLE } from './conts';
import CryptoJS from 'crypto-js';
const SECRET_KEY = 'Bright_ERP'; // Use a secure, random key in real applications

export const decodedToken = (token: string) => {
    return jwtDecode(token);
};
export const setToLocalStorage = (key: string, token: string) => {
    if (!key || typeof window === 'undefined') {
        return '';
    }
    return localStorage.setItem(key, token);
};

export const getFromLocalStorage = (key: string) => {
    if (!key || typeof window === 'undefined') {
        return null;
    }
    const item = localStorage.getItem(key);
    if (!item) {
        return null;
    }
    try {
        return JSON.parse(item);
    } catch (e) {
        // If parsing fails, you may want to return null or the raw string
        return null;
    }
};

export const getRefreshToken = async () => {
    return await instance({
        url: `${getBaseUrl}/auth/refresh-token`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
};

// ! store User Info
export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
    return setToLocalStorage(authKey, accessToken as string);
};

export interface IDecodedInfo {
    id: string;
    role: USER_ROLE | string;
    email: string;
    e?: string;
}

// ! get User Info
export const getUserInfo = (): IDecodedInfo | { e: '' } => {
    const authToken = getFromLocalStorage(authKey);
    if (authToken) {
        const decodedData = decodedToken(authToken) as IDecodedInfo;
        return decodedData;
    } else {
        return { e: '' };
    }
};

export const storeWorkSpaceInfo = ({
    workSpaceData,
}: {
    workSpaceData: string;
}) => {
    return setToLocalStorage('worspaceData', workSpaceData as string);
};

export const isLoggedIn = () => {
    const authToken = getFromLocalStorage(authKey);
    return !!authToken;
};

// ! remove User Info
export const removeUserInfo = () => {
    return localStorage.removeItem(authKey);
};

export const getNewAccessToken = async () => {
    return await instance({
        url: `${getBaseUrl}/auth/refresh-token`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
};

export const login_user = (data: any) => {
    const { user, workspace } = data;
    if (user) {
        const encryptedUser = CryptoJS.AES.encrypt(
            JSON.stringify(user),
            SECRET_KEY
        ).toString();
        document.cookie = `erp_user=${encryptedUser}; path=/;`;
    }
    if (workspace) {
        const encryptedWorkspace = CryptoJS.AES.encrypt(
            JSON.stringify(workspace),
            SECRET_KEY
        ).toString();
        document.cookie = `erp_workspace=${encryptedWorkspace}; path=/;`;
    }
    return true;
};
