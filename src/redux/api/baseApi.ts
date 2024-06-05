// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "../redux-tags";
// import type { Pokemon } from "./types";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.doob.com.bd/api/v1",
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});
