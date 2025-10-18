import { Building, Calendar, DollarSign, MapPin, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

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
  return (
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
      <div className="flex w-full items-center gap-2 border-t pt-3">
        <div className="flex size-9 items-center justify-center rounded-full bg-muted p-2">
          <User className="size-full" />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-sm">{company.ceo_name}</span>
          <span className="text-muted-foreground text-xs">{company.ceo_title}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
