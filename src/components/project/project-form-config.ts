/**
 * Project create/update API body fields (from PostApiProjectsApiArg["body"] / PutApiProjectsByIdApiArg["body"]).
 * Used to drive the multistep form and keep one source of truth.
 *
 * Full list of fields required to create/update a project:
 *
 * Basics (Step 1)
 * - slug: string
 * - title: string
 * - tagline: string
 * - industry: string | null
 * - projectType: string | null
 * - status: string | null
 * - role: string
 * - engagementModel: string | null
 * - teamSize: number | null
 * - durationInMonths: number | null
 *
 * Story & content (Step 2)
 * - problem: string
 * - context: string | null
 * - strategy: string
 * - architecture: string
 * - execution: string
 * - challenges: string | null
 * - solution: string
 * - measurableImpact: string
 * - metrics: { [key: string]: string | number | boolean | null }
 *
 * Tech & media (Step 3)
 * - keywords: string[]
 * - techStack: string[]
 * - infrastructure: string[]
 * - integrations: string[]
 * - coverImage: string
 * - galleryImages: string[]
 *
 * SEO & links (Step 4)
 * - seoTitle: string | null
 * - seoDescription: string | null
 * - repositoryUrl: string | null
 * - demoUrl: string | null
 * - featured: boolean
 * - published: boolean
 *
 * Optional (usually set by API, not form)
 * - updatedAt?: string | null
 */

export const PROJECT_FORM_STEP_LABELS = ["Basics", "Story & content", "Tech & media", "SEO & links"] as const;

export type ProjectFormStepId = 0 | 1 | 2 | 3;

export const PROJECT_FORM_STEP_COUNT = 4;
