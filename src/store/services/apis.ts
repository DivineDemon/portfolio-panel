import { api } from "./core";
export const addTagTypes = [
  "Projects",
  "n8n Workflows",
  "Clients",
  "Quick Link",
  "Pages",
  "Site Settings",
  "Blog",
  "Lead Magnets",
  "Leads",
] as const;
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
      getApiN8NWorkflows: build.query<GetApiN8NWorkflowsApiResponse, GetApiN8NWorkflowsApiArg>({
        query: () => ({ url: `/api/n8n-workflows` }),
        providesTags: ["n8n Workflows"],
      }),
      postApiN8NWorkflows: build.mutation<PostApiN8NWorkflowsApiResponse, PostApiN8NWorkflowsApiArg>({
        query: (queryArg) => ({
          url: `/api/n8n-workflows`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["n8n Workflows"],
      }),
      getApiN8NWorkflowsById: build.query<GetApiN8NWorkflowsByIdApiResponse, GetApiN8NWorkflowsByIdApiArg>({
        query: (queryArg) => ({ url: `/api/n8n-workflows/${queryArg.id}` }),
        providesTags: ["n8n Workflows"],
      }),
      putApiN8NWorkflowsById: build.mutation<PutApiN8NWorkflowsByIdApiResponse, PutApiN8NWorkflowsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/n8n-workflows/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["n8n Workflows"],
      }),
      deleteApiN8NWorkflowsById: build.mutation<DeleteApiN8NWorkflowsByIdApiResponse, DeleteApiN8NWorkflowsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/n8n-workflows/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["n8n Workflows"],
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
      getApiQuickLink: build.query<GetApiQuickLinkApiResponse, GetApiQuickLinkApiArg>({
        query: () => ({ url: `/api/quick-link` }),
        providesTags: ["Quick Link"],
      }),
      putApiQuickLink: build.mutation<PutApiQuickLinkApiResponse, PutApiQuickLinkApiArg>({
        query: (queryArg) => ({
          url: `/api/quick-link`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Quick Link"],
      }),
      putApiQuickLinkBulk: build.mutation<PutApiQuickLinkBulkApiResponse, PutApiQuickLinkBulkApiArg>({
        query: (queryArg) => ({
          url: `/api/quick-link/bulk`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Quick Link"],
      }),
      putApiQuickLinkWorkflowsBulk: build.mutation<
        PutApiQuickLinkWorkflowsBulkApiResponse,
        PutApiQuickLinkWorkflowsBulkApiArg
      >({
        query: (queryArg) => ({
          url: `/api/quick-link/workflows/bulk`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Quick Link"],
      }),
      getApiPages: build.query<GetApiPagesApiResponse, GetApiPagesApiArg>({
        query: () => ({ url: `/api/pages` }),
        providesTags: ["Pages"],
      }),
      postApiPages: build.mutation<PostApiPagesApiResponse, PostApiPagesApiArg>({
        query: (queryArg) => ({
          url: `/api/pages`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Pages"],
      }),
      getApiPagesById: build.query<GetApiPagesByIdApiResponse, GetApiPagesByIdApiArg>({
        query: (queryArg) => ({ url: `/api/pages/${queryArg.id}` }),
        providesTags: ["Pages"],
      }),
      putApiPagesById: build.mutation<PutApiPagesByIdApiResponse, PutApiPagesByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/pages/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Pages"],
      }),
      deleteApiPagesById: build.mutation<DeleteApiPagesByIdApiResponse, DeleteApiPagesByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/pages/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Pages"],
      }),
      getApiSiteSettings: build.query<GetApiSiteSettingsApiResponse, GetApiSiteSettingsApiArg>({
        query: () => ({ url: `/api/site-settings` }),
        providesTags: ["Site Settings"],
      }),
      putApiSiteSettings: build.mutation<PutApiSiteSettingsApiResponse, PutApiSiteSettingsApiArg>({
        query: (queryArg) => ({
          url: `/api/site-settings`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Site Settings"],
      }),
      getApiBlogPosts: build.query<GetApiBlogPostsApiResponse, GetApiBlogPostsApiArg>({
        query: () => ({ url: `/api/blog-posts` }),
        providesTags: ["Blog"],
      }),
      postApiBlogPosts: build.mutation<PostApiBlogPostsApiResponse, PostApiBlogPostsApiArg>({
        query: (queryArg) => ({
          url: `/api/blog-posts`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Blog"],
      }),
      getApiBlogPostsById: build.query<GetApiBlogPostsByIdApiResponse, GetApiBlogPostsByIdApiArg>({
        query: (queryArg) => ({ url: `/api/blog-posts/${queryArg.id}` }),
        providesTags: ["Blog"],
      }),
      putApiBlogPostsById: build.mutation<PutApiBlogPostsByIdApiResponse, PutApiBlogPostsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/blog-posts/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Blog"],
      }),
      deleteApiBlogPostsById: build.mutation<DeleteApiBlogPostsByIdApiResponse, DeleteApiBlogPostsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/blog-posts/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Blog"],
      }),
      getApiLeadMagnets: build.query<GetApiLeadMagnetsApiResponse, GetApiLeadMagnetsApiArg>({
        query: () => ({ url: `/api/lead-magnets` }),
        providesTags: ["Lead Magnets"],
      }),
      postApiLeadMagnets: build.mutation<PostApiLeadMagnetsApiResponse, PostApiLeadMagnetsApiArg>({
        query: (queryArg) => ({
          url: `/api/lead-magnets`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Lead Magnets"],
      }),
      getApiLeadMagnetsById: build.query<GetApiLeadMagnetsByIdApiResponse, GetApiLeadMagnetsByIdApiArg>({
        query: (queryArg) => ({ url: `/api/lead-magnets/${queryArg.id}` }),
        providesTags: ["Lead Magnets"],
      }),
      putApiLeadMagnetsById: build.mutation<PutApiLeadMagnetsByIdApiResponse, PutApiLeadMagnetsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/lead-magnets/${queryArg.id}`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Lead Magnets"],
      }),
      deleteApiLeadMagnetsById: build.mutation<DeleteApiLeadMagnetsByIdApiResponse, DeleteApiLeadMagnetsByIdApiArg>({
        query: (queryArg) => ({
          url: `/api/lead-magnets/${queryArg.id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Lead Magnets"],
      }),
      postApiLeads: build.mutation<PostApiLeadsApiResponse, PostApiLeadsApiArg>({
        query: (queryArg) => ({
          url: `/api/leads`,
          method: "POST",
          body: queryArg.body,
        }),
        invalidatesTags: ["Leads"],
      }),
      getApiLeads: build.query<GetApiLeadsApiResponse, GetApiLeadsApiArg>({
        query: () => ({ url: `/api/leads` }),
        providesTags: ["Leads"],
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
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    businessOutcome: string | null;
    beforeAfter: string | null;
    engagementType:
      | ("client-work" | "founder-built" | "open-source" | "internal-tool")
      | ("client-work" | "founder-built" | "open-source" | "internal-tool");
    cardOutcome: string | null;
    displayOrder: number | null;
    isLive: boolean;
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
    galleryCaptions?: string[];
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
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    businessOutcome: string | null;
    beforeAfter: string | null;
    engagementType:
      | ("client-work" | "founder-built" | "open-source" | "internal-tool")
      | ("client-work" | "founder-built" | "open-source" | "internal-tool");
    cardOutcome: string | null;
    displayOrder: number | null;
    isLive: boolean;
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
    galleryCaptions?: string[];
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
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    businessOutcome: string | null;
    beforeAfter: string | null;
    engagementType:
      | ("client-work" | "founder-built" | "open-source" | "internal-tool")
      | ("client-work" | "founder-built" | "open-source" | "internal-tool");
    cardOutcome: string | null;
    displayOrder: number | null;
    isLive: boolean;
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
    galleryCaptions?: string[];
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
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    businessOutcome: string | null;
    beforeAfter: string | null;
    engagementType:
      | ("client-work" | "founder-built" | "open-source" | "internal-tool")
      | ("client-work" | "founder-built" | "open-source" | "internal-tool");
    cardOutcome: string | null;
    displayOrder: number | null;
    isLive: boolean;
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
    galleryCaptions?: string[];
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
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    businessOutcome: string | null;
    beforeAfter: string | null;
    engagementType:
      | ("client-work" | "founder-built" | "open-source" | "internal-tool")
      | ("client-work" | "founder-built" | "open-source" | "internal-tool");
    cardOutcome: string | null;
    displayOrder: number | null;
    isLive: boolean;
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
    galleryCaptions?: string[];
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
    headlineResult?: string;
    industry?: string | null;
    role?: string;
    engagementModel?: string | null;
    teamSize?: number | null;
    durationInMonths?: number | null;
    problem?: string;
    situation?: string | null;
    approach?: string;
    architecture?: string;
    execution?: string;
    whatMadeThisHard?: string | null;
    whatWeBuilt?: string;
    results?: string;
    clientId?: number | null;
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    businessOutcome?: string | null;
    beforeAfter?: string | null;
    engagementType?:
      | ("client-work" | "founder-built" | "open-source" | "internal-tool")
      | ("client-work" | "founder-built" | "open-source" | "internal-tool");
    cardOutcome?: string | null;
    displayOrder?: number | null;
    isLive?: boolean;
    metrics?:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    techStack?: string[];
    infrastructure?: string[];
    integrations?: string[];
    coverImage?: string;
    galleryImages?: string[];
    galleryCaptions?: string[];
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
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    businessOutcome: string | null;
    beforeAfter: string | null;
    engagementType:
      | ("client-work" | "founder-built" | "open-source" | "internal-tool")
      | ("client-work" | "founder-built" | "open-source" | "internal-tool");
    cardOutcome: string | null;
    displayOrder: number | null;
    isLive: boolean;
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    techStack: string[];
    infrastructure: string[];
    integrations: string[];
    coverImage: string;
    galleryImages: string[];
    galleryCaptions?: string[];
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
export type GetApiN8NWorkflowsApiResponse = /** status 200 List of n8n workflows */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    headlineResult: string;
    problem: string;
    approach: string;
    results: string;
    workflowJson: {
      name?: string;
      active?: boolean;
      nodes: {
        id: string;
        name: string;
        type: string;
        typeVersion?: number | string;
        position:
          | [number, number]
          | {
              x: number;
              y: number;
            };
        parameters?: {
          [key: string]:
            | string
            | number
            | boolean
            | null
            | (string | number | boolean | null)[]
            | {
                [key: string]: string | number | boolean | null;
              }
            | {
                [key: string]: string | number | boolean | null;
              }[]
            | {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | null
                  | {
                      [key: string]: string | number | boolean | null;
                    }
                  | (string | number | boolean | null)[];
              };
        };
        credentials?: {
          [key: string]: {
            id?: string;
            name?: string;
          };
        };
        disabled?: boolean;
        notes?: string;
        webhookId?: string;
        continueOnFail?: boolean;
        alwaysOutputData?: boolean;
        executeOnce?: boolean;
        retryOnFail?: boolean;
        maxTries?: number;
        waitBetweenTries?: number;
        onError?: string;
      }[];
      connections: {
        [key: string]: {
          [key: string]: {
            node: string;
            type: string;
            index: number;
          }[][];
        };
      };
      settings?: {
        executionOrder?: "v0" | "v1";
        timezone?: string;
        saveManualExecutions?: boolean;
        saveDataErrorExecution?: "all" | "none";
        saveDataSuccessExecution?: "all" | "none";
        callerPolicy?: string;
        errorWorkflow?: string;
      };
      staticData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      pinData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      meta?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      tags?: {
        id?: string;
        name: string;
        createdAt?: string;
        updatedAt?: string;
      }[];
      versionId?: string;
      id?: string;
    };
    integrations: string[];
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    coverImage: string;
    clientId: number | null;
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    cardOutcome: string | null;
    displayOrder: number | null;
    featured: boolean;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
  }[];
};
export type GetApiN8NWorkflowsApiArg = void;
export type PostApiN8NWorkflowsApiResponse = /** status 201 n8n workflow created successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    headlineResult: string;
    problem: string;
    approach: string;
    results: string;
    workflowJson: {
      name?: string;
      active?: boolean;
      nodes: {
        id: string;
        name: string;
        type: string;
        typeVersion?: number | string;
        position:
          | [number, number]
          | {
              x: number;
              y: number;
            };
        parameters?: {
          [key: string]:
            | string
            | number
            | boolean
            | null
            | (string | number | boolean | null)[]
            | {
                [key: string]: string | number | boolean | null;
              }
            | {
                [key: string]: string | number | boolean | null;
              }[]
            | {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | null
                  | {
                      [key: string]: string | number | boolean | null;
                    }
                  | (string | number | boolean | null)[];
              };
        };
        credentials?: {
          [key: string]: {
            id?: string;
            name?: string;
          };
        };
        disabled?: boolean;
        notes?: string;
        webhookId?: string;
        continueOnFail?: boolean;
        alwaysOutputData?: boolean;
        executeOnce?: boolean;
        retryOnFail?: boolean;
        maxTries?: number;
        waitBetweenTries?: number;
        onError?: string;
      }[];
      connections: {
        [key: string]: {
          [key: string]: {
            node: string;
            type: string;
            index: number;
          }[][];
        };
      };
      settings?: {
        executionOrder?: "v0" | "v1";
        timezone?: string;
        saveManualExecutions?: boolean;
        saveDataErrorExecution?: "all" | "none";
        saveDataSuccessExecution?: "all" | "none";
        callerPolicy?: string;
        errorWorkflow?: string;
      };
      staticData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      pinData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      meta?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      tags?: {
        id?: string;
        name: string;
        createdAt?: string;
        updatedAt?: string;
      }[];
      versionId?: string;
      id?: string;
    };
    integrations: string[];
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    coverImage: string;
    clientId: number | null;
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    cardOutcome: string | null;
    displayOrder: number | null;
    featured: boolean;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
  };
};
export type PostApiN8NWorkflowsApiArg = {
  body: {
    slug: string;
    title: string;
    headlineResult: string;
    problem: string;
    approach: string;
    results: string;
    workflowJson: {
      name?: string;
      active?: boolean;
      nodes: {
        id: string;
        name: string;
        type: string;
        typeVersion?: number | string;
        position:
          | [number, number]
          | {
              x: number;
              y: number;
            };
        parameters?: {
          [key: string]:
            | string
            | number
            | boolean
            | null
            | (string | number | boolean | null)[]
            | {
                [key: string]: string | number | boolean | null;
              }
            | {
                [key: string]: string | number | boolean | null;
              }[]
            | {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | null
                  | {
                      [key: string]: string | number | boolean | null;
                    }
                  | (string | number | boolean | null)[];
              };
        };
        credentials?: {
          [key: string]: {
            id?: string;
            name?: string;
          };
        };
        disabled?: boolean;
        notes?: string;
        webhookId?: string;
        continueOnFail?: boolean;
        alwaysOutputData?: boolean;
        executeOnce?: boolean;
        retryOnFail?: boolean;
        maxTries?: number;
        waitBetweenTries?: number;
        onError?: string;
      }[];
      connections: {
        [key: string]: {
          [key: string]: {
            node: string;
            type: string;
            index: number;
          }[][];
        };
      };
      settings?: {
        executionOrder?: "v0" | "v1";
        timezone?: string;
        saveManualExecutions?: boolean;
        saveDataErrorExecution?: "all" | "none";
        saveDataSuccessExecution?: "all" | "none";
        callerPolicy?: string;
        errorWorkflow?: string;
      };
      staticData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      pinData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      meta?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      tags?: {
        id?: string;
        name: string;
        createdAt?: string;
        updatedAt?: string;
      }[];
      versionId?: string;
      id?: string;
    };
    integrations: string[];
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    coverImage: string;
    clientId: number | null;
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    cardOutcome: string | null;
    displayOrder: number | null;
    featured: boolean;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    updatedAt?: string | null;
  };
};
export type GetApiN8NWorkflowsByIdApiResponse = /** status 200 n8n workflow details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    headlineResult: string;
    problem: string;
    approach: string;
    results: string;
    workflowJson: {
      name?: string;
      active?: boolean;
      nodes: {
        id: string;
        name: string;
        type: string;
        typeVersion?: number | string;
        position:
          | [number, number]
          | {
              x: number;
              y: number;
            };
        parameters?: {
          [key: string]:
            | string
            | number
            | boolean
            | null
            | (string | number | boolean | null)[]
            | {
                [key: string]: string | number | boolean | null;
              }
            | {
                [key: string]: string | number | boolean | null;
              }[]
            | {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | null
                  | {
                      [key: string]: string | number | boolean | null;
                    }
                  | (string | number | boolean | null)[];
              };
        };
        credentials?: {
          [key: string]: {
            id?: string;
            name?: string;
          };
        };
        disabled?: boolean;
        notes?: string;
        webhookId?: string;
        continueOnFail?: boolean;
        alwaysOutputData?: boolean;
        executeOnce?: boolean;
        retryOnFail?: boolean;
        maxTries?: number;
        waitBetweenTries?: number;
        onError?: string;
      }[];
      connections: {
        [key: string]: {
          [key: string]: {
            node: string;
            type: string;
            index: number;
          }[][];
        };
      };
      settings?: {
        executionOrder?: "v0" | "v1";
        timezone?: string;
        saveManualExecutions?: boolean;
        saveDataErrorExecution?: "all" | "none";
        saveDataSuccessExecution?: "all" | "none";
        callerPolicy?: string;
        errorWorkflow?: string;
      };
      staticData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      pinData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      meta?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      tags?: {
        id?: string;
        name: string;
        createdAt?: string;
        updatedAt?: string;
      }[];
      versionId?: string;
      id?: string;
    };
    integrations: string[];
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    coverImage: string;
    clientId: number | null;
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    cardOutcome: string | null;
    displayOrder: number | null;
    featured: boolean;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
  };
};
export type GetApiN8NWorkflowsByIdApiArg = {
  id: string;
};
export type PutApiN8NWorkflowsByIdApiResponse = /** status 200 n8n workflow updated successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    headlineResult: string;
    problem: string;
    approach: string;
    results: string;
    workflowJson: {
      name?: string;
      active?: boolean;
      nodes: {
        id: string;
        name: string;
        type: string;
        typeVersion?: number | string;
        position:
          | [number, number]
          | {
              x: number;
              y: number;
            };
        parameters?: {
          [key: string]:
            | string
            | number
            | boolean
            | null
            | (string | number | boolean | null)[]
            | {
                [key: string]: string | number | boolean | null;
              }
            | {
                [key: string]: string | number | boolean | null;
              }[]
            | {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | null
                  | {
                      [key: string]: string | number | boolean | null;
                    }
                  | (string | number | boolean | null)[];
              };
        };
        credentials?: {
          [key: string]: {
            id?: string;
            name?: string;
          };
        };
        disabled?: boolean;
        notes?: string;
        webhookId?: string;
        continueOnFail?: boolean;
        alwaysOutputData?: boolean;
        executeOnce?: boolean;
        retryOnFail?: boolean;
        maxTries?: number;
        waitBetweenTries?: number;
        onError?: string;
      }[];
      connections: {
        [key: string]: {
          [key: string]: {
            node: string;
            type: string;
            index: number;
          }[][];
        };
      };
      settings?: {
        executionOrder?: "v0" | "v1";
        timezone?: string;
        saveManualExecutions?: boolean;
        saveDataErrorExecution?: "all" | "none";
        saveDataSuccessExecution?: "all" | "none";
        callerPolicy?: string;
        errorWorkflow?: string;
      };
      staticData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      pinData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      meta?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      tags?: {
        id?: string;
        name: string;
        createdAt?: string;
        updatedAt?: string;
      }[];
      versionId?: string;
      id?: string;
    };
    integrations: string[];
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    coverImage: string;
    clientId: number | null;
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    cardOutcome: string | null;
    displayOrder: number | null;
    featured: boolean;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
  };
};
export type PutApiN8NWorkflowsByIdApiArg = {
  id: string;
  body: {
    slug?: string;
    title?: string;
    headlineResult?: string;
    problem?: string;
    approach?: string;
    results?: string;
    workflowJson?: {
      name?: string;
      active?: boolean;
      nodes: {
        id: string;
        name: string;
        type: string;
        typeVersion?: number | string;
        position:
          | [number, number]
          | {
              x: number;
              y: number;
            };
        parameters?: {
          [key: string]:
            | string
            | number
            | boolean
            | null
            | (string | number | boolean | null)[]
            | {
                [key: string]: string | number | boolean | null;
              }
            | {
                [key: string]: string | number | boolean | null;
              }[]
            | {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | null
                  | {
                      [key: string]: string | number | boolean | null;
                    }
                  | (string | number | boolean | null)[];
              };
        };
        credentials?: {
          [key: string]: {
            id?: string;
            name?: string;
          };
        };
        disabled?: boolean;
        notes?: string;
        webhookId?: string;
        continueOnFail?: boolean;
        alwaysOutputData?: boolean;
        executeOnce?: boolean;
        retryOnFail?: boolean;
        maxTries?: number;
        waitBetweenTries?: number;
        onError?: string;
      }[];
      connections: {
        [key: string]: {
          [key: string]: {
            node: string;
            type: string;
            index: number;
          }[][];
        };
      };
      settings?: {
        executionOrder?: "v0" | "v1";
        timezone?: string;
        saveManualExecutions?: boolean;
        saveDataErrorExecution?: "all" | "none";
        saveDataSuccessExecution?: "all" | "none";
        callerPolicy?: string;
        errorWorkflow?: string;
      };
      staticData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      pinData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      meta?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      tags?: {
        id?: string;
        name: string;
        createdAt?: string;
        updatedAt?: string;
      }[];
      versionId?: string;
      id?: string;
    };
    integrations?: string[];
    metrics?:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    coverImage?: string;
    clientId?: number | null;
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    cardOutcome?: string | null;
    displayOrder?: number | null;
    featured?: boolean;
    published?: boolean;
    seoTitle?: string | null;
    seoDescription?: string | null;
    keywords?: string[];
    updatedAt?: string | null;
  };
};
export type DeleteApiN8NWorkflowsByIdApiResponse = /** status 200 n8n workflow deleted successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    headlineResult: string;
    problem: string;
    approach: string;
    results: string;
    workflowJson: {
      name?: string;
      active?: boolean;
      nodes: {
        id: string;
        name: string;
        type: string;
        typeVersion?: number | string;
        position:
          | [number, number]
          | {
              x: number;
              y: number;
            };
        parameters?: {
          [key: string]:
            | string
            | number
            | boolean
            | null
            | (string | number | boolean | null)[]
            | {
                [key: string]: string | number | boolean | null;
              }
            | {
                [key: string]: string | number | boolean | null;
              }[]
            | {
                [key: string]:
                  | string
                  | number
                  | boolean
                  | null
                  | {
                      [key: string]: string | number | boolean | null;
                    }
                  | (string | number | boolean | null)[];
              };
        };
        credentials?: {
          [key: string]: {
            id?: string;
            name?: string;
          };
        };
        disabled?: boolean;
        notes?: string;
        webhookId?: string;
        continueOnFail?: boolean;
        alwaysOutputData?: boolean;
        executeOnce?: boolean;
        retryOnFail?: boolean;
        maxTries?: number;
        waitBetweenTries?: number;
        onError?: string;
      }[];
      connections: {
        [key: string]: {
          [key: string]: {
            node: string;
            type: string;
            index: number;
          }[][];
        };
      };
      settings?: {
        executionOrder?: "v0" | "v1";
        timezone?: string;
        saveManualExecutions?: boolean;
        saveDataErrorExecution?: "all" | "none";
        saveDataSuccessExecution?: "all" | "none";
        callerPolicy?: string;
        errorWorkflow?: string;
      };
      staticData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      pinData?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      meta?: {
        [key: string]:
          | string
          | number
          | boolean
          | null
          | (string | number | boolean | null)[]
          | {
              [key: string]: string | number | boolean | null;
            }
          | {
              [key: string]: string | number | boolean | null;
            }[]
          | {
              [key: string]:
                | string
                | number
                | boolean
                | null
                | {
                    [key: string]: string | number | boolean | null;
                  }
                | (string | number | boolean | null)[];
            };
      };
      tags?: {
        id?: string;
        name: string;
        createdAt?: string;
        updatedAt?: string;
      }[];
      versionId?: string;
      id?: string;
    };
    integrations: string[];
    metrics:
      | {
          [key: string]: string | number | boolean | string[] | null;
        }
      | {
          [key: string]: string | number | boolean | string[] | null;
        };
    coverImage: string;
    clientId: number | null;
    client?: {
      id: number;
      image: string | null;
      logo: string | null;
      companyUrl: string | null;
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
      featured: boolean;
    } | null;
    cardOutcome: string | null;
    displayOrder: number | null;
    featured: boolean;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
  };
};
export type DeleteApiN8NWorkflowsByIdApiArg = {
  id: string;
};
export type GetApiClientsApiResponse = /** status 200 List of clients */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    logo: string | null;
    companyUrl: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
    featured: boolean;
  }[];
};
export type GetApiClientsApiArg = void;
export type PostApiClientsApiResponse = /** status 201 Client created successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    logo: string | null;
    companyUrl: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
    featured: boolean;
  };
};
export type PostApiClientsApiArg = {
  body: {
    image?: string;
    logo?: string;
    companyUrl?: string;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback?: string;
    featured?: boolean;
  };
};
export type GetApiClientsByIdApiResponse = /** status 200 Client details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    logo: string | null;
    companyUrl: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
    featured: boolean;
  };
};
export type GetApiClientsByIdApiArg = {
  id: string;
};
export type PutApiClientsByIdApiResponse = /** status 200 Client updated successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    logo: string | null;
    companyUrl: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
    featured: boolean;
  };
};
export type PutApiClientsByIdApiArg = {
  id: string;
  body: {
    image?: string;
    logo?: string;
    companyUrl?: string;
    company?: string;
    content?: string;
    designation?: string;
    clientName?: string;
    feedback?: string;
    featured?: boolean;
  };
};
export type DeleteApiClientsByIdApiResponse = /** status 200 Client deleted successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    logo: string | null;
    companyUrl: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
    featured: boolean;
  };
};
export type DeleteApiClientsByIdApiArg = {
  id: string;
};
export type GetApiQuickLinkApiResponse = /** status 200 Quick link overview */ {
  success: boolean;
  message: string;
  data: {
    unlinkedProjects: {
      id: number;
      slug: string;
      title: string;
      industry: string | null;
      coverImage: string;
      headlineResult: string;
    }[];
    linkedProjects: {
      id: number;
      slug: string;
      title: string;
      industry: string | null;
      coverImage: string;
      headlineResult: string;
      clientId: number;
      client: {
        id: number;
        clientName: string;
        company: string;
        designation: string;
        image: string | null;
      };
    }[];
    unlinkedWorkflows: {
      id: number;
      slug: string;
      title: string;
      coverImage: string;
      headlineResult: string;
    }[];
    linkedWorkflows: {
      id: number;
      slug: string;
      title: string;
      coverImage: string;
      headlineResult: string;
      clientId: number;
      client: {
        id: number;
        clientName: string;
        company: string;
        designation: string;
        image: string | null;
      };
    }[];
    clients: {
      id: number;
      clientName: string;
      company: string;
      designation: string;
      image: string | null;
      linkedProjectCount: number;
      linkedWorkflowCount: number;
    }[];
  };
};
export type GetApiQuickLinkApiArg = void;
export type PutApiQuickLinkApiResponse = /** status 200 Content link updated */ {
  success: boolean;
  message: string;
  data: {
    projectId?: number;
    workflowId?: number;
    clientId: number | null;
    slug: string;
    title: string;
    client: {
      id: number;
      clientName: string;
      company: string;
      designation: string;
      image: string | null;
    } | null;
  };
};
export type PutApiQuickLinkApiArg = {
  body:
    | {
        projectId: number;
        clientId: number | null;
      }
    | {
        workflowId: number;
        clientId: number | null;
      };
};
export type PutApiQuickLinkBulkApiResponse = /** status 200 Bulk link results */ {
  success: boolean;
  message: string;
  data: {
    updated: {
      projectId?: number;
      workflowId?: number;
      clientId: number | null;
      slug: string;
      title: string;
      client: {
        id: number;
        clientName: string;
        company: string;
        designation: string;
        image: string | null;
      } | null;
    }[];
    failed: {
      projectId?: number;
      workflowId?: number;
      reason: string;
    }[];
  };
};
export type PutApiQuickLinkBulkApiArg = {
  body: {
    links: {
      projectId: number;
      clientId: number | null;
    }[];
  };
};
export type PutApiQuickLinkWorkflowsBulkApiResponse = /** status 200 Bulk workflow link results */ {
  success: boolean;
  message: string;
  data: {
    updated: {
      projectId?: number;
      workflowId?: number;
      clientId: number | null;
      slug: string;
      title: string;
      client: {
        id: number;
        clientName: string;
        company: string;
        designation: string;
        image: string | null;
      } | null;
    }[];
    failed: {
      projectId?: number;
      workflowId?: number;
      reason: string;
    }[];
  };
};
export type PutApiQuickLinkWorkflowsBulkApiArg = {
  body: {
    links: {
      workflowId: number;
      clientId: number | null;
    }[];
  };
};
export type GetApiPagesApiResponse = /** status 200 List of pages */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    pageType: "service" | "persona" | "process" | "now" | "index";
    content: string;
    excerpt: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    published: boolean;
    featured: boolean;
    sortOrder: number | null;
    relatedProjectSlugs: string[];
    relatedWorkflowSlugs: string[];
    updatedAt: string | null;
    publishedAt: string | null;
  }[];
};
export type GetApiPagesApiArg = void;
export type PostApiPagesApiResponse = /** status 201 Page created */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    pageType: "service" | "persona" | "process" | "now" | "index";
    content: string;
    excerpt: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    published: boolean;
    featured: boolean;
    sortOrder: number | null;
    relatedProjectSlugs: string[];
    relatedWorkflowSlugs: string[];
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
export type PostApiPagesApiArg = {
  body: {
    slug: string;
    title: string;
    pageType: "service" | "persona" | "process" | "now" | "index";
    content: string;
    excerpt: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    published: boolean;
    featured: boolean;
    sortOrder: number | null;
    relatedProjectSlugs: string[];
    relatedWorkflowSlugs: string[];
    publishedAt?: string | null;
  };
};
export type GetApiPagesByIdApiResponse = /** status 200 Page details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    pageType: "service" | "persona" | "process" | "now" | "index";
    content: string;
    excerpt: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    published: boolean;
    featured: boolean;
    sortOrder: number | null;
    relatedProjectSlugs: string[];
    relatedWorkflowSlugs: string[];
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
export type GetApiPagesByIdApiArg = {
  id: string;
};
export type PutApiPagesByIdApiResponse = /** status 200 Page updated */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    pageType: "service" | "persona" | "process" | "now" | "index";
    content: string;
    excerpt: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    published: boolean;
    featured: boolean;
    sortOrder: number | null;
    relatedProjectSlugs: string[];
    relatedWorkflowSlugs: string[];
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
export type PutApiPagesByIdApiArg = {
  id: string;
  body: {
    slug?: string;
    title?: string;
    pageType?: "service" | "persona" | "process" | "now" | "index";
    content?: string;
    excerpt?: string | null;
    seoTitle?: string | null;
    seoDescription?: string | null;
    keywords?: string[];
    published?: boolean;
    featured?: boolean;
    sortOrder?: number | null;
    relatedProjectSlugs?: string[];
    relatedWorkflowSlugs?: string[];
    publishedAt?: string | null;
  };
};
export type DeleteApiPagesByIdApiResponse = /** status 200 Page deleted */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    pageType: "service" | "persona" | "process" | "now" | "index";
    content: string;
    excerpt: string | null;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    published: boolean;
    featured: boolean;
    sortOrder: number | null;
    relatedProjectSlugs: string[];
    relatedWorkflowSlugs: string[];
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
export type DeleteApiPagesByIdApiArg = {
  id: string;
};
export type GetApiSiteSettingsApiResponse = /** status 200 Site settings */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    heroHeadline: string | null;
    heroBadge: string | null;
    positioningTitle: string | null;
    positioningDescription: string | null;
    bookingUrl: string | null;
    linkedinUrl: string | null;
    githubUrl: string | null;
    llmsIntro: string | null;
    whoThisIsFor: string[] | null;
    updatedAt: string | null;
  };
};
export type GetApiSiteSettingsApiArg = void;
export type PutApiSiteSettingsApiResponse = /** status 200 Site settings updated */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    heroHeadline: string | null;
    heroBadge: string | null;
    positioningTitle: string | null;
    positioningDescription: string | null;
    bookingUrl: string | null;
    linkedinUrl: string | null;
    githubUrl: string | null;
    llmsIntro: string | null;
    whoThisIsFor: string[] | null;
    updatedAt: string | null;
  };
};
export type PutApiSiteSettingsApiArg = {
  body: {
    heroHeadline?: string | null;
    heroBadge?: string | null;
    positioningTitle?: string | null;
    positioningDescription?: string | null;
    bookingUrl?: string | null;
    linkedinUrl?: string | null;
    githubUrl?: string | null;
    llmsIntro?: string | null;
    whoThisIsFor?: string[] | null;
  };
};
export type GetApiBlogPostsApiResponse = /** status 200 List of blog posts */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    published: boolean;
    featured: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
  }[];
};
export type GetApiBlogPostsApiArg = void;
export type PostApiBlogPostsApiResponse = /** status 201 Blog post created */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    published: boolean;
    featured: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
