import { Show, SignInButton, SignOutButton, useUser } from "@clerk/react";

const App = () => {
  const { user } = useUser();

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
