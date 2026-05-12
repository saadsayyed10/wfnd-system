import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/react";
import {
  CalendarDays,
  LayoutDashboard,
  ReceiptIndianRupee,
  Users2,
} from "lucide-react";
import { Link } from "react-router-dom";

const MobileNavbar = () => {
  const { user } = useUser();

  return (
    <div className="flex justify-start items-start fixed z-50 bottom-0 lg:hidden bg-transparent w-full h-20 p-2 gap-x-2">
      <div className="flex justify-start items-start gap-x-4 w-[75%] bg-white border shadow-lg px-2 py-1.5 rounded-full">
        <Button size="lg" variant="ghost">
          <Link to={"/"}>
            <LayoutDashboard width={4} height={4} />
          </Link>
        </Button>
        <Button size="lg" variant="ghost">
          <Link to={"/workers"}>
            <Users2 width={4} height={4} />
          </Link>
        </Button>
        <Button size="lg" variant="ghost">
          <Link to={"/attendance"}>
            <CalendarDays width={4} height={4} />
          </Link>
        </Button>
        <Button size="lg" variant="ghost">
          <Link to={"/payslips"}>
            <ReceiptIndianRupee width={4} height={4} />
          </Link>
        </Button>
      </div>
      <div className="flex justify-center items-center w-[25%]">
        <img
          src={user?.imageUrl!}
          className="w-12 h-12 bg-white shadow-lg rounded-full border"
        />
      </div>
    </div>
  );
};

export default MobileNavbar;
