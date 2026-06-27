import type { BlogPostFormValues, PageFormValues } from "@/lib/form-schemas";
import type { BlogPostDetail, CmsPageDetail } from "@/store/services/cms-apis";

function joinCsv(values?: string[] | null) {
  return (values ?? []).join(", ");
}

export function pageDetailToFormValues(page: CmsPageDetail): PageFormValues {
  return {
    slug: page.slug,
    title: page.title,
    pageType: page.pageType,
    content: page.content,
    excerpt: page.excerpt ?? "",
    seoTitle: page.seoTitle ?? "",
    seoDescription: page.seoDescription ?? "",
    keywords: joinCsv(page.keywords),
    relatedProjectSlugs: joinCsv(page.relatedProjectSlugs),
    relatedWorkflowSlugs: joinCsv(page.relatedWorkflowSlugs),
    sortOrder: page.sortOrder ?? "",
    featured: page.featured,
    published: page.published,
  };
}

export function blogPostDetailToFormValues(post: BlogPostDetail): BlogPostFormValues {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    content: post.content,
    coverImage: post.coverImage ?? "",
    seoTitle: post.seoTitle ?? "",
    seoDescription: post.seoDescription ?? "",
    keywords: joinCsv(post.keywords),
    featured: post.featured,
    published: post.published,
  };
}
