import { api } from "./core";
export const addTagTypes = ["Projects", "Companies", "Case Studies", "Testimonials"] as const;
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
      getApiCompanies: build.query<GetApiCompaniesApiResponse, GetApiCompaniesApiArg>({
        query: () => ({ url: `/api/companies` }),
        providesTags: ["Companies"],
      }),
      postApiCompanies: build.mutation<PostApiCompaniesApiResponse, PostApiCompaniesApiArg>({
        query: (queryArg) => ({
          url: `/api/companies`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Companies"],
      }),
      getApiCompaniesById: build.query<GetApiCompaniesByIdApiResponse, GetApiCompaniesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/companies/${queryArg.id}` }),
        providesTags: ["Companies"],
      }),
      putApiCompaniesById: build.mutation<PutApiCompaniesByIdApiResponse, PutApiCompaniesByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/companies/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Companies"],
      }),
      deleteApiCompaniesById: build.mutation<DeleteApiCompaniesByIdApiResponse, DeleteApiCompaniesByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/companies/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Companies"],
      }),
      getApiCaseStudies: build.query<GetApiCaseStudiesApiResponse, GetApiCaseStudiesApiArg>({
        query: () => ({ url: `/api/case-studies` }),
        providesTags: ["Case Studies"],
      }),
      postApiCaseStudies: build.mutation<PostApiCaseStudiesApiResponse, PostApiCaseStudiesApiArg>({
        query: (queryArg) => ({
          url: `/api/case-studies`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Case Studies"],
      }),
      getApiCaseStudiesById: build.query<GetApiCaseStudiesByIdApiResponse, GetApiCaseStudiesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/case-studies/${queryArg.id}` }),
        providesTags: ["Case Studies"],
      }),
      putApiCaseStudiesById: build.mutation<PutApiCaseStudiesByIdApiResponse, PutApiCaseStudiesByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/case-studies/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Case Studies"],
      }),
      deleteApiCaseStudiesById: build.mutation<DeleteApiCaseStudiesByIdApiResponse, DeleteApiCaseStudiesByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/case-studies/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Case Studies"],
      }),
      getApiCaseStudiesProjectByProjectId: build.query<
        GetApiCaseStudiesProjectByProjectIdApiResponse,
        GetApiCaseStudiesProjectByProjectIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/case-studies/project/${queryArg.projectId}`,
        }),
        providesTags: ["Case Studies"],
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
export type GetApiProjectsApiResponse = /** status 200 List of projects with company details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    features: string;
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
    company_name: string | null;
  }[];
};
export type GetApiProjectsApiArg = void;
export type PostApiProjectsApiResponse = /** status 201 Project created successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    features: string;
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
  };
};
export type PostApiProjectsApiArg = {
  body: {
    image: string | null;
    features: string[];
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
  };
};
export type GetApiProjectsByIdApiResponse = /** status 200 Project details with company information */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    features: string;
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
    company_name: string | null;
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
    image: string | null;
    features: string;
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
  };
};
export type PutApiProjectsByIdApiArg = {
  id: string;
  body: {
    image?: string | null;
    features?: string[];
    link?: string;
    start_year?: number;
    project_name?: string;
    company_id?: number;
  };
};
export type DeleteApiProjectsByIdApiResponse = /** status 200 Project deleted successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    features: string;
    link: string;
    start_year: number;
    project_name: string;
    company_id: number;
  };
};
export type DeleteApiProjectsByIdApiArg = {
  id: string;
};
export type GetApiCompaniesApiResponse = /** status 200 List of companies */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  }[];
};
export type GetApiCompaniesApiArg = void;
export type PostApiCompaniesApiResponse = /** status 201 Company created successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  };
};
export type PostApiCompaniesApiArg = {
  body: {
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  };
};
export type GetApiCompaniesByIdApiResponse = /** status 200 Company details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  };
};
export type GetApiCompaniesByIdApiArg = {
  id: string;
};
export type PutApiCompaniesByIdApiResponse = /** status 200 Company updated successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  };
};
export type PutApiCompaniesByIdApiArg = {
  id: string;
  body: {
    name?: string;
    hq?: string;
    founded?: number;
    industry?: string;
    revenue?: string;
    size?: string;
    ceo_name?: string;
    ceo_title?: string;
  };
};
export type DeleteApiCompaniesByIdApiResponse = /** status 200 Company deleted successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  };
};
export type DeleteApiCompaniesByIdApiArg = {
  id: string;
};
export type GetApiCaseStudiesApiResponse = /** status 200 List of case studies */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls: string;
    ceo_statement: string;
    conclusion: string;
  }[];
};
export type GetApiCaseStudiesApiArg = void;
export type PostApiCaseStudiesApiResponse = /** status 201 Case study created successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls: string;
    ceo_statement: string;
    conclusion: string;
  };
};
export type PostApiCaseStudiesApiArg = {
  body: {
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls: string;
    ceo_statement: string;
    conclusion: string;
  };
};
export type GetApiCaseStudiesByIdApiResponse = /** status 200 Case study details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls: string;
    ceo_statement: string;
    conclusion: string;
  };
};
export type GetApiCaseStudiesByIdApiArg = {
  id: string;
};
export type PutApiCaseStudiesByIdApiResponse = /** status 200 Case study updated successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls: string;
    ceo_statement: string;
    conclusion: string;
  };
};
export type PutApiCaseStudiesByIdApiArg = {
  id: string;
  body: {
    project_id?: number;
    title?: string;
    description?: string;
    challenge?: string;
    results?: string;
    onboarding_improved?: string;
    retention_increase?: string;
    time_spent_increase?: string;
    research?: string;
    architecture?: string;
    wireframing?: string;
    testing?: string;
    design?: string;
    tech_stack_urls?: string;
    ceo_statement?: string;
    conclusion?: string;
  };
};
export type DeleteApiCaseStudiesByIdApiResponse = /** status 200 Case study deleted successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls: string;
    ceo_statement: string;
    conclusion: string;
  };
};
export type DeleteApiCaseStudiesByIdApiArg = {
  id: string;
};
export type GetApiCaseStudiesProjectByProjectIdApiResponse = /** status 200 Case study details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls: string;
    ceo_statement: string;
    conclusion: string;
  };
};
export type GetApiCaseStudiesProjectByProjectIdApiArg = {
  projectId: string;
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
  useGetApiCompaniesQuery,
  usePostApiCompaniesMutation,
  useGetApiCompaniesByIdQuery,
  usePutApiCompaniesByIdMutation,
  useDeleteApiCompaniesByIdMutation,
  useGetApiCaseStudiesQuery,
  usePostApiCaseStudiesMutation,
  useGetApiCaseStudiesByIdQuery,
  usePutApiCaseStudiesByIdMutation,
  useDeleteApiCaseStudiesByIdMutation,
  useGetApiCaseStudiesProjectByProjectIdQuery,
  useGetApiTestimonialsQuery,
  usePostApiTestimonialsMutation,
  useGetApiTestimonialsByIdQuery,
  usePutApiTestimonialsByIdMutation,
  useDeleteApiTestimonialsByIdMutation,
} = injectedRtkApi;
