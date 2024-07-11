/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMeta } from 'src/common/common.data.type';
import { tagType } from '../redux-tags';
import { baseApi } from './baseApi';
import { IWorkSpaceDataType, IWorkSpaceSchema } from 'src/types/workspace';

const WORK_SPACE_URL = '/work-space';

export const workSpaceApi = baseApi.injectEndpoints({
    endpoints: build => ({
        // get all academic departments
        getAllWorkSpace: build.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: WORK_SPACE_URL,
                    method: 'GET',
                    params: arg,
                };
            },
            transformResponse: (
                response: IWorkSpaceDataType[],
                meta: IMeta
            ) => {
                // console.log(response);
                return {
                    data: response,
                    meta,
                    seccess: true,
                };
            },
            providesTags: [tagType.workspace],
        }),
        // get single academic department
        getSingleWorkSpace: build.query({
            query: (id: string | string[] | undefined) => ({
                url: `${WORK_SPACE_URL}/${id}`,
                method: 'GET',
            }),
            providesTags: [tagType.workspace],
        }),
        // create a new academic department
        addWorkSpace: build.mutation({
            query: (data: IWorkSpaceSchema) => ({
                url: `${WORK_SPACE_URL}/create`,
                method: 'POST',
                data,
            }),
            invalidatesTags: [tagType.workspace],
        }),
        // update ac department
        updateWorkSpace: build.mutation({
            query: ({ data, id }) => ({
                url: `${WORK_SPACE_URL}/${id}`,
                method: 'PATCH',
                data: data,
            }),
            invalidatesTags: [tagType.workspace],
        }),

        // delete ac department
        deleteWorkSpace: build.mutation({
            query: id => ({
                url: `${WORK_SPACE_URL}/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagType.workspace],
        }),
    }),
});

export const {
    useAddWorkSpaceMutation,
    useDeleteWorkSpaceMutation,
    useGetAllWorkSpaceQuery,
    useGetSingleWorkSpaceQuery,
    useUpdateWorkSpaceMutation,
} = workSpaceApi;
