import { ArrowUpRight, BarChart3, Building2, CheckCircle2, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ANALYTICS_EVENT_CATALOG, ENGAGEMENT_KEY_EVENTS, PRIMARY_KEY_EVENTS } from "@/lib/analytics-events";

const ga4PropertyUrl = import.meta.env.VITE_GA4_PROPERTY_URL as string | undefined;
const lookerStudioEmbedUrl = import.meta.env.VITE_LOOKER_STUDIO_EMBED_URL as string | undefined;
const gscUrl = import.meta.env.VITE_GSC_PROPERTY_URL as string | undefined;
const clarityUrl = import.meta.env.VITE_CLARITY_PROJECT_URL as string | undefined;

const B2B_EVALUATION = [
  {
    provider: "RB2B",
    recommendation: "Recommended",
    cost: "~$99–199/mo",
    pros: "LinkedIn-matched company IDs, Slack alerts, low setup friction for solo consultants.",
    cons: "US-centric IP database; limited EU coverage.",
    verdict: "Best fit for reverse outreach on case-study viewers.",
  },
  {
    provider: "Clearbit Reveal",
    recommendation: "Enterprise",
    cost: "Custom pricing",
    pros: "High-accuracy firmographics, integrates with HubSpot and Salesforce.",
    cons: "Expensive for a solo portfolio; overkill without a CRM pipeline.",
    verdict: "Choose when you already run a sales CRM.",
  },
  {
    provider: "Koala",
    recommendation: "Alternative",
    cost: "~$50–150/mo",
    pros: "Intent scoring, account-level page views, startup-friendly pricing.",
    cons: "Smaller identification database than Clearbit.",
    verdict: "Good middle ground if RB2B coverage is thin.",
  },
  {
    provider: "PostHog",
    recommendation: "Build your own",
    cost: "Free tier available",
    pros: "Self-hosted option, session replay, custom events, no vendor lock-in.",
    cons: "No native company identification — requires plugin or manual IP enrichment.",
    verdict: "Use for product analytics, not company deanonymization.",
  },
] as const;

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
            GA4 key events, Looker Studio dashboard, and B2B visitor identification.
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
              <p className="text-muted-foreground text-xs">Form, magnet, booking</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-medium text-sm">Engagement events</p>
              <p className="mt-1 font-semibold text-2xl tabular-nums">{ENGAGEMENT_KEY_EVENTS.length}</p>
              <p className="text-muted-foreground text-xs">CTAs and case studies</p>
            </div>
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="font-medium text-sm">Total tracked</p>
              <p className="mt-1 font-semibold text-2xl tabular-nums">{ANALYTICS_EVENT_CATALOG.length}</p>
              <p className="text-muted-foreground text-xs">Custom GA4 events</p>
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
                Toggle <strong>Mark as key event</strong> for each event in the table above (start with the three
                primary conversions).
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
            <BarChart3 className="size-5" />
            Looker Studio dashboard
          </CardTitle>
          <CardDescription>
            Connect GA4 and Google Search Console for traffic, conversions, and landing-page performance in one view.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {lookerStudioEmbedUrl ? (
            <div className="overflow-hidden rounded-xl border">
              <iframe
                title="Looker Studio analytics dashboard"
                src={lookerStudioEmbedUrl}
                className="h-[600px] w-full"
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              />
            </div>
          ) : (
            <div className="rounded-lg border border-dashed bg-muted/30 px-6 py-10 text-center">
              <p className="text-muted-foreground text-sm">
                Set <code className="text-xs">VITE_LOOKER_STUDIO_EMBED_URL</code> in the panel environment to embed your
                report here.
              </p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border p-4 text-sm">
              <p className="font-medium">Recommended panels</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                <li>Total users and new users (28-day trend)</li>
                <li>Key event rate by event name</li>
                <li>Top landing pages (GA4 + GSC blended)</li>
                <li>Channel performance (organic, direct, referral)</li>
                <li>Case study views by slug</li>
              </ul>
            </div>
            <div className="rounded-lg border p-4 text-sm">
              <p className="font-medium">Setup steps</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
                <li>
                  Create a report at{" "}
                  <a
                    href="https://lookerstudio.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline underline-offset-4"
                  >
                    lookerstudio.google.com
                  </a>
                  .
                </li>
                <li>Add GA4 and Search Console as data sources.</li>
                <li>File → Embed report → copy the embed URL.</li>
                <li>
                  Set <code className="text-xs">VITE_LOOKER_STUDIO_EMBED_URL</code> and redeploy the panel.
                </li>
              </ol>
            </div>
          </div>

          <Button variant="outline" size="sm" asChild>
            <a href="https://lookerstudio.google.com/gallery" target="_blank" rel="noopener noreferrer">
              Browse Looker Studio templates
              <ArrowUpRight className="size-3.5" />
            </a>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="size-5" />
            B2B visitor identification
          </CardTitle>
          <CardDescription>
            Evaluation of reverse-IP tools for company-level outreach. Deployment is opt-in via environment variables on
            the public site.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b bg-muted/40">
                <tr>
                  <th className="px-4 py-3 font-medium">Provider</th>
                  <th className="px-4 py-3 font-medium">Fit</th>
                  <th className="px-4 py-3 font-medium">Cost</th>
                  <th className="px-4 py-3 font-medium">Verdict</th>
                </tr>
              </thead>
              <tbody>
                {B2B_EVALUATION.map((row) => (
                  <tr key={row.provider} className="border-b last:border-b-0">
                    <td className="px-4 py-3 align-top font-medium">{row.provider}</td>
                    <td className="px-4 py-3 align-top">
                      <Badge variant={row.recommendation === "Recommended" ? "default" : "outline"}>
                        {row.recommendation}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 align-top text-muted-foreground">{row.cost}</td>
                    <td className="px-4 py-3 align-top text-muted-foreground text-xs">{row.verdict}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rounded-lg border border-dashed bg-muted/20 p-4 text-sm">
            <p className="font-medium">Deploy RB2B (recommended)</p>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>Sign up at rb2b.com and copy your script URL from the dashboard.</li>
              <li>
                On the public site, set <code className="text-xs">NEXT_PUBLIC_B2B_VISITOR_PIXEL_ENABLED=true</code>,{" "}
                <code className="text-xs">NEXT_PUBLIC_B2B_VISITOR_SCRIPT_URL</code>, and{" "}
                <code className="text-xs">NEXT_PUBLIC_B2B_VISITOR_PROVIDER=RB2B</code>.
              </li>
              <li>
                The privacy notice and <code className="text-xs">/privacy</code> page update automatically when the
                pixel is enabled.
              </li>
              <li>Pair with Microsoft Clarity (already supported) for heatmaps on identified company sessions.</li>
            </ol>
          </div>

          {clarityUrl ? (
            <Button variant="outline" size="sm" asChild>
              <a href={clarityUrl} target="_blank" rel="noopener noreferrer">
                Open Clarity project
                <ExternalLink className="size-3.5" />
              </a>
            </Button>
          ) : null}
        </CardContent>
      </Card>

      <p className="text-muted-foreground text-xs">
        Full setup guide: <code>docs/analytics-setup.md</code> and <code>docs/b2b-visitor-identification.md</code> in
        the monorepo.
      </p>
    </div>
  );
}
