import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useApproval } from "@/hooks/useApproval";
import { UserButton } from "@clerk/react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { approval } = useApproval();

  return approval ? (
    <div className="flex justify-between items-center w-full lg:px-12 px-6 bg-black text-white absolute top-0 flex-row">
      {/* <h1 className="lg:text-4xl font-bold">WFND</h1> */}
      <img src="./logo.png" width={110} height={80} />
      <div className="lg:flex hidden justify-center items-center w-full gap-x-12 font-medium text-sm tracking-normal">
        <Link to={"/"}>Dashboard</Link>
        <Link to={"/attendance"}>Attendance</Link>
        <Link to={"/workers"}>Workers</Link>
        <Link to={"/payslips"}>Pay slips</Link>
      </div>
      <div className="flex justify-end items-center w-full flex-row gap-x-4">
        <UserButton />
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="w-4 h-4 block lg:hidden" color="white" />
          </SheetTrigger>
          <SheetContent className="bg-black">
            <SheetHeader>
              <SheetTitle className="text-white text-2xl mt-4 font-semibold">
                WFND Menu
              </SheetTitle>
            </SheetHeader>
            <ul className="flex justify-start items-start w-full flex-col gap-y-4 text-lg text-white p-4">
              <li>
                <Link to={"/"}>1. Dashboard</Link>
              </li>
              <li>
                <Link to={"/attendance"}>2. Attendance</Link>
              </li>
              <li>
                <Link to={"/workers"}>3. Workers</Link>
              </li>
              <li>
                <Link to={"/payslips"}>4. Pay slips</Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  ) : (
    <div />
  );
};

export default Navbar;
