// Need to use the React-specific entry point to import createApi
import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '../../helpers/axios/axiosBaseQuery';
// import { axiosBaseQuery } from 'src/helpers/axios/axiosBaseQuery';
import { getBaseUrl } from '../../helpers/config/envConfig';
import { tagTypesList } from '../redux-tags';

// Define a service using a base URL and expected endpoints
// export const baseApi = createApi({
//     reducerPath: 'api',
//     baseQuery: fetchBaseQuery({
//         baseUrl: 'https://backend.doob.com.bd/api/v1',
//     }),
//     endpoints: () => ({}),
//     tagTypes: tagTypesList,
// });

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({
        baseUrl: getBaseUrl(),
    }),
    endpoints: () => ({}),
    tagTypes: tagTypesList,
});
