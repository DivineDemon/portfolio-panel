import { Link } from "react-router-dom";
import Logo from "@/assets/img/logo.svg";
import { navItems } from "@/lib/constants";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";

const Navbar = () => {
  return (
    <nav className="flex h-16 w-full items-center justify-between rounded-lg border p-3.5 shadow backdrop-blur-md">
      <img src={Logo} alt="Logo" className="h-full w-auto" />
      <div className="flex items-center justify-center gap-5">
        {navItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="text-muted-foreground text-sm transition-all duration-300 hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <AnimatedThemeToggler variant="outline" size="icon-sm" />
    </nav>
  );
};

export default Navbar;
