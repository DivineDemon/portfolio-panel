export type OutreachPriority = "high" | "medium" | "low";

export type OutreachTask = {
  id: string;
  label: string;
  notes?: string;
  priority: OutreachPriority;
};

export type DirectoryListing = {
  id: string;
  name: string;
  url: string;
  domainAuthority: string;
  effort: string;
  backlinkValue: string;
  notes: string;
};

export type GuestPostTarget = {
  id: string;
  publication: string;
  url: string;
  domainAuthority: string;
  topicAngle: string;
  contactHint: string;
};

export type OutreachTemplate = {
  id: string;
  title: string;
  subject?: string;
  body: string;
  useCase: string;
};

export type SyndicationTarget = {
  id: string;
  platform: string;
  url: string;
  canonicalRule: string;
};

export const DEFAULT_SITE_URL = "https://mushoodhanif.com";

export const LINKEDIN_PROFILE_TASKS: OutreachTask[] = [
  {
    id: "linkedin-headline",
    label: "Update headline to outcome-focused positioning",
    notes: 'Example: "SaaS & AI Systems Architect | I build the products founders can\'t afford to get wrong"',
    priority: "high",
  },
  {
    id: "linkedin-featured",
    label: "Add Featured links: top 2 case studies + contact/booking URL",
    priority: "high",
  },
  {
    id: "linkedin-about",
    label: "Rewrite About to mirror homepage positioning (outcomes, not skills list)",
    priority: "high",
  },
  {
    id: "linkedin-experience",
    label: "Add 2–3 business-impact bullets per role (not job duties)",
    priority: "medium",
  },
  {
    id: "linkedin-banner",
    label: "Custom banner with value prop or case-study metric",
    priority: "medium",
  },
  {
    id: "linkedin-website",
    label: "Set custom button to portfolio site URL",
    priority: "high",
  },
];

export const LINKEDIN_CONTENT_TASKS: OutreachTask[] = [
  {
    id: "linkedin-cadence",
    label: "Schedule 2–3 posts per week (problem-solution, case study, POV)",
    priority: "high",
  },
  {
    id: "linkedin-engage",
    label: "Engage with 10–15 founder/CEO posts weekly before any DM outreach",
    priority: "medium",
  },
  {
    id: "linkedin-syndicate",
    label: "Share each new blog post with a native hook + link to canonical URL",
    priority: "medium",
  },
  {
    id: "linkedin-dm-batch",
    label: "Send 5–10 warm DMs per week to ICP founders (see template below)",
    priority: "medium",
  },
];

export const DIRECTORY_LISTINGS: DirectoryListing[] = [
  {
    id: "clutch",
    name: "Clutch.co",
    url: "https://clutch.co/profile/create",
    domainAuthority: "DA 60+",
    effort: "~2 hours",
    backlinkValue: "High",
    notes: "Freelancer/consultant profile. Request reviews from Scintia, Losono, and Lead'em CEOs.",
  },
  {
    id: "arc",
    name: "arc.dev",
    url: "https://arc.dev",
    domainAuthority: "High",
    effort: "~1 hour",
    backlinkValue: "High",
    notes: "Engineer directory. Link portfolio, highlight fractional CTO + AI automation.",
  },
  {
    id: "toptal",
    name: "Toptal",
    url: "https://www.toptal.com/talent/apply",
    domainAuthority: "High",
    effort: "~2 hours",
    backlinkValue: "High",
    notes: "Apply even if not actively taking Toptal work — profile backlink and credibility signal.",
  },
  {
    id: "indie-hackers",
    name: "Indie Hackers",
    url: "https://www.indiehackers.com",
    domainAuthority: "Medium",
    effort: "~1 hour",
    backlinkValue: "Medium",
    notes: "Profile + build log post for Losono or Scintia with link back to case study.",
  },
  {
    id: "nownownow",
    name: "nownownow.com",
    url: "https://nownownow.com/about",
    domainAuthority: "Low",
    effort: "10 min",
    backlinkValue: "Low",
    notes: "Submit after publishing the /now CMS page. Follow their submission format exactly.",
  },
  {
    id: "devto",
    name: "dev.to",
    url: "https://dev.to/settings",
    domainAuthority: "High",
    effort: "30 min / post",
    backlinkValue: "Medium",
    notes: "Syndicate blog posts with canonical URL pointing to mushoodhanif.com/blog/{slug}.",
  },
  {
    id: "hashnode",
    name: "Hashnode",
    url: "https://hashnode.com",
    domainAuthority: "High",
    effort: "30 min / post",
    backlinkValue: "Medium",
    notes: "Cross-post blog content; set canonical to your site in post settings.",
  },
  {
    id: "github-readme",
    name: "GitHub profile README",
    url: "https://github.com/settings/profile",
    domainAuthority: "Medium",
    effort: "30 min",
    backlinkValue: "Medium",
    notes: "Pin repos with detailed READMEs linking to relevant case study pages.",
  },
];

