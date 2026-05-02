import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface UserCardProps {
  totalUsers: number;
}

export default function TotalUsers({ totalUsers }: UserCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 py-6 px-10 lg:w-[95%]">
      <CardContent className="flex items-center justify-between p-2">
        {/* Left Section */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Total Workers</p>
          <h2 className="text-3xl font-bold tracking-tight">{totalUsers}</h2>
        </div>

        {/* Right Icon */}
        <div className="bg-black text-primary p-4 rounded-xl ml-8">
          <Users className="w-6 h-6" color="white" />
        </div>
      </CardContent>
    </Card>
  );
}
