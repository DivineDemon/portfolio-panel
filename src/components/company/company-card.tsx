import { Building, Calendar, DollarSign, MapPin, Trash, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useDeleteApiCompaniesByIdMutation } from "@/store/services/apis";
import { Badge } from "../ui/badge";
import { Button, buttonVariants } from "../ui/button";
import WarningModal from "../warning-modal";

interface CompanyCardProps {
  className?: string;
  company: {
    id: number;
    name: string;
    hq: string;
    founded: number;
    industry: string;
    revenue: string;
    size: string;
    ceo_name: string;
    ceo_title: string;
  };
}

const CompanyCard = ({ className, company }: CompanyCardProps) => {
  const [warn, setWarn] = useState<boolean>(false);
  const [deleteCompany, { isLoading }] = useDeleteApiCompaniesByIdMutation();

  const handleDelete = async () => {
    const response = await deleteCompany({ id: `${company.id}` });

    if (response.error) {
      toast.error("Failed to Delete Company!");
    } else {
      toast.success("Company Deleted Successfully!");
    }
  };

  return (
    <>
      <WarningModal
        open={warn}
        setOpen={setWarn}
        title="Delete Company"
        text="Are you sure you want to delete this company?"
        isLoading={isLoading}
        cta={handleDelete}
      />
      <div
        className={cn(
          "flex w-full flex-col items-start justify-start gap-2.5 rounded-lg border p-2.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/5 hover:shadow-md",
          className,
        )}
      >
        <div className="flex w-full items-center justify-between">
          <h3 className="flex-1 text-left font-bold text-foreground text-lg">{company.name}</h3>
          <Badge variant="default">{company.industry}</Badge>
        </div>
        <div className="flex w-full flex-col gap-2">
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="size-4" />
            <span>{company.hq}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="size-4" />
            <span>Founded {company.founded}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Building className="size-4" />
            <span>{company.size}</span>
          </div>
          {company.revenue !== "N/A" && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <DollarSign className="size-4" />
              <span>{company.revenue}</span>
            </div>
          )}
        </div>
        <div className="mt-auto flex w-full items-center justify-center gap-2.5 border-t pt-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-full bg-muted p-2">
              <User className="size-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{company.ceo_name}</span>
              <span className="text-muted-foreground text-xs">{company.ceo_title}</span>
            </div>
          </div>
          <Link to={`/companies/${company.id}`} className={cn(buttonVariants({ variant: "default", size: "default" }))}>
            View
          </Link>
          <Button type="button" variant="destructive" size="icon" onClick={() => setWarn(true)}>
            <Trash />
          </Button>
        </div>
      </div>
    </>
  );
};

export default CompanyCard;
