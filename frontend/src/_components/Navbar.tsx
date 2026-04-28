import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full lg:px-12 lg:py-4 bg-black text-white absolute top-0 flex-row">
      <h1 className="lg:text-4xl font-bold">WFND</h1>
      <div className="lg:flex hidden justify-center items-center w-full gap-x-12">
        <Link to={"/"}>Home</Link>
        <Link to={"/attendance"}>Attendance</Link>
        <Link to={"/workers"}>Workers</Link>
        <Link to={"/"}>Pay slips</Link>
      </div>
      <div className="w-14 h-12 bg-white rounded-full" />
    </div>
  );
};

export default Navbar;
