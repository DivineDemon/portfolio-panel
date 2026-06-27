import type {
  DeleteApiBlogPostsByIdApiArg,
  DeleteApiClientsByIdApiArg,
  DeleteApiN8NWorkflowsByIdApiArg,
  DeleteApiPagesByIdApiArg,
  DeleteApiProjectsByIdApiArg,
  GetApiBlogPostsApiResponse,
  GetApiBlogPostsByIdApiArg,
  GetApiClientsApiResponse,
  GetApiClientsByIdApiArg,
  GetApiN8NWorkflowsApiResponse,
  GetApiN8NWorkflowsByIdApiArg,
  GetApiPagesApiResponse,
  GetApiPagesByIdApiArg,
  GetApiProjectsApiResponse,
  GetApiProjectsByIdApiArg,
  PutApiBlogPostsByIdApiArg,
  PutApiClientsByIdApiArg,
  PutApiN8NWorkflowsByIdApiArg,
  PutApiPagesByIdApiArg,
  PutApiProjectsByIdApiArg,
  PutApiQuickLinkApiArg,
  PutApiQuickLinkBulkApiArg,
  PutApiQuickLinkWorkflowsBulkApiArg,
} from "./apis";
import { api } from "./core";

const LIST_ID = "LIST" as const;

export const API_TAG_TYPES = ["Projects", "n8n Workflows", "Clients", "Quick Link", "Pages", "Blog"] as const;

type ApiTagType = (typeof API_TAG_TYPES)[number];

type IdTag = { type: ApiTagType; id: string };

function listTag(type: ApiTagType): IdTag {
  return { type, id: LIST_ID };
}

function entityTag(type: ApiTagType, id: number | string): IdTag {
  return { type, id: String(id) };
}

function listTagsForRecords<T extends { id: number }>(type: ApiTagType, records: T[] | undefined): IdTag[] {
  if (!records?.length) {
    return [listTag(type)];
  }

  return [...records.map((record) => entityTag(type, record.id)), listTag(type)];
}

function invalidateEntityAndList(type: ApiTagType, id: number | string): IdTag[] {
  return [entityTag(type, id), listTag(type)];
}

function invalidateQuickLink(): IdTag[] {
  return [listTag("Quick Link")];
}
/**
 * RTK Query cache tags — maintained manually so `generate:api` can stay tag-free.
 * Import this file after `./apis` in the store setup.
 */
