import { api } from "./core";

export type CmsPage = {
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
  updatedAt: string;
  publishedAt: string | null;
};

export type SiteSettings = {
  id: number;
  heroHeadline: string | null;
  heroSubheadline: string | null;
  heroBadge: string | null;
  positioningTitle: string | null;
  positioningDescription: string | null;
  availabilityText: string | null;
  projectMinimumText: string | null;
  responseTimeText: string | null;
  bookingUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  llmsIntro: string | null;
  whoThisIsFor: string[] | null;
  updatedAt: string;
};

export type BlogPost = {
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
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

export type LeadMagnet = {
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
  updatedAt: string;
};

export type Lead = {
  id: number;
  email: string;
  name: string | null;
  magnetSlug: string;
  metadata: Record<string, unknown> | null;
  createdAt: string;
};

export const cmsApis = api
  .enhanceEndpoints({ addTagTypes: ["Pages", "Site Settings", "Blog Posts", "Lead Magnets", "Leads"] })
  .injectEndpoints({
    endpoints: (build) => ({
      getApiPages: build.query<{ success: boolean; message: string; data: CmsPage[] }, void>({
        query: () => ({ url: "/api/pages" }),
        providesTags: ["Pages"],
      }),
      getApiPagesById: build.query<{ success: boolean; message: string; data: CmsPage }, { id: string }>({
        query: ({ id }) => ({ url: `/api/pages/${id}` }),
        providesTags: ["Pages"],
      }),
      postApiPages: build.mutation<
        { success: boolean; message: string; data: CmsPage },
        { body: Omit<CmsPage, "id" | "updatedAt"> }
      >({
        query: ({ body }) => ({
          url: "/api/pages",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Pages"],
      }),
      putApiPagesById: build.mutation<
        { success: boolean; message: string; data: CmsPage },
        { id: string; body: Partial<Omit<CmsPage, "id" | "updatedAt">> }
      >({
        query: ({ id, body }) => ({
          url: `/api/pages/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Pages"],
      }),
      deleteApiPagesById: build.mutation<{ success: boolean; message: string; data: CmsPage }, { id: string }>({
        query: ({ id }) => ({
          url: `/api/pages/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Pages"],
      }),
      getApiSiteSettings: build.query<{ success: boolean; message: string; data: SiteSettings }, void>({
        query: () => ({ url: "/api/site-settings" }),
        providesTags: ["Site Settings"],
      }),
      putApiSiteSettings: build.mutation<
        { success: boolean; message: string; data: SiteSettings },
        { body: Partial<Omit<SiteSettings, "id" | "updatedAt">> }
      >({
        query: ({ body }) => ({
          url: "/api/site-settings",
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Site Settings"],
      }),
      getApiBlogPosts: build.query<{ success: boolean; message: string; data: BlogPost[] }, void>({
        query: () => ({ url: "/api/blog-posts" }),
        providesTags: ["Blog Posts"],
      }),
      getApiBlogPostsById: build.query<{ success: boolean; message: string; data: BlogPost }, { id: string }>({
        query: ({ id }) => ({ url: `/api/blog-posts/${id}` }),
        providesTags: ["Blog Posts"],
      }),
      postApiBlogPosts: build.mutation<
        { success: boolean; message: string; data: BlogPost },
        { body: Omit<BlogPost, "id" | "createdAt" | "updatedAt"> }
      >({
        query: ({ body }) => ({
          url: "/api/blog-posts",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Blog Posts"],
      }),
      putApiBlogPostsById: build.mutation<
        { success: boolean; message: string; data: BlogPost },
        { id: string; body: Partial<Omit<BlogPost, "id" | "createdAt" | "updatedAt">> }
      >({
        query: ({ id, body }) => ({
          url: `/api/blog-posts/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Blog Posts"],
      }),
      deleteApiBlogPostsById: build.mutation<{ success: boolean; message: string; data: BlogPost }, { id: string }>({
        query: ({ id }) => ({
          url: `/api/blog-posts/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Blog Posts"],
      }),
      getApiLeadMagnets: build.query<{ success: boolean; message: string; data: LeadMagnet[] }, void>({
        query: () => ({ url: "/api/lead-magnets" }),
        providesTags: ["Lead Magnets"],
      }),
      getApiLeadMagnetsById: build.query<{ success: boolean; message: string; data: LeadMagnet }, { id: string }>({
        query: ({ id }) => ({ url: `/api/lead-magnets/${id}` }),
        providesTags: ["Lead Magnets"],
      }),
      postApiLeadMagnets: build.mutation<
        { success: boolean; message: string; data: LeadMagnet },
        { body: Omit<LeadMagnet, "id" | "updatedAt"> }
      >({
        query: ({ body }) => ({
          url: "/api/lead-magnets",
          method: "POST",
          body,
        }),
        invalidatesTags: ["Lead Magnets"],
      }),
      putApiLeadMagnetsById: build.mutation<
        { success: boolean; message: string; data: LeadMagnet },
        { id: string; body: Partial<Omit<LeadMagnet, "id" | "updatedAt">> }
      >({
        query: ({ id, body }) => ({
          url: `/api/lead-magnets/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Lead Magnets"],
      }),
      deleteApiLeadMagnetsById: build.mutation<{ success: boolean; message: string; data: LeadMagnet }, { id: string }>(
        {
          query: ({ id }) => ({
            url: `/api/lead-magnets/${id}`,
            method: "DELETE",
          }),
          invalidatesTags: ["Lead Magnets"],
        },
      ),
      getApiLeads: build.query<{ success: boolean; message: string; data: Lead[] }, void>({
        query: () => ({ url: "/api/leads" }),
        providesTags: ["Leads"],
      }),
    }),
    overrideExisting: false,
  });

export const {
  useGetApiPagesQuery,
  useGetApiPagesByIdQuery,
  usePostApiPagesMutation,
  usePutApiPagesByIdMutation,
  useDeleteApiPagesByIdMutation,
  useGetApiSiteSettingsQuery,
  usePutApiSiteSettingsMutation,
  useGetApiBlogPostsQuery,
  useGetApiBlogPostsByIdQuery,
  usePostApiBlogPostsMutation,
  usePutApiBlogPostsByIdMutation,
  useDeleteApiBlogPostsByIdMutation,
  useGetApiLeadMagnetsQuery,
  useGetApiLeadMagnetsByIdQuery,
  usePostApiLeadMagnetsMutation,
  usePutApiLeadMagnetsByIdMutation,
  useDeleteApiLeadMagnetsByIdMutation,
  useGetApiLeadsQuery,
} = cmsApis;
