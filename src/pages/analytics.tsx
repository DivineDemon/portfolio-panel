import { CheckCircle2, ExternalLink, LineChart } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENT_CATALOG, ENGAGEMENT_KEY_EVENTS, PRIMARY_KEY_EVENTS } from "@/lib/analytics-events";

const ga4PropertyUrl = import.meta.env.VITE_GA4_PROPERTY_URL as string | undefined;
const gscUrl = import.meta.env.VITE_GSC_PROPERTY_URL as string | undefined;
const clarityUrl = import.meta.env.VITE_CLARITY_PROJECT_URL as string | undefined;
const posthogProjectUrl = import.meta.env.VITE_POSTHOG_PROJECT_URL as string | undefined;

function tierBadgeVariant(tier: "primary" | "engagement") {
  return tier === "primary" ? "default" : "secondary";
}

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Analytics</h1>
          <p className="text-muted-foreground text-sm">
            GA4 key events, PostHog product analytics, and quick links to your reporting tools.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {ga4PropertyUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a href={ga4PropertyUrl} target="_blank" rel="noopener noreferrer">
                Open GA4
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          ) : null}
          {posthogProjectUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a href={posthogProjectUrl} target="_blank" rel="noopener noreferrer">
                Open PostHog
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          ) : null}
          {gscUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a href={gscUrl} target="_blank" rel="noopener noreferrer">
                Search Console
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          ) : null}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="size-5 text-primary" />
            GA4 key events
          </CardTitle>
          <CardDescription>
            These events fire on the public site. Mark each as a key event in GA4 Admin → Events to track conversion
            rate and key event rate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-medium text-sm">Primary conversions</p>
              <p className="mt-1 font-semibold text-2xl tabular-nums">{PRIMARY_KEY_EVENTS.length}</p>
              <p className="text-muted-foreground text-xs">Form and booking</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-medium text-sm">Engagement events</p>
              <p className="mt-1 font-semibold text-2xl tabular-nums">{ENGAGEMENT_KEY_EVENTS.length}</p>
              <p className="text-muted-foreground text-xs">CTAs and case studies</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-medium text-sm">Total tracked</p>
              <p className="mt-1 font-semibold text-2xl tabular-nums">{ANALYTICS_EVENT_CATALOG.length}</p>
              <p className="text-muted-foreground text-xs">Custom events (GA4 + PostHog)</p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">Tier</th>
                  <th className="px-4 py-3 font-medium">Parameters</th>
                  <th className="px-4 py-3 font-medium">Fired from</th>
                  <th className="px-4 py-3 font-medium">Key event</th>
                </tr>
              </thead>
              <tbody>
                {ANALYTICS_EVENT_CATALOG.map((event) => (
                  <tr key={event.name} className="border-b last:border-b-0">
                    <td className="px-4 py-3 align-top">
                      <p className="font-medium">{event.label}</p>
                      <p className="mt-0.5 font-mono text-muted-foreground text-xs">{event.name}</p>
                      <p className="mt-1 text-muted-foreground text-xs">{event.description}</p>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <Badge variant={tierBadgeVariant(event.tier)}>{event.tier}</Badge>
                    </td>
                    <td className="px-4 py-3 align-top">
                      <code className="text-xs">{event.parameters.join(", ")}</code>
                    </td>
                    <td className="px-4 py-3 align-top text-muted-foreground text-xs">{event.firedFrom.join(" · ")}</td>
                    <td className="px-4 py-3 align-top">
                      {event.markAsKeyEvent ? <Badge variant="outline">Mark in GA4</Badge> : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-dashed bg-muted/20 p-4 text-sm">
            <p className="font-medium">Enable key events in GA4</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>
                Open GA4 → <strong>Admin</strong> → <strong>Events</strong> and wait 24–48h for custom events to appear
                after traffic.
              </li>
              <li>
                Toggle <strong>Mark as key event</strong> for each event in the table above (start with the primary
                conversions).
              </li>
              <li>
                Review <strong>Reports → Engagement → Events</strong> and <strong>Key event rate</strong> weekly.
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="size-5" />
            PostHog
          </CardTitle>
          <CardDescription>
            Product analytics, funnels, session replay, and the same custom events mirrored from the public site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {posthogProjectUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a href={posthogProjectUrl} target="_blank" rel="noopener noreferrer">
                Open PostHog project
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          ) : (
            <div className="rounded-lg border border-dashed bg-muted/30 px-6 py-10 text-center">
              <p className="text-muted-foreground text-sm">
                Set <code className="text-xs">VITE_POSTHOG_PROJECT_URL</code> in the panel environment for a quick link
                to your PostHog project.
              </p>
            </div>
          )}

          <div className="rounded-lg border p-4 text-sm">
            <p className="font-medium">Manual setup (public site)</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>
                In PostHog, open <strong>Project settings → Project API key</strong> and copy the&nbsp;
                <code className="text-xs">phc_…</code> value.
              </li>
              <li>
                Add to <code className="text-xs">portfolio/.env</code>:&nbsp;
                <code className="text-xs">NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN</code> and&nbsp;
                <code className="text-xs">NEXT_PUBLIC_POSTHOG_HOST</code> (
                <code className="text-xs">https://us.i.posthog.com</code> or EU equivalent).
              </li>
              <li>Redeploy the public site. Page views and custom events flow automatically.</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {clarityUrl ? (
        <Button variant="outline" asChild>
          <a href={clarityUrl} target="_blank" rel="noopener noreferrer">
            Open Clarity project
            <ExternalLink className="size-3.5" />
          </a>
        </Button>
      ) : null}

      <p className="text-muted-foreground text-xs">
        Full setup guide: <code>docs/analytics-setup.md</code> in the monorepo.
      </p>
    </div>
  );
}
