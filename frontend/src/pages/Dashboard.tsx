import { fetchProfileAPI, syncUserToDBAPI } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { useApproval } from "@/hooks/useApproval";
import { getToken, SignOutButton, useUser } from "@clerk/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Waiting from "./Waiting";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();
  const { approval, setApproval, userType, setUserType } = useApproval();

  const [showWaiting, setShowWaiting] = useState(false);

  if (!user) {
    throw new Error("Unauthorized: No user found");
  }

  const fetchUser = async () => {
    try {
      const token = await getToken();
      const res = await fetchProfileAPI(token);
      console.log(res.data.user);
      setApproval(res.data.user.approval);
      setUserType(res.data.user.user_type);
    } catch (error: any) {
      console.log(error.message);
    }
  };

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
    fetchUser();
  }, [user]);

  useEffect(() => {
    if (!approval) {
      const timer = setTimeout(() => {
        setShowWaiting(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [approval]);

  if (!approval && !showWaiting) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return approval ? (
    <div className="flex justify-center items-center w-full flex-col gap-y-2">
      <h1>Dashboard</h1>
      {approval && <h1>Approved</h1>}
      {userType && <h1>{userType}</h1>}
      <h1>Dashboard needs data of atleast 2 weeks to be rendered</h1>
      <h1>Showing redirect buttons instead below...</h1>

      <Link to={"/attendance"}>Attendance</Link>
      <Link to={"/workers"}>Workers</Link>
      <Link to={"/payslips"}>Pay slips</Link>
    </div>
  ) : (
    <Waiting />
  );
};

export default Dashboard;