api.enhanceEndpoints({
  addTagTypes: [...API_TAG_TYPES],
  endpoints: {
    getApiProjects: {
      providesTags: (result: GetApiProjectsApiResponse | undefined) => listTagsForRecords("Projects", result?.data),
    },
    getApiProjectsById: {
      providesTags: (_result: unknown, _error: unknown, { id }: GetApiProjectsByIdApiArg) => [
        entityTag("Projects", id),
      ],
    },
    postApiProjects: {
      invalidatesTags: [listTag("Projects"), listTag("Quick Link")],
    },
    putApiProjectsById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: PutApiProjectsByIdApiArg) => [
        ...invalidateEntityAndList("Projects", id),
        ...invalidateQuickLink(),
      ],
    },
    deleteApiProjectsById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: DeleteApiProjectsByIdApiArg) => [
        ...invalidateEntityAndList("Projects", id),
        ...invalidateQuickLink(),
      ],
    },

    getApiN8NWorkflows: {
      providesTags: (result: GetApiN8NWorkflowsApiResponse | undefined) =>
        listTagsForRecords("n8n Workflows", result?.data),
    },
    getApiN8NWorkflowsById: {
      providesTags: (_result: unknown, _error: unknown, { id }: GetApiN8NWorkflowsByIdApiArg) => [
        entityTag("n8n Workflows", id),
      ],
    },
    postApiN8NWorkflows: {
      invalidatesTags: [listTag("n8n Workflows"), listTag("Quick Link")],
    },
    putApiN8NWorkflowsById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: PutApiN8NWorkflowsByIdApiArg) => [
        ...invalidateEntityAndList("n8n Workflows", id),
        ...invalidateQuickLink(),
      ],
    },
    deleteApiN8NWorkflowsById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: DeleteApiN8NWorkflowsByIdApiArg) => [
        ...invalidateEntityAndList("n8n Workflows", id),
        ...invalidateQuickLink(),
      ],
    },

    getApiClients: {
      providesTags: (result: GetApiClientsApiResponse | undefined) => listTagsForRecords("Clients", result?.data),
    },
    getApiClientsById: {
      providesTags: (_result: unknown, _error: unknown, { id }: GetApiClientsByIdApiArg) => [entityTag("Clients", id)],
    },
    postApiClients: {
      invalidatesTags: [listTag("Clients"), listTag("Quick Link")],
    },
    putApiClientsById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: PutApiClientsByIdApiArg) => [
        ...invalidateEntityAndList("Clients", id),
        ...invalidateQuickLink(),
        listTag("Projects"),
        listTag("n8n Workflows"),
      ],
    },
    deleteApiClientsById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: DeleteApiClientsByIdApiArg) => [
        ...invalidateEntityAndList("Clients", id),
        ...invalidateQuickLink(),
        listTag("Projects"),
        listTag("n8n Workflows"),
      ],
    },

    getApiQuickLink: {
      providesTags: [listTag("Quick Link")],
    },
    putApiQuickLink: {
      invalidatesTags: (_result: unknown, _error: unknown, { body }: PutApiQuickLinkApiArg) => {
        const tags = invalidateQuickLink();

        if ("projectId" in body) {
          tags.push(...invalidateEntityAndList("Projects", body.projectId));
        }

        if ("workflowId" in body) {
          tags.push(...invalidateEntityAndList("n8n Workflows", body.workflowId));
        }

        return tags;
      },
    },
    putApiQuickLinkBulk: {
      invalidatesTags: (_result: unknown, _error: unknown, { body }: PutApiQuickLinkBulkApiArg) => {
        const tags = invalidateQuickLink();
        const projectIds = new Set<number>();

        for (const link of body.links) {
          projectIds.add(link.projectId);
        }

        for (const projectId of projectIds) {
          tags.push(entityTag("Projects", projectId));
        }

        tags.push(listTag("Projects"));

        return tags;
      },
    },
    putApiQuickLinkWorkflowsBulk: {
      invalidatesTags: (_result: unknown, _error: unknown, { body }: PutApiQuickLinkWorkflowsBulkApiArg) => {
        const tags = invalidateQuickLink();
        const workflowIds = new Set<number>();

        for (const link of body.links) {
          workflowIds.add(link.workflowId);
        }

        for (const workflowId of workflowIds) {
          tags.push(entityTag("n8n Workflows", workflowId));
        }

        tags.push(listTag("n8n Workflows"));

        return tags;
      },
    },

    getApiPages: {
      providesTags: (result: GetApiPagesApiResponse | undefined) => listTagsForRecords("Pages", result?.data),
    },
    getApiPagesById: {
      providesTags: (_result: unknown, _error: unknown, { id }: GetApiPagesByIdApiArg) => [entityTag("Pages", id)],
    },
    postApiPages: {
      invalidatesTags: [listTag("Pages")],
    },
    putApiPagesById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: PutApiPagesByIdApiArg) =>
        invalidateEntityAndList("Pages", id),
    },
    deleteApiPagesById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: DeleteApiPagesByIdApiArg) =>
        invalidateEntityAndList("Pages", id),
    },

    getApiBlogPosts: {
      providesTags: (result: GetApiBlogPostsApiResponse | undefined) => listTagsForRecords("Blog", result?.data),
    },
    getApiBlogPostsById: {
      providesTags: (_result: unknown, _error: unknown, { id }: GetApiBlogPostsByIdApiArg) => [entityTag("Blog", id)],
    },
    postApiBlogPosts: {
      invalidatesTags: [listTag("Blog")],
    },
    putApiBlogPostsById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: PutApiBlogPostsByIdApiArg) =>
        invalidateEntityAndList("Blog", id),
    },
    deleteApiBlogPostsById: {
      invalidatesTags: (_result: unknown, _error: unknown, { id }: DeleteApiBlogPostsByIdApiArg) =>
        invalidateEntityAndList("Blog", id),
    },
  },
});
