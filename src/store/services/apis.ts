import { api } from "./core";
export const addTagTypes = ["Projects", "Clients", "Quick Link"] as const;
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
        invalidatesTags: ["Quick Link", "Projects"],
      }),
      putApiQuickLinkBulk: build.mutation<PutApiQuickLinkBulkApiResponse, PutApiQuickLinkBulkApiArg>({
        query: (queryArg) => ({
          url: `/api/quick-link/bulk`,
          method: "PUT",
          body: queryArg.body,
        }),
        invalidatesTags: ["Quick Link", "Projects"],
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
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
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
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
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
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
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
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
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
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
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
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
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
      company: string;
      content: string;
      designation: string;
      clientName: string;
      feedback: string | null;
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
export type GetApiClientsApiResponse = /** status 200 List of clients */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
  }[];
};
export type GetApiClientsApiArg = void;
export type PostApiClientsApiResponse = /** status 201 Client created successfully */ {
  success: boolean;
  message: string;
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
  };
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
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
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
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
  };
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
  data: {
    id: number;
    image: string | null;
    company: string;
    content: string;
    designation: string;
    clientName: string;
    feedback: string | null;
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
    clients: {
      id: number;
      clientName: string;
      company: string;
      designation: string;
      image: string | null;
      linkedProjectCount: number;
    }[];
  };
};
export type GetApiQuickLinkApiArg = void;
export type PutApiQuickLinkApiResponse = /** status 200 Project link updated */ {
  success: boolean;
  message: string;
  data: {
    projectId: number;
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
  body: {
    projectId: number;
    clientId: number | null;
  };
};
export type PutApiQuickLinkBulkApiResponse = /** status 200 Bulk link results */ {
  success: boolean;
  message: string;
  data: {
    updated: {
      projectId: number;
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
      projectId: number;
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
  useGetApiQuickLinkQuery,
  usePutApiQuickLinkMutation,
  usePutApiQuickLinkBulkMutation,
} = injectedRtkApi;
