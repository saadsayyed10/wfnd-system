import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/react";

const Landing = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <Button asChild>
        <SignInButton mode="modal">Login</SignInButton>
      </Button>
    </div>
  );
};

export default Landing;
