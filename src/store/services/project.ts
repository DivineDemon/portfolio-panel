import { Project } from "@/lib/schema";

import { api } from "./core";

export const projectApi = api.injectEndpoints({
  endpoints: (build) => ({
    fetchProjects: build.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Projects"],
      transformResponse: (response: { success: boolean; message: string; data: ProjectProps[] }) => response.data,
    }),
    fetchProject: build.query({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["Project"],
      transformResponse: (response: { success: boolean; message: string; data: ProjectProps }) => response.data,
    }),
    postProject: build.mutation({
      query: (body: Project) => ({
        url: "/projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: build.mutation({
      query: (id: string) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
    updateProject: build.mutation({
      query: ({ id, body }: { id: string; body: Project }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      }),
      invalidatesTags: ["Projects", "Project"],
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useFetchProjectQuery,
  useDeleteProjectMutation,
  usePostProjectMutation,
  useUpdateProjectMutation,
} = projectApi;
