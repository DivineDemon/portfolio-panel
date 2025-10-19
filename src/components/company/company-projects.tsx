import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "@/components/project/project-card";
import ProjectSheet from "@/components/project/project-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetApiProjectsCompanyByCompanyIdQuery } from "@/store/services/apis";

const CompanyProjects = () => {
  const { id } = useParams();
  const [query, setQuery] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetApiProjectsCompanyByCompanyIdQuery({ companyId: id as string });

  return (
    <>
      <ProjectSheet open={open} setOpen={setOpen} />
      <div className="flex w-full flex-col items-start justify-start gap-5">
        <div className="flex w-full flex-col items-center justify-center gap-2.5 md:flex-row md:gap-0">
          <span className="w-full text-left font-bold text-xl md:w-auto md:flex-1">Projects List</span>
          <div className="flex w-full items-center justify-center gap-2.5 md:w-auto">
            <Button onClick={() => setOpen(true)} type="button" variant="outline">
              <Plus /> <span className="hidden md:flex">Add Project</span>
            </Button>
            <Input
              type="text"
              value={query}
              className="h-[36.5px] w-full md:w-64"
              placeholder="Search Projects by Name"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="grid h-fit max-h-[calc(100vh-514px)] w-full grid-cols-1 gap-6 overflow-y-auto md:max-h-[calc(100vh-476px)] md:grid-cols-2 lg:max-h-[calc(100vh-319px)] xl:grid-cols-3">
          {isLoading ? (
            <div className="col-span-1 flex h-full w-full items-center justify-center md:col-span-2 xl:col-span-3">
              <Loader2 className="size-10 animate-spin" />
            </div>
          ) : query ? (
            data?.data
              ?.filter((project) => project.project_name.toLowerCase().includes(query.toLowerCase()))
              .map((project) => <ProjectCard key={project.id} className="col-span-1" project={project} />)
          ) : (
            data?.data?.map((project) => <ProjectCard key={project.id} className="col-span-1" project={project} />)
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyProjects;
