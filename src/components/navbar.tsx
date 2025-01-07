import { Origami } from "lucide-react";

import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="sticky left-0 top-0 w-full py-5">
      <div className="flex h-14 w-full items-center justify-between rounded-lg border bg-black/10 pl-3.5 pr-2.5 backdrop-blur-sm">
        <Origami className="opacity-85 transition-all duration-200 hover:opacity-100" />
        <div className="flex items-center justify-center gap-10">
          <span className="opacity-85 transition-all duration-200 hover:opacity-100">
            Projects
          </span>
          <span className="opacity-85 transition-all duration-200 hover:opacity-100">
            Testimonials
          </span>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
