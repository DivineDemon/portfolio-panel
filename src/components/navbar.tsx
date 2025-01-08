import { Origami } from "lucide-react";
import { Link } from "react-router-dom";

import { ModeToggle } from "./mode-toggle";

const Navbar = () => {
  return (
    <nav className="sticky left-0 top-0 z-[1] w-full px-5 py-5 xl:px-0">
      <div className="flex h-14 w-full items-center justify-between rounded-lg border bg-black/10 pl-3.5 pr-2.5 backdrop-blur-sm">
        <Link to="/">
          <Origami className="opacity-85 transition-all duration-200 hover:opacity-100" />
        </Link>
        <div className="flex items-center justify-center gap-10 text-sm md:text-base">
          <Link
            to="/projects"
            className="opacity-85 transition-all duration-200 hover:opacity-100"
          >
            Projects
          </Link>
          <Link
            to="/testimonials"
            className="opacity-85 transition-all duration-200 hover:opacity-100"
          >
            Testimonials
          </Link>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
