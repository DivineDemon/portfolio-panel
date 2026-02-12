import { AlignRight, Origami } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import NavSheet from "./nav-sheet";
import { Button } from "./ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/testimonials", label: "Testimonials" },
];

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <NavSheet open={open} setOpen={setOpen} />
      <nav className="sticky top-0 left-0 z-[1] w-full px-5 py-5 xl:px-0">
        <div className="hidden h-14 w-full items-center justify-between rounded-lg border bg-black/10 pr-2.5 pl-3.5 backdrop-blur-sm md:flex">
          <Link to="/">
            <Origami className="opacity-85 transition-all duration-200 hover:opacity-100" />
          </Link>
          <div className="flex items-center justify-center gap-10 text-sm md:text-base">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="capitalize opacity-85 transition-all duration-200 hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <ModeToggle />
        </div>
        <div className="flex h-14 w-full items-center justify-between rounded-lg border bg-black/10 pr-2.5 pl-3.5 backdrop-blur-sm md:hidden">
          <Link to="/">
            <Origami className="opacity-85 transition-all duration-200 hover:opacity-100" />
          </Link>
          <Button type="button" variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <AlignRight />
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
