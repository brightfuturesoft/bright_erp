import { tagType } from "../redux-tags";
import { baseApi } from "./baseApi";

type IPostUser = { name: string; email: string };
type IUser = { _id: string; name: string; email: string };

export const userAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsersData: builder.query<IUser, string>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: [tagType.user],
    }),
    getUserDataByEmail: builder.query<{ name: string; email: string }, string>({
      query: (email) => ({
        url: `/user/${email}`,
        method: "GET",
      }),
      providesTags: [tagType.user],
    }),
    addUser: builder.mutation<IPostUser, Partial<IUser>>({
      query(body) {
        return {
          url: `post`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [tagType.user],
    }),
  }),
});

export const {
  useGetUsersDataQuery,
  useAddUserMutation,
  useGetUserDataByEmailQuery,
} = userAPi;
