import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="h-screen w-full overflow-hidden">
      <Outlet />
    </div>
  );
};

export default Layout;
