import { Outlet } from "react-router-dom";

import MaxWidthWrapper from "./max-width-wrapper";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <MaxWidthWrapper>
      <Navbar />
      <div className="flex w-full items-start justify-start">
        <Outlet />
      </div>
    </MaxWidthWrapper>
  );
};

export default Layout;
