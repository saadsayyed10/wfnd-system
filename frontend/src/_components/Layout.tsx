import Navbar from "@/_components/Navbar";
import { Outlet } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <MobileNavbar />
      <div className="lg:pt-32 lg:pb-0 pb-52 bg-neutral-50">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
