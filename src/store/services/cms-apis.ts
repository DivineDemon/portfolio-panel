import type {
  GetApiBlogPostsApiResponse,
  GetApiBlogPostsByIdApiResponse,
  GetApiPagesApiResponse,
  GetApiPagesByIdApiResponse,
} from "./apis";

export type CmsPage = GetApiPagesApiResponse["data"][number];
export type BlogPost = GetApiBlogPostsApiResponse["data"][number];

export type CmsPageDetail = GetApiPagesByIdApiResponse["data"];
export type BlogPostDetail = GetApiBlogPostsByIdApiResponse["data"];

export {
  useDeleteApiBlogPostsByIdMutation,
  useDeleteApiPagesByIdMutation,
  useGetApiBlogPostsByIdQuery,
  useGetApiBlogPostsQuery,
  useGetApiPagesByIdQuery,
  useGetApiPagesQuery,
  usePostApiBlogPostsMutation,
  usePostApiPagesMutation,
  usePutApiBlogPostsByIdMutation,
  usePutApiPagesByIdMutation,
} from "./apis";
