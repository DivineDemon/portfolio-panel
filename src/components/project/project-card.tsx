import { Edit, Eye } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

interface ProjectCardProps {
  className?: string;
}

const ProjectCard = ({ className }: ProjectCardProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-2.5 rounded-lg border p-2.5 backdrop-blur-sm transition-all duration-200 hover:bg-white/5 hover:shadow-md",
        className
      )}
    >
      <div className="flex w-full items-center justify-center border-b pb-2.5">
        <span className="w-full text-left text-lg font-semibold">
          Company Website
        </span>
        <span className="w-full text-right text-sm text-gray-500">
          &#8226;&nbsp;2023&nbsp;&#8226;
        </span>
      </div>
      <ul className="flex w-full list-inside list-disc flex-col items-center justify-center gap-1.5 border-b pb-2.5">
        {[
          "Achieved a 51.7% increase in website traffic and impressions.",
          "Achieved a 23.3% increase in quality of organic real-estate leads.",
          "Achieved 16% growth for Company Revenue.",
        ].map((item, idx) => (
          <li
            key={idx}
            className="w-full overflow-hidden truncate text-left text-sm text-gray-500"
          >
            {item}
          </li>
        ))}
      </ul>
      <div className="flex w-full items-center justify-center border-b pb-2.5">
        <span className="flex-1 text-left text-sm">F&C Properties</span>
        <span className="flex-1 text-left text-sm text-gray-500">
          https://fandcproperties.ae/
        </span>
      </div>
      <div className="flex w-full items-center justify-between">
        <Button variant="default" size="icon">
          <Eye />
        </Button>
        <Button variant="outline" size="icon">
          <Edit className="size-[1.2rem]" />
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
