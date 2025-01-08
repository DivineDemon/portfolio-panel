import { Testimonial } from "@/lib/schema";

import { api } from "./core";

export const testimonialApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchTestimonials: build.query({
      query: () => ({
        url: "/testimonials",
        method: "GET",
      }),
      providesTags: ["Testimonials"],
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TestimonialProps[];
      }) => response.data,
    }),
    fetchTestimonial: build.query({
      query: (id: string) => ({
        url: `/testimonials/${id}`,
        method: "GET",
      }),
      providesTags: ["Testimonial"],
      transformResponse: (response: {
        success: boolean;
        message: string;
        data: TestimonialProps;
      }) => response.data,
    }),
    postTestimonial: build.mutation({
      query: (body: Testimonial) => ({
        url: "/testimonials",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Testimonials"],
    }),
    deleteTestimonial: build.mutation({
      query: (id: string) => ({
        url: `/testimonials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Testimonials"],
    }),
    updateTestimonial: build.mutation({
      query: ({ id, body }: { id: string; body: Testimonial }) => ({
        url: `/testimonials/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["Testimonials", "Testimonial"],
    }),
  }),
});

export const {
  useFetchTestimonialsQuery,
  useFetchTestimonialQuery,
  useDeleteTestimonialMutation,
  usePostTestimonialMutation,
  useUpdateTestimonialMutation,
} = testimonialApi;
