import { Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WorkerCardProps {
  totalWorkers: number;
}

export default function TotalWorkers({ totalWorkers }: WorkerCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 py-6 px-10 lg:w-[95%]">
      <CardContent className="flex items-center justify-between p-2">
        {/* Left Section */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Total Workers</p>
          <h2 className="text-3xl font-bold tracking-tight">{totalWorkers}</h2>
        </div>

        {/* Right Icon */}
        <div className="bg-primary/10 text-primary p-4 rounded-xl ml-8">
          <Users className="w-6 h-6" />
        </div>
      </CardContent>
    </Card>
  );
}
