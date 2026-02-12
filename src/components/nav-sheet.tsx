import { Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme-provider";
import { Sheet, SheetContent } from "./ui/sheet";
import { Switch } from "./ui/switch";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/testimonials", label: "Testimonials" },
];

interface NavSheetProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const NavSheet = ({ open, setOpen }: NavSheetProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="gap-0 p-0">
        <div className="flex w-full flex-col items-start justify-start gap-5 px-5 pt-13 pb-5 text-[14px] leading-[14px]">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="capitalize opacity-85 transition-all duration-200 hover:opacity-100"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex w-full items-center justify-center">
            <span className="flex-1 text-left text-[14px] leading-[14px]">Dark Mode</span>
            <Switch checked={theme === "dark"} onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavSheet;
