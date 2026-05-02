import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useClerk, useUser } from "@clerk/react";
import { Shield, Clock, LogOut, Mail, User } from "lucide-react";

export default function Waiting() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <div className="flex flex-col items-center justify-center px-4 font-sans antialiased lg:mb-10">
      {/* Subtle grid background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <Card className="z-10 w-full max-w-md shadow-xl border border-gray-200 bg-white rounded-2xl overflow-hidden">
        {/* Top accent strip */}
        <div className="h-1.5 w-full bg-linear-to-r from-black via-black to-black" />

        <CardContent className="px-8 pt-8 pb-8">
          {/* Status badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 gap-1.5 rounded-full">
              <Clock className="w-3 h-3" />
              Pending Approval
            </Badge>
          </div>

          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-transparent border-2 border-black flex items-center justify-center">
                <Shield className="w-7 h-7 text-black" />
              </div>
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full border-2 border-black animate-ping opacity-20" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-center text-xl font-extrabold text-gray-900 tracking-tight mb-2">
            Account Under Review
          </h1>
          <p className="text-center text-sm text-gray-500 leading-relaxed mb-7">
            Your account has not been approved yet. Our team is reviewing your
            credentials. You'll be notified once access is granted.
          </p>

          <Separator className="mb-6" />

          {/* User info */}
          <div className="space-y-3 mb-7">
            {/* Name */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">
                  <img
                    src={user?.imageUrl}
                    alt="profile"
                    className="w-10 h-10 rounded-full"
                  />
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                  Full Name
                </p>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <User className="w-4 h-4 text-gray-300 ml-auto shrink-0" />
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-0.5">
                  Email Address
                </p>
                <p className="text-sm font-medium text-gray-700 truncate">
                  {user?.primaryEmailAddress?.emailAddress}
                </p>
              </div>
            </div>
          </div>

          {/* Logout button */}
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors gap-2 font-semibold"
            onClick={() => signOut()}
          >
            <LogOut className="w-4 h-4" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
