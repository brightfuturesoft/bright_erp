import { IUserSchema } from '@/types/user';
import { tagType } from '../redux-tags';
import { baseApi } from './baseApi';
import { IWorkSpaceSchema } from '@/types/workspace';

const AUTH_URL = '/auth';

export const authApi = baseApi.injectEndpoints({
    endpoints: build => ({
        userLogin: build.mutation({
            query: loginData => ({
                url: `${AUTH_URL}/login`,
                method: 'POST',
                data: loginData,
            }),
            invalidatesTags: [tagType.user],
        }),
        userSignUP: build.mutation({
            query: (loginData: {
                user: IUserSchema;
                workSpace: IWorkSpaceSchema;
            }) => ({
                url: `${AUTH_URL}/signup`,
                method: 'POST',
                data: loginData,
            }),
            invalidatesTags: [tagType.user],
        }),
        getProfile: build.query({
            query: () => ({
                url: `/users/profile`,
                method: 'GET',
            }),
            providesTags: [tagType.user],
        }),
        updateRole: build.mutation({
            query: data => ({
                url: `/users/update-role/${data.id}`,
                method: 'PATCH',
                data: data.body,
            }),
            invalidatesTags: [tagType.user],
        }),
    }),
});

export const {
    useUserLoginMutation,
    useGetProfileQuery,
    useUpdateRoleMutation,
    useUserSignUPMutation,
} = authApi;
