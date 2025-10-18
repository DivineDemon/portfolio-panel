import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import CaseStudyCard from "@/components/case-study/case-study-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useGetApiCaseStudiesQuery } from "@/store/services/apis";

const CaseStudies = () => {
  const [query, setQuery] = useState<string>("");
  const { data, isLoading } = useGetApiCaseStudiesQuery();

  return (
    <div className="flex w-full flex-col items-start justify-start gap-5 px-5 pb-5 xl:px-0">
      <div className="flex w-full flex-col items-center justify-center gap-2.5 md:flex-row md:gap-0">
        <span className="w-full text-left font-bold text-xl md:w-auto md:flex-1">Case Studies List</span>
        <div className="flex w-full items-center justify-center gap-2.5 md:w-auto">
          <Button type="button" variant="outline">
            <Plus /> <span className="hidden md:flex">Add Case Study</span>
          </Button>
          <Input
            type="text"
            value={query}
            className="h-[36.5px] w-full md:w-64"
            placeholder="Search Case Studies by Name"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div
        className={cn("grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3", {
          "h-[calc(100vh-175px)]": isLoading,
        })}
      >
        {isLoading ? (
          <div className="col-span-1 flex h-full w-full items-center justify-center md:col-span-2 xl:col-span-3">
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : query ? (
          data?.data
            ?.filter((caseStudy) => caseStudy.title.toLowerCase().includes(query.toLowerCase()))
            .map((caseStudy) => <CaseStudyCard key={caseStudy.id} className="col-span-1" caseStudy={caseStudy} />)
        ) : (
          data?.data?.map((caseStudy) => (
            <CaseStudyCard key={caseStudy.id} className="col-span-1" caseStudy={caseStudy} />
          ))
        )}
      </div>
    </div>
  );
};

export default CaseStudies;
