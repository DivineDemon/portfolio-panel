import { api } from "./core";
export const addTagTypes = ["Projects", "Testimonials"] as const;
const injectedRtkApi = api
  .enhanceEndpoints({
    addTagTypes,
  })
  .injectEndpoints({
    endpoints: (build) => ({
      getApiProjects: build.query<GetApiProjectsApiResponse, GetApiProjectsApiArg>({
        query: () => ({ url: `/api/projects` }),
        providesTags: ["Projects"],
      }),
      postApiProjects: build.mutation<PostApiProjectsApiResponse, PostApiProjectsApiArg>({
        query: (queryArg) => ({
          url: `/api/projects`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Projects"],
      }),
      getApiProjectsById: build.query<GetApiProjectsByIdApiResponse, GetApiProjectsByIdApiArg>({
        query: (queryArg) => ({ url: `/api/projects/${queryArg.id}` }),
        providesTags: ["Projects"],
      }),
      putApiProjectsById: build.mutation<PutApiProjectsByIdApiResponse, PutApiProjectsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/projects/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Projects"],
      }),
      deleteApiProjectsById: build.mutation<DeleteApiProjectsByIdApiResponse, DeleteApiProjectsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/projects/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Projects"],
      }),
      getApiTestimonials: build.query<GetApiTestimonialsApiResponse, GetApiTestimonialsApiArg>({
        query: () => ({ url: `/api/testimonials` }),
        providesTags: ["Testimonials"],
      }),
      postApiTestimonials: build.mutation<PostApiTestimonialsApiResponse, PostApiTestimonialsApiArg>({
        query: (queryArg) => ({
          url: `/api/testimonials`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Testimonials"],
      }),
      getApiTestimonialsById: build.query<GetApiTestimonialsByIdApiResponse, GetApiTestimonialsByIdApiArg>({
        query: (queryArg) => ({ url: `/api/testimonials/${queryArg.id}` }),
        providesTags: ["Testimonials"],
      }),
      putApiTestimonialsById: build.mutation<PutApiTestimonialsByIdApiResponse, PutApiTestimonialsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/testimonials/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Testimonials"],
      }),
      deleteApiTestimonialsById: build.mutation<DeleteApiTestimonialsByIdApiResponse, DeleteApiTestimonialsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/testimonials/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Testimonials"],
      }),
    }),
    overrideExisting: false,
  });

export { injectedRtkApi as appApis };

type ProjectMetricValue = string | number | boolean | string[] | null;
type ProjectMetrics = { [key: string]: ProjectMetricValue } | null;
type EngagementType = "client-work" | "founder-built" | "open-source" | "internal-tool";

type ProjectRecord = {
  id: number;
  slug: string;
  title: string;
  headlineResult: string;
  industry: string | null;
  role: string;
  engagementModel: string | null;
  teamSize: number | null;
  durationInMonths: number | null;
  problem: string;
  situation: string | null;
  approach: string;
  architecture: string;
  execution: string;
  whatMadeThisHard: string | null;
  whatWeBuilt: string;
  results: string;
  clientTestimonial: string | null;
  businessOutcome: string | null;
  beforeAfter: string | null;
  engagementType: EngagementType | null;
  cardOutcome: string | null;
  displayOrder: number | null;
  isLive: boolean;
  metrics: ProjectMetrics;
  techStack: string[];
  infrastructure: string[];
  integrations: string[];
  coverImage: string;
  galleryImages: string[];
  galleryCaptions: string[];
  demoUrl: string | null;
  repositoryUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string[];
  featured: boolean;
  published: boolean;
  createdAt: string | null;
  updatedAt: string | null;
};

type CreateProjectBody = Omit<ProjectRecord, "id" | "createdAt" | "updatedAt"> & {
  updatedAt?: string | null;
};

type UpdateProjectBody = Partial<CreateProjectBody>;

export type GetApiProjectsApiResponse = /** status 200 List of projects */ {
  success: boolean;
  message: string;
  data: ProjectRecord[];
};
export type GetApiProjectsApiArg = void;
export type PostApiProjectsApiResponse = /** status 201 Project created successfully */ {
  success: boolean;
  message: string;
  data: ProjectRecord;
};
export type PostApiProjectsApiArg = {
  body: CreateProjectBody;
};
export type GetApiProjectsByIdApiResponse = /** status 200 Project details */ {
  success: boolean;
  message: string;
  data: ProjectRecord;
};
export type GetApiProjectsByIdApiArg = {
  id: string;
};
export type PutApiProjectsByIdApiResponse = /** status 200 Project updated successfully */ {
  success: boolean;
  message: string;
  data: ProjectRecord;
};
export type PutApiProjectsByIdApiArg = {
  id: string;
  body: UpdateProjectBody;
};
export type DeleteApiProjectsByIdApiResponse = /** status 200 Project deleted successfully */ {
  success: boolean;
  message: string;
  data: ProjectRecord;
};
export type DeleteApiProjectsByIdApiArg = {
  id: string;
};
export type GetApiTestimonialsApiResponse = /** status 200 List of testimonials */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    client_name: string;
  }[];
};
export type GetApiTestimonialsApiArg = void;
export type PostApiTestimonialsApiResponse = /** status 201 Testimonial created successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    client_name: string;
  };
};
export type PostApiTestimonialsApiArg = {
  body: {
    image?: string;
    company: string;
    content: string;
    designation: string;
    client_name: string;
  };
};
export type GetApiTestimonialsByIdApiResponse = /** status 200 Testimonial details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    client_name: string;
  };
};
export type GetApiTestimonialsByIdApiArg = {
  id: string;
};
export type PutApiTestimonialsByIdApiResponse = /** status 200 Testimonial updated successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    client_name: string;
  };
};
export type PutApiTestimonialsByIdApiArg = {
  id: string;
  body: {
    image?: string;
    company?: string;
    content?: string;
    designation?: string;
    client_name?: string;
  };
};
export type DeleteApiTestimonialsByIdApiResponse = /** status 200 Testimonial deleted successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    client_name: string;
  };
};
export type DeleteApiTestimonialsByIdApiArg = {
  id: string;
};
export const {
  useGetApiProjectsQuery,
  usePostApiProjectsMutation,
  useGetApiProjectsByIdQuery,
  usePutApiProjectsByIdMutation,
  useDeleteApiProjectsByIdMutation,
  useGetApiTestimonialsQuery,
  usePostApiTestimonialsMutation,
  useGetApiTestimonialsByIdQuery,
  usePutApiTestimonialsByIdMutation,
  useDeleteApiTestimonialsByIdMutation,
} = injectedRtkApi;
