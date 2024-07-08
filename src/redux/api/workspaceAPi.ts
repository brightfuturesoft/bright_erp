import { tagType } from '../redux-tags';
import { baseApi } from './baseApi';

const WORK_SPACE_URL = '/auth';

export const workSpaceApi = baseApi.injectEndpoints({
    endpoints: build => ({
        createWorkSpace: build.mutation({
            query: workspaceData => ({
                url: `${WORK_SPACE_URL}/create`,
                method: 'POST',
                data: workspaceData,
            }),
            invalidatesTags: [tagType.workspace],
        }),
        getWorkSpace: build.query({
            query: () => ({
                url: `/work-space`,
                method: 'GET',
            }),
            providesTags: [tagType.workspace],
        }),
        updateWorkSpace: build.mutation({
            query: data => ({
                url: `/update/${data.id}`,
                method: 'PATCH',
                data: data.body,
            }),
            invalidatesTags: [tagType.workspace],
        }),
    }),
});

export const {
    useCreateWorkSpaceMutation,
    useGetWorkSpaceQuery,
    useUpdateWorkSpaceMutation,
} = workSpaceApi;
