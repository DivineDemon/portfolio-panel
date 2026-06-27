import type {
  GetApiBlogPostsApiResponse,
  GetApiBlogPostsByIdApiResponse,
  GetApiLeadMagnetsApiResponse,
  GetApiLeadMagnetsByIdApiResponse,
  GetApiLeadsApiResponse,
  GetApiPagesApiResponse,
  GetApiPagesByIdApiResponse,
  GetApiSiteSettingsApiResponse,
} from "./apis";

/** CMS entity types derived from the generated OpenAPI client — stay in sync after `generate:api`. */
export type CmsPage = GetApiPagesApiResponse["data"][number];
export type SiteSettings = GetApiSiteSettingsApiResponse["data"];
export type BlogPost = GetApiBlogPostsApiResponse["data"][number];
export type LeadMagnet = GetApiLeadMagnetsApiResponse["data"][number];
export type Lead = GetApiLeadsApiResponse["data"][number];

export type CmsPageDetail = GetApiPagesByIdApiResponse["data"];
export type BlogPostDetail = GetApiBlogPostsByIdApiResponse["data"];
export type LeadMagnetDetail = GetApiLeadMagnetsByIdApiResponse["data"];

export {
  useDeleteApiBlogPostsByIdMutation,
  useDeleteApiLeadMagnetsByIdMutation,
  useDeleteApiPagesByIdMutation,
  useGetApiBlogPostsByIdQuery,
  useGetApiBlogPostsQuery,
  useGetApiLeadMagnetsByIdQuery,
  useGetApiLeadMagnetsQuery,
  useGetApiLeadsQuery,
  useGetApiPagesByIdQuery,
  useGetApiPagesQuery,
  useGetApiSiteSettingsQuery,
  usePostApiBlogPostsMutation,
  usePostApiLeadMagnetsMutation,
  usePostApiPagesMutation,
  usePutApiBlogPostsByIdMutation,
  usePutApiLeadMagnetsByIdMutation,
  usePutApiPagesByIdMutation,
  usePutApiSiteSettingsMutation,
} from "./apis";
