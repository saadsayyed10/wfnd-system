import { UserButton } from "@clerk/react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full lg:px-12 bg-black text-white absolute top-0 flex-row">
      {/* <h1 className="lg:text-4xl font-bold">WFND</h1> */}
      <img src="./logo.png" width={110} height={80} />
      <div className="lg:flex hidden justify-center items-center w-full gap-x-12 font-medium text-sm tracking-normal">
        <Link to={"/"}>Home</Link>
        <Link to={"/attendance"}>Attendance</Link>
        <Link to={"/workers"}>Workers</Link>
        <Link to={"/payslips"}>Pay slips</Link>
      </div>
      <UserButton />
    </div>
  );
};

export default Navbar;
