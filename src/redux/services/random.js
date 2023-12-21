import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_BASE_URL from "../../../config";

const contact = createApi({
  reducerPath: "contact",
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ["contact"],
  endpoints: (builder) => ({
    contact: builder.mutation({
      query: (date) => ({
        url: "/contact/contact_us",
        method: "POST",
        body: date,
      }),
      invalidatesTags: ["contact"],
    }),
    all_contact: builder.query({
      query: (date) => ({
        url: "/contact/get-contacts",
        method: "GET",
      }),
      providesTags: ["contact"],
    }),
  }),
});

export const { useContactMutation, useAll_contactQuery } = contact;
export default contact;
