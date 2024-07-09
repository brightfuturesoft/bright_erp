import { jwtDecode } from 'jwt-decode';
import { instance } from './axios/axiosInstance';
import { authKey, getBaseUrl } from './config/envConfig';
import { USER_ROLE } from './conts';
// import jwtDecode from 'jwt-decode';

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
    // console.log(authToken)

    if (authToken) {
        const decodedData = decodedToken(authToken) as IDecodedInfo;
        // console.log(decodedData)
        return decodedData;
    } else {
        return { e: '' };
    }
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
        url: `${getBaseUrl()}/auth/refresh-token`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
};