export const GUEST_POST_TARGETS: GuestPostTarget[] = [
  {
    id: "logrocket",
    publication: "LogRocket Blog",
    url: "https://blog.logrocket.com/write-for-us/",
    domainAuthority: "DA 70+",
    topicAngle: "Production n8n patterns or multi-tenant SaaS architecture lessons from Scintia",
    contactHint: "Use their contributor form; lead with a specific outline, not a generic pitch.",
  },
  {
    id: "smashing",
    publication: "Smashing Magazine",
    url: "https://www.smashingmagazine.com/write-for-us/",
    domainAuthority: "DA 90+",
    topicAngle: "SaaS UX/architecture trade-offs for early-stage products",
    contactHint: "Highly selective — propose one deeply practical article with code examples.",
  },
  {
    id: "newstack",
    publication: "The New Stack",
    url: "https://thenewstack.io/write-for-the-new-stack/",
    domainAuthority: "DA 80+",
    topicAngle: "AI automation as business model decision (n8n workflow showcase angle)",
    contactHint: "Emphasize practitioner perspective, not vendor marketing.",
  },
  {
    id: "freecodecamp",
    publication: "freeCodeCamp",
    url: "https://www.freecodecamp.org/news/how-to-write-for-freecodecamp/",
    domainAuthority: "DA 90+",
    topicAngle: "Step-by-step guide: building production AI agents with LangChain/Next.js",
    contactHint: "Tutorial format with working repo link; mention Losono case study in bio.",
  },
];

export const GUEST_POST_TASKS: OutreachTask[] = [
  {
    id: "guest-outline-1",
    label: "Draft outline for first guest post (pick LogRocket or freeCodeCamp)",
    priority: "high",
  },
  {
    id: "guest-pitch-5",
    label: "Send personalized pitches to 5 publications",
    priority: "high",
  },
  {
    id: "guest-write-1",
    label: "Write and submit first accepted guest post",
    priority: "high",
  },
  {
    id: "guest-canonical",
    label: "Ensure author bio links to portfolio + one case study URL",
    priority: "medium",
  },
  {
    id: "guest-promote",
    label: "Promote published guest post on LinkedIn within 48 hours",
    priority: "medium",
  },
];

export const CLIENT_BACKLINK_TASKS: OutreachTask[] = [
  {
    id: "client-identify",
    label: "Identify 3 CEO clients with live company sites (Scintia, Losono, Lead'em)",
    priority: "high",
  },
  {
    id: "client-ask",
    label: "Send backlink request email to each (template below)",
    priority: "high",
  },
  {
    id: "client-followup",
    label: "Follow up once after 7 days if no response",
    priority: "medium",
  },
  {
    id: "client-verify",
    label: "Verify live links and add to outreach tracker",
    priority: "medium",
  },
];

export const PRODUCT_HUNT_TASKS: OutreachTask[] = [
  {
    id: "ph-pick",
    label: "Choose launch product: Losono (solo build story) or Scintia (enterprise AI SaaS)",
    priority: "high",
  },
  {
    id: "ph-assets",
    label: "Prepare gallery images, tagline, maker comment, and first comment draft",
    priority: "high",
  },
  {
    id: "ph-hunters",
    label: "Line up 5–10 supporters to upvote and comment at launch (12:01 AM PT)",
    priority: "high",
  },
  {
    id: "ph-schedule",
    label: "Schedule launch for Tuesday–Thursday (avoid holidays)",
    priority: "medium",
  },
  {
    id: "ph-crosspost",
    label: "Cross-post to LinkedIn, Twitter/X, and Indie Hackers on launch day",
    priority: "medium",
  },
  {
    id: "ph-backlink",
    label: "Add Product Hunt badge/link to case study page after launch",
    priority: "low",
  },
];

