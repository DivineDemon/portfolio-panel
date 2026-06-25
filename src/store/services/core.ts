import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
});

export const api = createApi({
  baseQuery,
  keepUnusedDataFor: 60,
  endpoints: () => ({}),
});
