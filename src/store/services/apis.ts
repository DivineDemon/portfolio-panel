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
export type GetApiProjectsApiResponse = /** status 200 List of projects */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    industry: string | null;
    projectType: string | null;
    status: string | null;
    role: string;
    engagementModel: string | null;
    teamSize: number | null;
    durationInMonths: number | null;
    problem: string;
    context: string | null;
    strategy: string;
    architecture: string;
    execution: string;
    challenges: string | null;
    solution: string;
    measurableImpact: string;
    metrics:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
    demoUrl: string | null;
    repositoryUrl: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    featured: boolean;
    published: boolean;
    createdAt: string | null;
    updatedAt: string | null;
  }[];
};
export type GetApiProjectsApiArg = void;
export type PostApiProjectsApiResponse = /** status 201 Project created successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    industry: string | null;
    projectType: string | null;
    status: string | null;
    role: string;
    engagementModel: string | null;
    teamSize: number | null;
    durationInMonths: number | null;
    problem: string;
    context: string | null;
    strategy: string;
    architecture: string;
    execution: string;
    challenges: string | null;
    solution: string;
    measurableImpact: string;
    metrics:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
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
};
export type PostApiProjectsApiArg = {
  body: {
    slug: string;
    title: string;
    tagline: string;
    industry: string | null;
    projectType: string | null;
    status: string | null;
    role: string;
    engagementModel: string | null;
    teamSize: number | null;
    durationInMonths: number | null;
    problem: string;
    context: string | null;
    strategy: string;
    architecture: string;
    execution: string;
    challenges: string | null;
    solution: string;
    measurableImpact: string;
    metrics:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
    demoUrl: string | null;
    repositoryUrl: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    featured: boolean;
    published: boolean;
    updatedAt?: string | null;
  };
};
export type GetApiProjectsByIdApiResponse = /** status 200 Project details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    industry: string | null;
    projectType: string | null;
    status: string | null;
    role: string;
    engagementModel: string | null;
    teamSize: number | null;
    durationInMonths: number | null;
    problem: string;
    context: string | null;
    strategy: string;
    architecture: string;
    execution: string;
    challenges: string | null;
    solution: string;
    measurableImpact: string;
    metrics:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
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
};
export type GetApiProjectsByIdApiArg = {
  id: string;
};
export type PutApiProjectsByIdApiResponse = /** status 200 Project updated successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    industry: string | null;
    projectType: string | null;
    status: string | null;
    role: string;
    engagementModel: string | null;
    teamSize: number | null;
    durationInMonths: number | null;
    problem: string;
    context: string | null;
    strategy: string;
    architecture: string;
    execution: string;
    challenges: string | null;
    solution: string;
    measurableImpact: string;
    metrics:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
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
};
export type PutApiProjectsByIdApiArg = {
  id: string;
  body: {
    slug?: string;
    title?: string;
    tagline?: string;
    industry?: string | null;
    projectType?: string | null;
    status?: string | null;
    role?: string;
    engagementModel?: string | null;
    teamSize?: number | null;
    durationInMonths?: number | null;
    problem?: string;
    context?: string | null;
    strategy?: string;
    architecture?: string;
    execution?: string;
    challenges?: string | null;
    solution?: string;
    measurableImpact?: string;
    metrics?:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    techStack?: string[];
    infrastructure?: string[];
    integrations?: string[];
    coverImage?: string;
    galleryImages?: string[];
    demoUrl?: string | null;
    repositoryUrl?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    keywords?: string[];
    featured?: boolean;
    published?: boolean;
    updatedAt?: string | null;
  };
};
export type DeleteApiProjectsByIdApiResponse = /** status 200 Project deleted successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    tagline: string;
    industry: string | null;
    projectType: string | null;
    status: string | null;
    role: string;
    engagementModel: string | null;
    teamSize: number | null;
    durationInMonths: number | null;
    problem: string;
    context: string | null;
    strategy: string;
    architecture: string;
    execution: string;
    challenges: string | null;
    solution: string;
    measurableImpact: string;
    metrics:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
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