export const SYNDICATION_TARGETS: SyndicationTarget[] = [
  {
    id: "devto-syndicate",
    platform: "dev.to",
    url: "https://dev.to/new",
    canonicalRule: "Set canonical URL to {siteUrl}/blog/{slug} in front matter",
  },
  {
    id: "hashnode-syndicate",
    platform: "Hashnode",
    url: "https://hashnode.com/create",
    canonicalRule: "Enable canonical URL in post SEO settings → {siteUrl}/blog/{slug}",
  },
  {
    id: "linkedin-syndicate",
    platform: "LinkedIn Articles",
    url: "https://www.linkedin.com/article/new/",
    canonicalRule: "Publish excerpt + link to full post on site (do not duplicate full text)",
  },
  {
    id: "medium-syndicate",
    platform: "Medium",
    url: "https://medium.com/new-story",
    canonicalRule: "Import story with canonical link via Medium import tool",
  },
];

export function buildLinkedInHeadline(siteUrl: string): string {
  return `SaaS & AI Systems Architect | I build the products founders can't afford to get wrong | ${siteUrl}`;
}

export function buildLinkedInDmTemplate(siteUrl: string): OutreachTemplate {
  return {
    id: "linkedin-dm",
    title: "Warm founder DM",
    useCase: "After engaging with their content 2–3 times",
    body: `Hi {{firstName}} — I've been following what you're building at {{company}}.

I recently helped a {{similarStage}} company solve a similar {{problemArea}} challenge (happy to share specifics if useful).

No pitch — just offering context if it's helpful as you scale. Here's a relevant case study: ${siteUrl}/projects/{{caseStudySlug}}

— Mushood`,
  };
}

export function buildGuestPitchTemplate(siteUrl: string): OutreachTemplate {
  return {
    id: "guest-pitch",
    title: "Guest post pitch",
    subject: "Guest post pitch: {{workingTitle}}",
    useCase: "First contact with publication editor",
    body: `Hi {{editorName}},

I'd like to contribute a practitioner-focused article to {{publication}}:

**Working title:** {{workingTitle}}

**Audience fit:** Founders and engineering leaders evaluating {{topic}} — not a tool roundup, but lessons from shipping production systems.

**Outline:**
1. {{point1}}
2. {{point2}}
3. {{point3}}

**Credibility:** I've led SaaS and AI automation builds for funded startups (case studies: ${siteUrl}/work). Recent writing: ${siteUrl}/blog.

**Bio link:** ${siteUrl}

Happy to adjust angle to your editorial calendar. Target length: {{wordCount}} words.

Best,
Mushood Hanif`,
  };
}

export function buildClientBacklinkTemplate(siteUrl: string): OutreachTemplate {
  return {
    id: "client-backlink",
    title: "Client backlink request",
    subject: "Quick favor — portfolio link on {{company}} site?",
    useCase: "Email to CEO clients after successful engagement",
    body: `Hi {{clientFirstName}},

Hope things are going well at {{company}}.

I'm updating my portfolio and wondered if you'd be open to a small link on your site — a "Built by" or partners mention pointing to ${siteUrl}/projects/{{projectSlug}}.

Totally optional, but it helps future founders see the work we did together. Happy to draft the copy if that saves you time.

Thanks either way,
Mushood`,
  };
}

export function buildProductHuntLaunchCopy(siteUrl: string): OutreachTemplate {
  return {
    id: "ph-maker-comment",
    title: "Product Hunt maker first comment",
    useCase: "Post immediately after launch goes live",
    body: `Hey Product Hunt 👋

I'm Mushood — I built {{productName}} to solve {{coreProblem}}.

**Why I built it:** {{oneParagraphOriginStory}}

**What makes it different:** {{differentiator}}

**Try it:** {{demoUrl}}

I documented the full build here: ${siteUrl}/projects/{{projectSlug}}

Happy to answer any questions about the stack, architecture decisions, or go-to-market. Ask me anything!`,
  };
}

export function buildProductHuntTagline(): string {
  return "{{productName}} — {{oneLineValueProp}}";
}

export const OUTREACH_WEEKLY_RHYTHM = [
  "Monday: Draft or schedule 1 LinkedIn post; review RB2B/GA4 for company visitors to outreach.",
  "Tuesday: Engage with 5 ICP founder posts; send 2 warm DMs.",
  "Wednesday: Syndicate latest blog post to dev.to or Hashnode with canonical URL.",
  "Thursday: 1 guest-post pitch or client backlink follow-up.",
  "Friday: Publish LinkedIn case-study snippet; update outreach checklist in panel.",
] as const;
