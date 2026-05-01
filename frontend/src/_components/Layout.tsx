import Navbar from "@/_components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="lg:pt-32 pt-32">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
