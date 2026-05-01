import { syncUserToDBAPI } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();

  if (!user) {
    throw new Error("Unauthorized: No user found");
  }

  useEffect(() => {
    const syncClerkUser = async () => {
      try {
        await syncUserToDBAPI(
          user.id,
          user.fullName!,
          user.emailAddresses[0].emailAddress,
          user.imageUrl,
        );
        console.log(
          `${user.emailAddresses[0].emailAddress} has synced with the DB`,
        );
      } catch (error: any) {
        const message = error.response?.data?.error ?? error.message;
        console.log(message);
      }
    };

    syncClerkUser();
  }, [user]);
  return (
    <div className="flex justify-center items-center w-full flex-col gap-y-2">
      <h1>Dashboard</h1>
      <h1>Dashboard needs data of atleast 2 weeks to be rendered</h1>
      <h1>Showing redirect buttons instead below...</h1>

      <Link to={"/attendance"}>Attendance</Link>
      <Link to={"/workers"}>Workers</Link>
      <Link to={"/payslips"}>Pay slips</Link>

      <Button asChild>
        <SignOutButton>Logout</SignOutButton>
      </Button>
      {/* <div className="flex justify-center items-center w-full bg-black h-200">
        <Logo />
      </div> */}
    </div>
  );
};

export default Dashboard;
