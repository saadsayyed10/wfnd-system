import { Show, SignInButton, SignOutButton, useUser } from "@clerk/react";
import { useEffect } from "react";
import { syncUserToDBAPI } from "./api/user.api";

const App = () => {
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
    <div className="flex justify-center items-center w-full min-h-screen">
      <Show when="signed-in">
        <div className="flex justify-center items-center w-full flex-col gap-y-2">
          <h1>{user?.id}</h1>
          <h1>{user?.firstName}</h1>
          <h1>{user?.lastName}</h1>
          <h1>{user?.emailAddresses[0].emailAddress}</h1>
          <img
            src={user?.imageUrl}
            alt="Pfp"
            width={30}
            height={30}
            className="mb-6"
          />
          <SignOutButton>Logout</SignOutButton>
        </div>
      </Show>
      <Show when="signed-out">
        <SignInButton mode="modal">Login</SignInButton>
      </Show>
    </div>
  );
};

export default App;
