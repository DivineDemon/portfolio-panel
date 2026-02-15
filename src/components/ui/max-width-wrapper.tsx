import { cn } from "@/lib/utils";

interface MaxWidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWrapper = ({ children, className }: MaxWidthWrapperProps) => {
  return <div className={cn("w-full max-w-3xl p-5", className)}>{children}</div>;
};

export default MaxWidthWrapper;
