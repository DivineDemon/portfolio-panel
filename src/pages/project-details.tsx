import { Edit, Loader2, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import CaseStudySheet from "@/components/case-study/case-study-sheet";
import ProjectSheet from "@/components/project/project-sheet";
import { Button } from "@/components/ui/button";
import WarningModal from "@/components/warning-modal";
import {
  useDeleteApiCaseStudiesByIdMutation,
  useGetApiCaseStudiesProjectByProjectIdQuery,
  useGetApiCompaniesByIdQuery,
  useGetApiProjectsByIdQuery,
} from "@/store/services/apis";

const ProjectDetails = () => {
  const { id } = useParams();
  const [warn, setWarn] = useState<boolean>(false);
  const [editProject, setEditProject] = useState<boolean>(false);
  const { data: project } = useGetApiProjectsByIdQuery({ id: id as string });
  const {
    data: caseStudyData,
    error: caseStudyError,
    isLoading: caseStudyLoading,
  } = useGetApiCaseStudiesProjectByProjectIdQuery({ projectId: id as string });
  const [caseStudySheetOpen, setCaseStudySheetOpen] = useState<boolean>(false);
  const [deleteCaseStudy, { isLoading: deletingCaseStudy }] = useDeleteApiCaseStudiesByIdMutation();

  const { data: companyData } = useGetApiCompaniesByIdQuery(
    {
      id: `${project?.data.company_id}`,
    },
    {
      skip: !project?.data.company_id,
      refetchOnMountOrArgChange: true,
    },
  );

  const handleDeleteCaseStudy = async () => {
    const response = await deleteCaseStudy({ id: `${caseStudyData?.data.id}` });

    if (response.error) {
      toast.error("Failed to Delete Case Study!");
    } else {
      toast.success("Case Study Deleted Successfully!");
    }
  };

  return (
    <>
      <WarningModal
        open={warn}
        setOpen={setWarn}
        title="Delete Case Study"
        text="Are you sure you want to delete this case study?"
        cta={handleDeleteCaseStudy}
        isLoading={deletingCaseStudy}
      />
      <CaseStudySheet
        open={caseStudySheetOpen}
        caseStudy={caseStudyData?.data && !caseStudyError ? caseStudyData?.data : undefined}
        setOpen={setCaseStudySheetOpen}
      />
      <ProjectSheet open={editProject} project={project?.data} setOpen={setEditProject} />
      <div className="relative z-10 flex h-[calc(100vh-116px)] w-full flex-col items-start justify-start gap-5 overflow-y-auto p-0 px-5 pb-5 md:gap-10 xl:px-0">
        <div className="flex w-full items-center justify-end gap-2.5">
          {caseStudyData?.data && !caseStudyError ? (
            <>
              <Button type="button" variant="default" onClick={() => setCaseStudySheetOpen(true)}>
                <Edit />
              </Button>
              <Button type="button" variant="destructive" onClick={() => setWarn(true)}>
                <Trash />
              </Button>
            </>
          ) : (
            <Button type="button" variant="default" onClick={() => setCaseStudySheetOpen(true)}>
              <Plus />
            </Button>
          )}
          <Button type="button" variant="default" onClick={() => setEditProject(true)}>
            <Edit /> Project
          </Button>
        </div>
        {caseStudyLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : (
          <>
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-2.5 md:gap-5">
              <p className="w-full text-left font-semibold uppercase tracking-widest">{project?.data.company_name}</p>
              <h2 className="w-full text-left font-serif text-3xl md:text-5xl">{caseStudyData?.data.title}</h2>
              <p className="w-full text-left md:text-lg lg:text-xl">{caseStudyData?.data.description}</p>
            </div>
            <img
              src={JSON.parse(caseStudyData?.data.images ?? "[]")[0]}
              alt="header"
              className="w-full rounded-3xl shadow"
            />
            <div className="mx-auto grid grid-cols-1 items-start justify-start gap-5 md:grid-cols-3 md:gap-10">
              <div className="col-span-1 hidden w-full flex-col items-start justify-start gap-5 md:flex">
                <div className="flex w-full flex-col items-center justify-center gap-2.5">
                  <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Headquarters</span>
                  <span className="w-full text-left font-light text-[20px] leading-[20px]">{companyData?.data.hq}</span>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2.5">
                  <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Founded</span>
                  <span className="w-full text-left font-light text-[20px] leading-[20px]">
                    {companyData?.data.founded}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2.5">
                  <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Industry</span>
                  <span className="w-full text-left font-light text-[20px] leading-[20px]">
                    {companyData?.data.industry}
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2.5">
                  <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Revenue</span>
                  <span className="w-full text-left font-light text-[20px] leading-[20px]">
                    ${companyData?.data.revenue} billion ({companyData?.data.founded})
                  </span>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2.5">
                  <span className="w-full text-left font-semibold text-[18px] leading-[18px]">Company Size</span>
                  <span className="w-full text-left font-light text-[20px] leading-[20px]">
                    {companyData?.data.size}
                  </span>
                </div>
              </div>
              <div className="col-span-1 flex w-full flex-col items-start justify-start gap-5 md:col-span-2">
                <div className="flex w-full flex-col items-center justify-center gap-2.5">
                  <h2 className="w-full text-left font-serif text-xl md:text-4xl">Challenge</h2>
                  <p className="w-full text-left md:text-lg lg:text-xl">{caseStudyData?.data.challenge}</p>
                </div>
                <div className="flex w-full flex-col items-center justify-center gap-2.5">
                  <h2 className="w-full text-left font-serif text-xl md:text-4xl">Results</h2>
                  <p className="w-full text-left md:text-lg lg:text-xl">{caseStudyData?.data.results}</p>
                </div>
              </div>
              <div className="col-span-1 grid grid-cols-3 items-center justify-center gap-2.5 md:col-span-3">
                <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
                  <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">
                    {caseStudyData?.data.onboarding_improved}
                  </span>
                  <span className="w-full text-left font-light text-[12px] leading-[12px]">
                    Improved Onboarding Process.
                  </span>
                </div>
                <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
                  <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">
                    {caseStudyData?.data.retention_increase}
                  </span>
                  <span className="w-full text-left font-light text-[12px] leading-[12px]">
                    Increase in User Retention.
                  </span>
                </div>
                <div className="col-span-1 flex w-full flex-col items-center justify-center gap-2.5">
                  <span className="w-full text-left font-medium font-serif text-[38px] leading-[38px]">
                    {caseStudyData?.data.time_spent_increase}
                  </span>
                  <span className="w-full text-left font-light text-[12px] leading-[12px]">
                    Increase in time spent on website.
                  </span>
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2.5 md:gap-5">
              <img
                src={JSON.parse(caseStudyData?.data.images ?? "[]")[1]}
                alt="image 1"
                className="aspect-square w-full rounded-3xl object-cover object-left-top shadow"
              />
              <img
                src={JSON.parse(caseStudyData?.data.images ?? "[]")[2]}
                alt="image 2"
                className="aspect-square w-full rounded-3xl object-cover object-left-top shadow"
              />
            </div>
            <div className="mx-auto flex w-full flex-col items-start justify-start">
              <h2 className="w-full text-left font-serif text-xl md:text-4xl">Process</h2>
              <p className="mt-2.5 w-full text-left md:mt-5 md:text-lg lg:text-xl">
                <strong>Research & Analysis:</strong> {caseStudyData?.data.research}
              </p>
              <p className="mt-5 w-full text-left md:mt-10 md:text-lg lg:text-xl">
                <strong>Information Architecture:</strong> {caseStudyData?.data.architecture}
              </p>
              <p className="mt-5 w-full text-left md:mt-10 md:text-lg lg:text-xl">
                <strong>Wireframing & Prototyping:</strong> {caseStudyData?.data.wireframing}
              </p>
              <p className="mt-5 w-full text-left md:mt-10 md:text-lg lg:text-xl">
                <strong>Usability Testing:</strong> {caseStudyData?.data.testing}
              </p>
              <p className="mt-5 w-full text-left md:mt-10 md:text-lg lg:text-xl">
                <strong>Visual Design & Style Guide:</strong> {caseStudyData?.data.design}
              </p>
            </div>
            <div className="mx-auto flex w-full flex-col items-start justify-start">
              <h2 className="mb-5 w-full text-left font-serif text-xl md:text-4xl">Stack</h2>
              <div className="flex w-full items-center justify-around rounded-lg bg-black/50 p-5 dark:bg-white/5">
                {JSON.parse(caseStudyData?.data.tech_stack_urls ?? "[]").map((tech: string, idx: number) => (
                  <img key={idx} src={tech} alt={tech} className="aspect-square w-12" />
                ))}
              </div>
            </div>
            <img
              src={JSON.parse(caseStudyData?.data.images ?? "[]")[3]}
              alt="image 3"
              className="w-full rounded-3xl shadow"
            />
            <div className="mx-auto flex w-full flex-col items-start justify-start gap-5">
              <p className="w-full text-left font-[450] text-[18px] leading-[24px] lg:text-[24px] lg:leading-[30px]">
                "{caseStudyData?.data.ceo_statement}"
              </p>
              <div className="flex w-full items-center justify-center gap-5">
                <img
                  src="https://ui.shadcn.com/avatars/01.png"
                  alt="User"
                  width={40}
                  height={40}
                  className="size-13 rounded-full"
                />
                <div className="flex flex-1 flex-col items-center justify-center gap-3">
                  <span className="w-full font-light text-[18px] leading-[18px]">{companyData?.data.ceo_name}</span>
                  <span className="w-full font-light text-[18px] leading-[18px]">
                    {companyData?.data.ceo_title} | {project?.data.company_name}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid w-full grid-cols-2 gap-2.5 md:gap-5">
              <img
                src={JSON.parse(caseStudyData?.data.images ?? "[]")[4]}
                alt="image 4"
                className="aspect-square w-full rounded-3xl object-cover object-left-top shadow"
              />
              <img
                src={JSON.parse(caseStudyData?.data.images ?? "[]")[5]}
                alt="image 5"
                className="aspect-square w-full rounded-3xl object-cover object-left-top shadow"
              />
            </div>
            <div className="mx-auto mb-5 flex w-full flex-col items-start justify-start gap-2.5 md:mb-0 md:gap-5 lg:mb-5">
              <h2 className="w-full text-left font-serif text-xl md:text-4xl">Conclusion</h2>
              <p className="w-full text-left md:text-lg lg:text-xl">{caseStudyData?.data.conclusion}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProjectDetails;
