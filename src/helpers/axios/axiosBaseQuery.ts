/* eslint-disable @typescript-eslint/no-explicit-any */
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from 'axios';
import type { AxiosRequestConfig, AxiosError } from 'axios';
import { IMeta } from '../../common/common.data.type';

export const axiosBaseQuery =
    (
        { baseUrl }: { baseUrl: string } = { baseUrl: '' }
    ): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig['method'];
            data?: AxiosRequestConfig['data'];
            params?: AxiosRequestConfig['params'];
            headers?: AxiosRequestConfig['headers'];
            meta?: IMeta;
            contentType?: string;
            withCredentials?: boolean;
        },
        unknown,
        unknown
    > =>
    async ({
        url,
        method,
        data,
        params,
        contentType,
        withCredentials = true,
    }) => {
        try {
            const result = await axios({
                url: baseUrl + url,
                method,
                data,
                params,
                headers: {
                    'Content-Type': contentType || 'application/json',
                },

                withCredentials,
            });
            return result;
        } catch (axiosError) {
            const err = axiosError as AxiosError & {
                statusCode: number;
                message: string;
                success: boolean;
                errorMessages: Array<any>;
            };

            return {
                error: {
                    status: err.response?.status || err?.statusCode || 400,
                    data: err.response?.data || err.message,
                    message: err.response?.data || err.message,
                    success: err?.success,
                    errorMessages: err?.errorMessages,
                },
            };
        }
    };
