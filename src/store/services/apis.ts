import { api } from "./core";

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiProjects: build.query<GetApiProjectsApiResponse, GetApiProjectsApiArg>({
      query: () => ({ url: `/api/projects` }),
    }),
    postApiProjects: build.mutation<PostApiProjectsApiResponse, PostApiProjectsApiArg>({
      query: (queryArg) => ({
        url: `/api/projects`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiProjectsById: build.query<GetApiProjectsByIdApiResponse, GetApiProjectsByIdApiArg>({
      query: (queryArg) => ({ url: `/api/projects/${queryArg.id}` }),
    }),
    putApiProjectsById: build.mutation<PutApiProjectsByIdApiResponse, PutApiProjectsByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/projects/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteApiProjectsById: build.mutation<DeleteApiProjectsByIdApiResponse, DeleteApiProjectsByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/projects/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiN8NWorkflows: build.query<GetApiN8NWorkflowsApiResponse, GetApiN8NWorkflowsApiArg>({
      query: () => ({ url: `/api/n8n-workflows` }),
    }),
    postApiN8NWorkflows: build.mutation<PostApiN8NWorkflowsApiResponse, PostApiN8NWorkflowsApiArg>({
      query: (queryArg) => ({
        url: `/api/n8n-workflows`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiN8NWorkflowsById: build.query<GetApiN8NWorkflowsByIdApiResponse, GetApiN8NWorkflowsByIdApiArg>({
      query: (queryArg) => ({ url: `/api/n8n-workflows/${queryArg.id}` }),
    }),
    putApiN8NWorkflowsById: build.mutation<PutApiN8NWorkflowsByIdApiResponse, PutApiN8NWorkflowsByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/n8n-workflows/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteApiN8NWorkflowsById: build.mutation<DeleteApiN8NWorkflowsByIdApiResponse, DeleteApiN8NWorkflowsByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/n8n-workflows/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiClients: build.query<GetApiClientsApiResponse, GetApiClientsApiArg>({
      query: () => ({ url: `/api/clients` }),
    }),
    postApiClients: build.mutation<PostApiClientsApiResponse, PostApiClientsApiArg>({
      query: (queryArg) => ({
        url: `/api/clients`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiClientsById: build.query<GetApiClientsByIdApiResponse, GetApiClientsByIdApiArg>({
      query: (queryArg) => ({ url: `/api/clients/${queryArg.id}` }),
    }),
    putApiClientsById: build.mutation<PutApiClientsByIdApiResponse, PutApiClientsByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/clients/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteApiClientsById: build.mutation<DeleteApiClientsByIdApiResponse, DeleteApiClientsByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/clients/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiQuickLink: build.query<GetApiQuickLinkApiResponse, GetApiQuickLinkApiArg>({
      query: () => ({ url: `/api/quick-link` }),
    }),
    putApiQuickLink: build.mutation<PutApiQuickLinkApiResponse, PutApiQuickLinkApiArg>({
      query: (queryArg) => ({
        url: `/api/quick-link`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    putApiQuickLinkBulk: build.mutation<PutApiQuickLinkBulkApiResponse, PutApiQuickLinkBulkApiArg>({
      query: (queryArg) => ({
        url: `/api/quick-link/bulk`,
        method: "PUT",
        body: queryArg.body,
      }),
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
    }),
    getApiPages: build.query<GetApiPagesApiResponse, GetApiPagesApiArg>({
      query: () => ({ url: `/api/pages` }),
    }),
    postApiPages: build.mutation<PostApiPagesApiResponse, PostApiPagesApiArg>({
      query: (queryArg) => ({
        url: `/api/pages`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiPagesById: build.query<GetApiPagesByIdApiResponse, GetApiPagesByIdApiArg>({
      query: (queryArg) => ({ url: `/api/pages/${queryArg.id}` }),
    }),
    putApiPagesById: build.mutation<PutApiPagesByIdApiResponse, PutApiPagesByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/pages/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteApiPagesById: build.mutation<DeleteApiPagesByIdApiResponse, DeleteApiPagesByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/pages/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiBlogPosts: build.query<GetApiBlogPostsApiResponse, GetApiBlogPostsApiArg>({
      query: () => ({ url: `/api/blog-posts` }),
    }),
    postApiBlogPosts: build.mutation<PostApiBlogPostsApiResponse, PostApiBlogPostsApiArg>({
      query: (queryArg) => ({
        url: `/api/blog-posts`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiBlogPostsById: build.query<GetApiBlogPostsByIdApiResponse, GetApiBlogPostsByIdApiArg>({
      query: (queryArg) => ({ url: `/api/blog-posts/${queryArg.id}` }),
    }),
    putApiBlogPostsById: build.mutation<PutApiBlogPostsByIdApiResponse, PutApiBlogPostsByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/blog-posts/${queryArg.id}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    deleteApiBlogPostsById: build.mutation<DeleteApiBlogPostsByIdApiResponse, DeleteApiBlogPostsByIdApiArg>({
      query: (queryArg) => ({
        url: `/api/blog-posts/${queryArg.id}`,
        method: "DELETE",
      }),
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
    pageType: "persona";
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
    pageType: "persona";
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
    pageType: "persona";
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
    pageType: "persona";
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
    pageType: "persona";
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
    pageType?: "persona";
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
    pageType: "persona";
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
  useGetApiBlogPostsQuery,
  usePostApiBlogPostsMutation,
  useGetApiBlogPostsByIdQuery,
  usePutApiBlogPostsByIdMutation,
  useDeleteApiBlogPostsByIdMutation,
} = injectedRtkApi;
