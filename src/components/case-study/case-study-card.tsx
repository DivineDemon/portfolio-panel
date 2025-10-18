import { Code, Palette, Search, Target, TestTube, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

interface CaseStudyCardProps {
  className?: string;
  caseStudy: {
    id: number;
    project_id: number;
    title: string;
    description: string;
    challenge: string;
    results: string;
    onboarding_improved: string;
    retention_increase: string;
    time_spent_increase: string;
    research: string;
    architecture: string;
    wireframing: string;
    testing: string;
    design: string;
    tech_stack_urls: string;
    ceo_statement: string;
    conclusion: string;
  };
}

const CaseStudyCard = ({ className, caseStudy }: CaseStudyCardProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-start justify-start gap-2.5 rounded-lg border p-2.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/5 hover:shadow-md",
        className,
      )}
    >
      <div className="flex w-full flex-col gap-2">
        <h3 className="line-clamp-2 font-bold text-foreground text-lg">{caseStudy.title}</h3>
        <p className="line-clamp-3 text-muted-foreground text-sm">{caseStudy.description}</p>
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-orange-500" />
            <span className="font-medium text-sm">Challenge</span>
          </div>
          <p className="line-clamp-2 text-muted-foreground text-xs">{caseStudy.challenge}</p>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-green-500" />
            <span className="font-medium text-sm">Results</span>
          </div>
          <p className="line-clamp-2 text-muted-foreground text-xs">{caseStudy.results}</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="font-medium text-sm">Key Metrics</span>
        <div className="flex flex-wrap gap-2">
          {caseStudy.onboarding_improved && (
            <span className="rounded-full bg-blue-100 px-2 py-1 text-blue-800 text-xs dark:bg-blue-900 dark:text-blue-200">
              Onboarding: {caseStudy.onboarding_improved}
            </span>
          )}
          {caseStudy.retention_increase && (
            <span className="rounded-full bg-green-100 px-2 py-1 text-green-800 text-xs dark:bg-green-900 dark:text-green-200">
              Retention: {caseStudy.retention_increase}
            </span>
          )}
          {caseStudy.time_spent_increase && (
            <span className="rounded-full bg-purple-100 px-2 py-1 text-purple-800 text-xs dark:bg-purple-900 dark:text-purple-200">
              Time: {caseStudy.time_spent_increase}
            </span>
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <span className="font-medium text-sm">Process</span>
        <div className="flex flex-wrap gap-1">
          {caseStudy.research && (
            <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
              <Search className="size-3" />
              Research
            </div>
          )}
          {caseStudy.architecture && (
            <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
              <Code className="size-3" />
              Architecture
            </div>
          )}
          {caseStudy.wireframing && (
            <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
              <Target className="size-3" />
              Wireframing
            </div>
          )}
          {caseStudy.design && (
            <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
              <Palette className="size-3" />
              Design
            </div>
          )}
          {caseStudy.testing && (
            <div className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs dark:bg-gray-800">
              <TestTube className="size-3" />
              Testing
            </div>
          )}
        </div>
      </div>
      {caseStudy.ceo_statement && (
        <div className="flex w-full flex-col gap-2 border-t pt-3">
          <span className="font-medium text-sm">CEO Statement</span>
          <p className="line-clamp-2 text-muted-foreground text-xs italic">"{caseStudy.ceo_statement}"</p>
        </div>
      )}
      <div className="flex w-full items-center justify-between">
        <span className="text-muted-foreground text-xs">Project ID: {caseStudy.project_id}</span>
        {caseStudy.tech_stack_urls && (
          <span className="rounded bg-primary/10 px-2 py-1 text-primary text-xs">Tech Stack Available</span>
        )}
      </div>
    </div>
  );
};

export default CaseStudyCard;
