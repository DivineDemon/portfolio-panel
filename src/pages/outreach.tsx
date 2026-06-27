"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardCopy,
  ExternalLink,
  Megaphone,
  Rocket,
  Share2,
  UserRound,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  buildClientBacklinkTemplate,
  buildGuestPitchTemplate,
  buildLinkedInDmTemplate,
  buildLinkedInHeadline,
  buildProductHuntLaunchCopy,
  CLIENT_BACKLINK_TASKS,
  DEFAULT_SITE_URL,
  DIRECTORY_LISTINGS,
  GUEST_POST_TARGETS,
  GUEST_POST_TASKS,
  LINKEDIN_CONTENT_TASKS,
  LINKEDIN_PROFILE_TASKS,
  OUTREACH_WEEKLY_RHYTHM,
  type OutreachTask,
  PRODUCT_HUNT_TASKS,
  SYNDICATION_TARGETS,
} from "@/lib/outreach-playbook";
import { useGetApiSiteSettingsQuery } from "@/store/services/cms-apis";

const STORAGE_KEY = "outreach-checklist-v1";

function priorityVariant(priority: OutreachTask["priority"]) {
  if (priority === "high") return "default";
  if (priority === "medium") return "secondary";
  return "outline";
}

function useOutreachChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      // ignore corrupt storage
    }
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setChecked({});
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { checked, toggle, reset };
}

function ChecklistSection({
  title,
  description,
  tasks,
  checked,
  onToggle,
}: {
  title: string;
  description: string;
  tasks: OutreachTask[];
  checked: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const done = tasks.filter((t) => checked[t.id]).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>
          {description} · {done}/{tasks.length} complete
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {tasks.map((task) => (
          <label
            key={task.id}
            className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 text-sm transition-colors hover:bg-muted/30"
          >
            <input
              type="checkbox"
              className="mt-0.5 size-4 shrink-0 accent-primary"
              checked={Boolean(checked[task.id])}
              onChange={() => onToggle(task.id)}
            />
            <span className="min-w-0 flex-1">
              <span className={checked[task.id] ? "text-muted-foreground line-through" : "font-medium"}>
                {task.label}
              </span>
              {task.notes ? <p className="mt-1 text-muted-foreground text-xs">{task.notes}</p> : null}
              <Badge variant={priorityVariant(task.priority)} className="mt-2">
                {task.priority}
              </Badge>
            </span>
          </label>
        ))}
      </CardContent>
    </Card>
  );
}

function TemplateBlock({
  title,
  subject,
  body,
  useCase,
}: {
  title: string;
  subject?: string;
  body: string;
  useCase: string;
}) {
  const copy = async () => {
    const text = subject ? `Subject: ${subject}\n\n${body}` : body;
    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="rounded-lg border bg-muted/20 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-medium text-sm">{title}</p>
          <p className="mt-0.5 text-muted-foreground text-xs">{useCase}</p>
        </div>
        <Button variant="outline" size="sm" onClick={copy}>
          <ClipboardCopy className="size-3.5" />
          Copy
        </Button>
      </div>
      {subject ? (
        <p className="mt-3 text-muted-foreground text-xs">
          Subject: <span className="text-foreground">{subject}</span>
        </p>
      ) : null}
      <pre className="mt-3 max-h-64 overflow-auto whitespace-pre-wrap font-mono text-xs leading-relaxed">{body}</pre>
    </div>
  );
}

