import Navbar from "@/_components/Navbar";
import { syncUserToDBAPI } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { SignOutButton, useUser } from "@clerk/react";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useUser();

  useEffect(() => {
    const syncClerkUser = async () => {
      try {
        await syncUserToDBAPI(
          user.id,
          user.fullName,
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
    <div className="flex justify-center items-center w-full min-h-screen flex-col gap-y-2">
      <Navbar />
      <h1>Dashboard</h1>
      <Button asChild>
        <SignOutButton>Logout</SignOutButton>
      </Button>
    </div>
  );
};

export default Dashboard;