export type PostApiBlogPostsApiArg = {
  body: {
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage?: string | null;
    published: boolean;
    featured: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    publishedAt?: string | null;
  };
};
export type GetApiBlogPostsByIdApiResponse = /** status 200 Blog post details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    published: boolean;
    featured: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
export type GetApiBlogPostsByIdApiArg = {
  id: string;
};
export type PutApiBlogPostsByIdApiResponse = /** status 200 Blog post updated */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    published: boolean;
    featured: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
export type PutApiBlogPostsByIdApiArg = {
  id: string;
  body: {
    slug?: string;
    title?: string;
    excerpt?: string | null;
    content?: string;
    coverImage?: string | null;
    published?: boolean;
    featured?: boolean;
    seoTitle?: string | null;
    seoDescription?: string | null;
    keywords?: string[];
    publishedAt?: string | null;
  };
};
export type DeleteApiBlogPostsByIdApiResponse = /** status 200 Blog post deleted */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    excerpt: string | null;
    content: string;
    coverImage: string | null;
    published: boolean;
    featured: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    createdAt: string | null;
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
export type DeleteApiBlogPostsByIdApiArg = {
  id: string;
};
export type GetApiLeadMagnetsApiResponse = /** status 200 List of lead magnets */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    description: string;
    magnetType: "pdf" | "calculator";
    pdfUrl: string | null;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    updatedAt: string | null;
  }[];
};
export type GetApiLeadMagnetsApiArg = void;
export type PostApiLeadMagnetsApiResponse = /** status 201 Lead magnet created */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    description: string;
    magnetType: "pdf" | "calculator";
    pdfUrl: string | null;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    updatedAt: string | null;
  };
};
export type PostApiLeadMagnetsApiArg = {
  body: {
    slug: string;
    title: string;
    description: string;
    magnetType: "pdf" | "calculator";
    pdfUrl?: string | null;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
  };
};
export type GetApiLeadMagnetsByIdApiResponse = /** status 200 Lead magnet details */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    description: string;
    magnetType: "pdf" | "calculator";
    pdfUrl: string | null;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    updatedAt: string | null;
  };
};
export type GetApiLeadMagnetsByIdApiArg = {
  id: string;
};
export type PutApiLeadMagnetsByIdApiResponse = /** status 200 Lead magnet updated */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    description: string;
    magnetType: "pdf" | "calculator";
    pdfUrl: string | null;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    updatedAt: string | null;
  };
};
export type PutApiLeadMagnetsByIdApiArg = {
  id: string;
  body: {
    slug?: string;
    title?: string;
    description?: string;
    magnetType?: "pdf" | "calculator";
    pdfUrl?: string | null;
    published?: boolean;
    seoTitle?: string | null;
    seoDescription?: string | null;
    keywords?: string[];
  };
};
export type DeleteApiLeadMagnetsByIdApiResponse = /** status 200 Lead magnet deleted */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    slug: string;
    title: string;
    description: string;
    magnetType: "pdf" | "calculator";
    pdfUrl: string | null;
    published: boolean;
    seoTitle: string | null;
    seoDescription: string | null;
    keywords: string[];
    updatedAt: string | null;
  };
};
export type DeleteApiLeadMagnetsByIdApiArg = {
  id: string;
};
export type PostApiLeadsApiResponse = /** status 201 Lead captured */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    email: string;
    name: string | null;
    magnetSlug: string;
    metadata:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    createdAt: string | null;
  };
};
export type PostApiLeadsApiArg = {
  body: {
    email: string;
    name?: string;
    magnetSlug: string;
    metadata?: {
      [key: string]: string | number | boolean | null;
    };
  };
};
export type GetApiLeadsApiResponse = /** status 200 List of leads */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    email: string;
    name: string | null;
    magnetSlug: string;
    metadata:
      | {
          [key: string]: string | number | boolean | null;
        }
      | {
          [key: string]: string | number | boolean | null;
        };
    createdAt: string | null;
  }[];
};
export type GetApiLeadsApiArg = void;
export const {
  useGetApiProjectsQuery,
  usePostApiProjectsMutation,
  useGetApiProjectsByIdQuery,
  usePutApiProjectsByIdMutation,
  useDeleteApiProjectsByIdMutation,
  useGetApiN8NWorkflowsQuery,
  usePostApiN8NWorkflowsMutation,
  useGetApiN8NWorkflowsByIdQuery,
  usePutApiN8NWorkflowsByIdMutation,
  useDeleteApiN8NWorkflowsByIdMutation,
  useGetApiClientsQuery,
  usePostApiClientsMutation,
  useGetApiClientsByIdQuery,
  usePutApiClientsByIdMutation,
  useDeleteApiClientsByIdMutation,
  useGetApiQuickLinkQuery,
  usePutApiQuickLinkMutation,
  usePutApiQuickLinkBulkMutation,
  usePutApiQuickLinkWorkflowsBulkMutation,
  useGetApiPagesQuery,
  usePostApiPagesMutation,
  useGetApiPagesByIdQuery,
  usePutApiPagesByIdMutation,
  useDeleteApiPagesByIdMutation,
  useGetApiSiteSettingsQuery,
  usePutApiSiteSettingsMutation,
  useGetApiBlogPostsQuery,
  usePostApiBlogPostsMutation,
  useGetApiBlogPostsByIdQuery,
  usePutApiBlogPostsByIdMutation,
  useDeleteApiBlogPostsByIdMutation,
  useGetApiLeadMagnetsQuery,
  usePostApiLeadMagnetsMutation,
  useGetApiLeadMagnetsByIdQuery,
  usePutApiLeadMagnetsByIdMutation,
  useDeleteApiLeadMagnetsByIdMutation,
  usePostApiLeadsMutation,
  useGetApiLeadsQuery,
} = injectedRtkApi;
