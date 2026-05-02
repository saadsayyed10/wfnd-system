import { fetchProfileAPI, syncUserToDBAPI } from "@/api/user.api";
import { useApproval } from "@/hooks/useApproval";
import { getToken, useUser } from "@clerk/react";
import { useEffect, useState } from "react";
import Waiting from "./Waiting";
import { Loader2 } from "lucide-react";
import PresentWorkers from "@/_components/Dashboard/Workers/PresentWorkers";
import TotalWorkers from "@/_components/Dashboard/Workers/TotalWorkers";
import TotalUsers from "@/_components/Dashboard/TotalUser";
import AbsentWorkers from "@/_components/Dashboard/Workers/AbsentWorkers";

const Dashboard = () => {
  const { user } = useUser();
  const { approval, setApproval, setUserType } = useApproval();

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
      <div className="flex justify-between items-center w-full px-4">
        <div className="flex justify-start items-start w-full flex-col lg:gap-y-4">
          <TotalWorkers totalWorkers={12} />
          <TotalUsers totalUsers={5} />
        </div>
        <div className="flex justify-end items-end w-full flex-row lg:gap-x-4">
          <PresentWorkers />
          <AbsentWorkers />
        </div>
      </div>
    </div>
  ) : (
    <Waiting />
  );
};

export default Dashboard;
