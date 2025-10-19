import { Building, Calendar, DollarSign, Edit, Loader2, MapPin, User } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CompanyProjects from "@/components/company/company-projects";
import CompanySheet from "@/components/company/company-sheet";
import { Badge } from "@/components/ui/badge";
import { useGetApiCompaniesByIdQuery } from "@/store/services/apis";

const CompanyDetails = () => {
  const { id } = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetApiCompaniesByIdQuery({ id: id as string });

  return (
    <>
      <CompanySheet open={open} setOpen={setOpen} company={data?.data} />
      <div className="flex w-full flex-col items-start justify-start gap-5 divide-y px-5 pb-5 xl:px-0">
        {isLoading ? (
          <div className="flex h-[calc(100vh-96px)] w-full items-center justify-center">
            <Loader2 className="size-10 animate-spin" />
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col items-start justify-start gap-5 pb-5">
              <div className="flex w-full items-center justify-center">
                <span className="flex-1 text-left font-bold text-xl">{data?.data.name}</span>
                <Badge variant="default" className="w-fit">
                  {data?.data.industry}
                </Badge>
              </div>
              <div className="grid w-full grid-cols-2 items-center justify-center gap-5 lg:grid-cols-5">
                <div className="col-span-1 flex w-full items-center gap-2 rounded-lg border p-2.5 hover:bg-white/5 hover:shadow-md">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted p-2">
                    <User className="size-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm md:hidden">
                      {(data?.data.ceo_name?.length ?? 0) > 5
                        ? `${data?.data.ceo_name?.slice(0, 5)}...`
                        : data?.data.ceo_name}
                    </span>
                    <span className="hidden font-medium text-sm md:block">{data?.data.ceo_name}</span>
                    <span className="text-muted-foreground text-xs">{data?.data.ceo_title}</span>
                  </div>
                </div>
                <div className="col-span-1 flex w-full items-center gap-2 rounded-lg border p-2.5 hover:bg-white/5 hover:shadow-md">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted p-2">
                    <MapPin className="size-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{data?.data.hq}</span>
                    <span className="text-muted-foreground text-xs">Headquarters</span>
                  </div>
                </div>
                <div className="col-span-1 flex w-full items-center gap-2 rounded-lg border p-2.5 hover:bg-white/5 hover:shadow-md">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted p-2">
                    <Calendar className="size-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{data?.data.founded}</span>
                    <span className="text-muted-foreground text-xs">Founded</span>
                  </div>
                </div>
                <div className="col-span-1 flex w-full items-center gap-2 rounded-lg border p-2.5 hover:bg-white/5 hover:shadow-md">
                  <div className="flex size-9 items-center justify-center rounded-full bg-muted p-2">
                    <DollarSign className="size-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{data?.data.revenue}</span>
                    <span className="text-muted-foreground text-xs">Revenue</span>
                  </div>
                </div>
                <div className="col-span-2 flex w-full items-center justify-center gap-2.5 md:col-span-2 lg:col-span-1">
                  <div className="flex flex-1 items-center gap-2 rounded-lg border p-2.5 hover:bg-white/5 hover:shadow-md">
                    <div className="flex size-9 items-center justify-center rounded-full bg-muted p-2">
                      <Building className="size-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{data?.data.size}</span>
                      <span className="text-muted-foreground text-xs">Size</span>
                    </div>
                  </div>
                  <div
                    onClick={() => setOpen(true)}
                    className="flex size-[58px] shrink-0 items-center justify-center rounded-lg border transition-all duration-200 hover:bg-muted"
                  >
                    <Edit className="size-5" />
                  </div>
                </div>
              </div>
            </div>
            <CompanyProjects />
          </>
        )}
      </div>
    </>
  );
};

export default CompanyDetails;
