/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import {
    getFromLocalStorage,
    getRefreshToken,
    removeUserInfo,
    setToLocalStorage,
} from '../local-storage';
import { authKey } from '../config/envConfig';
const instance = axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accept'] = 'application/json';
instance.defaults.timeout = 60000;
export { instance };
instance.interceptors.request.use(
    function (config) {
        const accessToken = getFromLocalStorage(authKey);
        if (accessToken) {
            config.headers.Authorization = accessToken;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    //@ts-ignore
    function (response) {
        const responseObject = {
            data: response?.data?.data,
            meta: response?.data?.meta,
        };
        return responseObject;
    },
    async function (error) {
        const config = error?.config;
        if (error?.response?.status === 403 && !config?.sent) {
            config.sent = true;
            const response = await getRefreshToken();
            const accessToken = response?.data?.accessToken ?? 'demoToken';
            config.headers['Authorization'] = accessToken;
            setToLocalStorage(authKey, accessToken);
            return instance(config);
        } else {
            if (
                error?.response?.status === 403 ||
                error?.response?.data?.message ===
                    'Validation Error:-> refreshToken : Refresh Token is required'
            ) {
                removeUserInfo();
            }
            let responseObject = {
                statusCode: error?.response?.status || 500,
                message: 'Something went wrong',
                success: false,
                errorMessages: [],
            };
            if (error?.response?.data) {
                responseObject.message =
                    error?.response?.data?.message || responseObject.message;
                responseObject.success =
                    error?.response?.data?.success || responseObject.success;
                if (error?.response?.data?.errorMessage) {
                    responseObject.errorMessages.push(
                        error?.response?.data?.errorMessage
                    );
                }
            }
            return Promise.reject(responseObject);
        }
    }
);
