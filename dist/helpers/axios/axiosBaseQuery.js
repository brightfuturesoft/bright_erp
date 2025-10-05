import axios from 'axios';
export const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
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
            const err = axiosError;
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
