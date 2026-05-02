import { fetchCurrentDayAPI } from "@/api/attendance.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getToken } from "@clerk/react";
import { useEffect, useState } from "react";

interface Attendances {
  id: string;
  workerId: string;
  login: string;
  logout: string;
  type: string;
  totalHours: number;
  overtimeHours: number;
  workers: {
    name: string;
  };
}

const FetchTodayAttendance = () => {
  const [currentDay, _setCurrentDay] = useState(new Date().toISOString());
  const [attendances, setAttendances] = useState<Attendances[]>([]);

  const fetchAttendences = async () => {
    setAttendances([]);
    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const splitDay = currentDay.split("T")[0];
      const cronToday = splitDay + "T18:45:00.000Z";

      const res = await fetchCurrentDayAPI(cronToday, token);
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
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-2 lg:px-10 lg:my-10">
      <h4 className="lg:text-sm text-sm text-neutral-500 font-medium tracking-wide">
        Attendance of{" "}
        {new Date(currentDay).toLocaleDateString("en-GB", {
          weekday: "short",
          day: "2-digit",
          month: "short",
        })}
      </h4>
      <Table>
        <TableHeader className="border">
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>Worker</TableHead>
            <TableHead>Login Time</TableHead>
            <TableHead>Logout Time</TableHead>
            <TableHead>Worked Hours</TableHead>
            <TableHead>Overtime Hours</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          {!attendances || attendances.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
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
                <TableCell>{attendance.totalHours.toFixed(2)}</TableCell>
                <TableCell>{attendance.overtimeHours.toFixed(2)}</TableCell>
                <TableCell>{attendance.type}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FetchTodayAttendance;