export default function OutreachPage() {
  const { checked, toggle, reset } = useOutreachChecklist();
  const { data: settingsData } = useGetApiSiteSettingsQuery();

  const siteUrl = (import.meta.env.VITE_PUBLIC_SITE_URL as string | undefined)?.replace(/\/$/, "") || DEFAULT_SITE_URL;
  const linkedinUrl = settingsData?.data?.linkedinUrl ?? "https://linkedin.com/in/mushoodhanif";

  const templates = useMemo(
    () => ({
      linkedinHeadline: buildLinkedInHeadline(siteUrl),
      linkedinDm: buildLinkedInDmTemplate(siteUrl),
      guestPitch: buildGuestPitchTemplate(siteUrl),
      clientBacklink: buildClientBacklinkTemplate(siteUrl),
      productHunt: buildProductHuntLaunchCopy(siteUrl),
    }),
    [siteUrl],
  );

  const allTaskIds = [
    ...LINKEDIN_PROFILE_TASKS,
    ...LINKEDIN_CONTENT_TASKS,
    ...DIRECTORY_LISTINGS.map((d) => ({ id: `dir-${d.id}`, label: d.name, priority: "high" as const })),
    ...GUEST_POST_TASKS,
    ...CLIENT_BACKLINK_TASKS,
    ...PRODUCT_HUNT_TASKS,
  ];
  const totalDone = allTaskIds.filter((t) => checked[t.id]).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Outreach</h1>
          <p className="text-muted-foreground text-sm">
            LinkedIn optimization, directory listings, guest posts, client backlinks, and Product Hunt launch.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              Open LinkedIn
              <ExternalLink className="size-3.5" />
            </a>
          </Button>
          <Button variant="outline" size="sm" onClick={reset}>
            Reset checklist
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="font-medium text-sm">Checklist progress</p>
          <p className="mt-1 font-semibold text-2xl tabular-nums">
            {totalDone}/{allTaskIds.length}
          </p>
          <p className="text-muted-foreground text-xs">Tracked locally in this browser</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="font-medium text-sm">Directory targets</p>
          <p className="mt-1 font-semibold text-2xl tabular-nums">{DIRECTORY_LISTINGS.length}</p>
          <p className="text-muted-foreground text-xs">High-DA listings from research</p>
        </div>
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="font-medium text-sm">Guest post targets</p>
          <p className="mt-1 font-semibold text-2xl tabular-nums">{GUEST_POST_TARGETS.length}</p>
          <p className="text-muted-foreground text-xs">DA 70+ publications</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound className="size-5 text-primary" />
            LinkedIn optimization
          </CardTitle>
          <CardDescription>
            Profile updates and content rhythm. Buyers validate on LinkedIn after finding your site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg border border-dashed bg-muted/20 p-4 text-sm">
            <p className="font-medium">Suggested headline</p>
            <p className="mt-2 text-muted-foreground">{templates.linkedinHeadline}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={async () => {
                await navigator.clipboard.writeText(templates.linkedinHeadline);
                toast.success("Headline copied");
              }}
            >
              <ClipboardCopy className="size-3.5" />
              Copy headline
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <ChecklistSection
              title="Profile"
              description="One-time setup"
              tasks={LINKEDIN_PROFILE_TASKS}
              checked={checked}
              onToggle={toggle}
            />
            <ChecklistSection
              title="Content & outbound"
              description="Weekly ongoing"
              tasks={LINKEDIN_CONTENT_TASKS}
              checked={checked}
              onToggle={toggle}
            />
          </div>

          <TemplateBlock {...templates.linkedinDm} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="size-5" />
            Directory listings
          </CardTitle>
          <CardDescription>
            High-impact backlinks from freelancer directories and syndication platforms. Canonical URLs always point to{" "}
            {siteUrl}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3 font-medium">Directory</th>
                  <th className="px-4 py-3 font-medium">DA</th>
                  <th className="px-4 py-3 font-medium">Effort</th>
                  <th className="px-4 py-3 font-medium">Backlink</th>
                  <th className="px-4 py-3 font-medium">Notes</th>
                  <th className="px-4 py-3 font-medium">Done</th>
                </tr>
              </thead>
              <tbody>
                {DIRECTORY_LISTINGS.map((listing) => {
                  const taskId = `dir-${listing.id}`;
                  return (
                    <tr key={listing.id} className="border-b last:border-b-0">
                      <td className="px-4 py-3 align-top">
                        <a
                          href={listing.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-primary underline underline-offset-4"
                        >
                          {listing.name}
                        </a>
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground">{listing.domainAuthority}</td>
                      <td className="px-4 py-3 align-top text-muted-foreground">{listing.effort}</td>
                      <td className="px-4 py-3 align-top">
                        <Badge variant={listing.backlinkValue === "High" ? "default" : "secondary"}>
                          {listing.backlinkValue}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 align-top text-muted-foreground text-xs">{listing.notes}</td>
                      <td className="px-4 py-3 align-top">
                        <input
                          type="checkbox"
                          className="size-4 accent-primary"
                          checked={Boolean(checked[taskId])}
                          onChange={() => toggle(taskId)}
                          aria-label={`Mark ${listing.name} complete`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {SYNDICATION_TARGETS.map((target) => (
              <div key={target.id} className="rounded-lg border p-4 text-sm">
                <a
                  href={target.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary underline underline-offset-4"
                >
                  {target.platform}
                </a>
                <p className="mt-2 text-muted-foreground text-xs">
                  {target.canonicalRule.replace("{siteUrl}", siteUrl).replace("{slug}", "your-post-slug")}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="size-5" />
            Guest posts
          </CardTitle>
          <CardDescription>
            One DA 70+ guest post builds more authority than months of low-effort directory links.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3 font-medium">Publication</th>
                  <th className="px-4 py-3 font-medium">DA</th>
                  <th className="px-4 py-3 font-medium">Topic angle</th>
                  <th className="px-4 py-3 font-medium">Contact</th>
                </tr>
              </thead>
              <tbody>
                {GUEST_POST_TARGETS.map((target) => (
                  <tr key={target.id} className="border-b last:border-b-0">
                    <td className="px-4 py-3 align-top">
                      <a
                        href={target.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-primary underline underline-offset-4"
                      >
                        {target.publication}
                      </a>
                    </td>
                    <td className="px-4 py-3 align-top text-muted-foreground">{target.domainAuthority}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground text-xs">{target.topicAngle}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground text-xs">{target.contactHint}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ChecklistSection
            title="Guest post workflow"
            description="Pitch → write → promote"
            tasks={GUEST_POST_TASKS}
            checked={checked}
            onToggle={toggle}
          />

          <TemplateBlock {...templates.guestPitch} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            Client backlinks
          </CardTitle>
          <CardDescription>
            High-trust contextual links from CEO clients — nearly impossible to replicate any other way.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ChecklistSection
            title="Backlink requests"
            description="Target Scintia, Losono, Lead'em CEOs"
            tasks={CLIENT_BACKLINK_TASKS}
            checked={checked}
            onToggle={toggle}
          />
          <TemplateBlock {...templates.clientBacklink} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="size-5" />
            Product Hunt launch
          </CardTitle>
          <CardDescription>
            Launch Losono (solo build velocity story) or Scintia (enterprise AI SaaS). Even a modest launch generates PH
            backlinks and newsletter coverage.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ChecklistSection
            title="Launch checklist"
            description="Schedule for Tue–Thu, 12:01 AM PT"
            tasks={PRODUCT_HUNT_TASKS}
            checked={checked}
            onToggle={toggle}
          />

          <TemplateBlock {...templates.productHunt} />

          <Button variant="outline" size="sm" asChild>
            <a href="https://www.producthunt.com/posts/new" target="_blank" rel="noopener noreferrer">
              Open Product Hunt submit
              <ArrowUpRight className="size-3.5" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly rhythm</CardTitle>
          <CardDescription>
            Suggested ongoing cadence after initial setup (Week 9–12 of the growth plan).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-2 pl-5 text-muted-foreground text-sm">
            {OUTREACH_WEEKLY_RHYTHM.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-xs">
        Full playbook: <code>docs/outreach-playbook.md</code> in the monorepo. Set <code>VITE_PUBLIC_SITE_URL</code> for
        dynamic template URLs.
      </p>
    </div>
  );
}
