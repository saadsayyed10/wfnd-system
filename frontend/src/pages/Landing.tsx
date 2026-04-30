import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/react";

const GoogleIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M44.5 20H24v8.5h11.8C34.9 33.6 30 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 3l6.2-6.2C34.5 4.5 29.5 2.5 24 2.5 12.7 2.5 3.5 11.7 3.5 23S12.7 43.5 24 43.5 44.5 34.3 44.5 23c0-1-.1-2-.3-3z"
    />
  </svg>
);

const Landing = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg text-center space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome to Wood Furniture and Decore System
        </h1>

        <p className="text-sm text-gray-500">
          Sign in to continue to access worker management system
        </p>

        <SignInButton>
          <Button
            variant="outline"
            className="w-full flex items-center gap-3 justify-center"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
        </SignInButton>
      </div>
    </div>
  );
};

export default Landing;
