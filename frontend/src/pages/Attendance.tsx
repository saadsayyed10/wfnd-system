import { fetchCurrentDayAPI } from "@/api/attendance.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getToken } from "@clerk/react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Attendances {
  workerId: string;
  login: string;
  logout: string;
  type: string;
  workers: {
    name: string;
  };
}

const Attendance = () => {
  const [attendances, setAttendances] = useState<Attendances[] | null>([]);
  // let currentDay = new Date().toISOString();
  let currentDay = "2026-04-28T11:16:05.999Z";

  const fetchAttendences = async () => {
    try {
      const token = await getToken();
      console.log("Token: ", token);

      const res = await fetchCurrentDayAPI(currentDay, token);
      console.log(res.data.day);
      setAttendances(res.data.day);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAttendences();
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-8 gap-y-4 lg:p-10 p-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center lg:gap-x-2 gap-x-1">
          <Search className="lg:w-6 lg:h-6 w-4 h-4 opacity-25" />
          <Input className="w-62" placeholder="Search worker..." />
        </div>

        <div className="flex items-center lg:gap-x-2 gap-x-1 ml-auto">
          <Button variant="ghost">
            <ChevronLeft className="lg:w-6 lg:h-6 w-4 h-4 opacity-25" />
          </Button>
          <h4 className="lg:text-lg font-semibold">
            {new Date().toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "short",
            })}
          </h4>
          <Button variant="ghost">
            <ChevronRight className="lg:w-6 lg:h-6 w-4 h-4 opacity-25" />
          </Button>
        </div>
      </div>
      <Table>
        <TableCaption>A list of attendance of all WFND Employees</TableCaption>
        <TableHeader className="border">
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>Worker</TableHead>
            <TableHead>Login Time</TableHead>
            <TableHead>Logout Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          {!attendances || attendances.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No attendance data found
              </TableCell>
            </TableRow>
          ) : (
            attendances.map((attendance, idx) => (
              <TableRow key={attendance.workerId}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{attendance.workers.name}</TableCell>
                <TableCell>{attendance.login}</TableCell>
                <TableCell>{attendance.logout}</TableCell>
                <TableCell>{attendance.type}</TableCell>
                <TableCell>
                  <MoreHorizontal className="w-4 h-4" />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Attendance;
