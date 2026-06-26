import { api } from "./core";
export const addTagTypes = ["Projects", "Clients"] as const;
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
      getApiClients: build.query<GetApiClientsApiResponse, GetApiClientsApiArg>({
        query: () => ({ url: `/api/clients` }),
        providesTags: ["Clients"],
      }),
      postApiClients: build.mutation<PostApiClientsApiResponse, PostApiClientsApiArg>({
        query: (queryArg) => ({
          url: `/api/clients`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Clients"],
      }),
      getApiClientsById: build.query<GetApiClientsByIdApiResponse, GetApiClientsByIdApiArg>({
        query: (queryArg) => ({ url: `/api/clients/${queryArg.id}` }),
        providesTags: ["Clients"],
      }),
      putApiClientsById: build.mutation<PutApiClientsByIdApiResponse, PutApiClientsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/clients/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Clients"],
      }),
      deleteApiClientsById: build.mutation<DeleteApiClientsByIdApiResponse, DeleteApiClientsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/clients/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Clients"],
      }),
    }),
    overrideExisting: false,
  });

export { injectedRtkApi as appApis };

type ProjectMetricValue = string | number | boolean | string[] | null;
type ProjectMetrics = { [key: string]: ProjectMetricValue } | null;
type EngagementType = "client-work" | "founder-built" | "open-source" | "internal-tool";

type ClientRecord = {
  id: number;
  image: string | null;
  company: string;
  content: string;
  designation: string;
  clientName: string;
  feedback: string | null;
};

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
  clientId: number | null;
  client?: ClientRecord | null;
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

type CreateProjectBody = Omit<ProjectRecord, "id" | "createdAt" | "updatedAt" | "client"> & {
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
export type GetApiClientsApiResponse = /** status 200 List of clients */ {
  success: boolean;
  message: string;
  data: ClientRecord[];
};
export type GetApiClientsApiArg = void;
export type PostApiClientsApiResponse = /** status 201 Client created successfully */ {
  success: boolean;
  message: string;
  data: ClientRecord;
};
export type PostApiClientsApiArg = {
  body: {
    image?: string;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback?: string;
  };
};
export type GetApiClientsByIdApiResponse = /** status 200 Client details */ {
  success: boolean;
  message: string;
  data: ClientRecord;
};
export type GetApiClientsByIdApiArg = {
  id: string;
};
export type PutApiClientsByIdApiResponse = /** status 200 Client updated successfully */ {
  success: boolean;
  message: string;
  data: ClientRecord;
};
export type PutApiClientsByIdApiArg = {
  id: string;
  body: {
    image?: string;
    company?: string;
    content?: string;
    designation?: string;
    clientName?: string;
    feedback?: string;
  };
};
export type DeleteApiClientsByIdApiResponse = /** status 200 Client deleted successfully */ {
  success: boolean;
  message: string;
  data: ClientRecord;
};
export type DeleteApiClientsByIdApiArg = {
  id: string;
};
export const {
  useGetApiProjectsQuery,
  usePostApiProjectsMutation,
  useGetApiProjectsByIdQuery,
  usePutApiProjectsByIdMutation,
  useDeleteApiProjectsByIdMutation,
  useGetApiClientsQuery,
  usePostApiClientsMutation,
  useGetApiClientsByIdQuery,
  usePutApiClientsByIdMutation,
  useDeleteApiClientsByIdMutation,
} = injectedRtkApi;
