import { Outlet } from "react-router-dom";
import MaxWidthWrapper from "../ui/max-width-wrapper";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <MaxWidthWrapper className="mx-auto flex h-[100dvh] w-full flex-col items-center justify-center gap-5 overflow-hidden p-5">
      <Navbar />
      <div className="h-[calc(100dvh-124px)] w-full overflow-hidden">
        <Outlet />
      </div>
    </MaxWidthWrapper>
  );
};

export default Layout;
