import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useApproval } from "@/hooks/useApproval";
import { UserButton } from "@clerk/react";
import { Bell, Menu } from "lucide-react";
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
        <Dialog>
          <DialogTrigger asChild>
            <Bell className="w-4 h-4 cursor-pointer" color="white" />
          </DialogTrigger>
          <DialogContent className="flex justify-start items-start flex-col gap-y-4 w-full h-75 overflow-y-auto px-4 lg:py-10 py-10">
            <div className="flex justify-start items-start flex-col gap-y-1 p-2 shadow rounded-xl border w-full">
              <h4 className="font-medium text-lg">Worker notification:</h4>
              <h6 className="text-xs text-neutral-500">
                Anasaya has been added to the system.
              </h6>
              <div className="flex justify-between items-center w-full mt-4">
                <p className="text-xs text-neutral-500">1:04 PM</p>
                <p className="text-xs text-neutral-500">2026-05-09</p>
              </div>
            </div>
            <div className="flex justify-start items-start flex-col gap-y-1 p-2 shadow rounded-xl border w-full">
              <h4 className="font-medium text-lg">Attendance notification:</h4>
              <h6 className="text-xs text-neutral-500">
                Asif Mistri logged-in at 9:17 AM
              </h6>
              <div className="flex justify-between items-center w-full mt-4">
                <p className="text-xs text-neutral-500">1:04 PM</p>
                <p className="text-xs text-neutral-500">2026-05-09</p>
              </div>
            </div>
            <div className="w-full">
              <Button className="w-full" variant="destructive">
                Delete All
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
