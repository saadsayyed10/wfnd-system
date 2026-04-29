import {
  fetchCurrentDayAPI,
  loginWorkerAPI,
  logoutWorkerAPI,
} from "@/api/attendance.api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Loader2,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Attendances {
  id: string;
  workerId: string;
  login: string;
  logout: string;
  type: string;
  totalHours: number;
  workers: {
    name: string;
  };
}

const Attendance = () => {
  const [attendances, setAttendances] = useState<Attendances[] | null>([]);
  // let currentDay = new Date().toISOString();
  let currentDay = "2026-04-29T05:16:28.783Z";

  const [loading, setLoading] = useState(false);
  const [loginopen, setLoginOpen] = useState(false);
  const [logoutopen, setLogoutOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);

  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [meridiem, setMeridiem] = useState("");

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

  const handleLogin = async (id: string) => {
    if (!hour || !minute || !meridiem) {
      alert("Please enter all the field");
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      const login = `${hour}:${minute} ${meridiem}`;
      await loginWorkerAPI(id, login, token);

      setHour("");
      setMinute("");
      setMeridiem("");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      fetchAttendences();
    }
  };

  const handleLogout = async (id: string) => {
    if (!hour || !minute || !meridiem) {
      alert("Please enter all the field");
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      const logout = `${hour}:${minute} ${meridiem}`;
      await logoutWorkerAPI(id, logout, token);

      setHour("");
      setMinute("");
      setMeridiem("");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      fetchAttendences();
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
            <TableHead>Worked Hours</TableHead>
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
                <TableCell>{attendance.totalHours}</TableCell>
                <TableCell>{attendance.type}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <Dialog open={loginopen} onOpenChange={setLoginOpen}>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            Login
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Login Worker</DialogTitle>
                            <DialogDescription>
                              Sign in worker from today&apos;s attendance in
                              your system here. Click login when you&apos;re
                              done.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="flex justify-start items-center w-full flex-row lg:gap-x-4 gap-x-3">
                            <Input
                              value={hour}
                              onChange={(e) => setHour(e.target.value)}
                              placeholder="Hour"
                            />
                            <span>:</span>
                            <Input
                              value={minute}
                              onChange={(e) => setMinute(e.target.value)}
                              placeholder="Minute"
                            />

                            <Select
                              value={meridiem}
                              onValueChange={setMeridiem}
                            >
                              <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select Meridiem" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="AM">AM</SelectItem>
                                <SelectItem value="PM">PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              disabled={loading}
                              onClick={async () => {
                                await handleLogin(attendance.id);
                                setLoginOpen(false);
                              }}
                            >
                              {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Login"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={logoutopen} onOpenChange={setLogoutOpen}>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            Logout
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm">
                          <DialogHeader>
                            <DialogTitle>Logout Worker</DialogTitle>
                            <DialogDescription>
                              Sign out worker from today&apos;s attendance in
                              your system here. Click logout when you&apos;re
                              done.
                            </DialogDescription>
                          </DialogHeader>

                          <div className="flex justify-start items-center w-full flex-row lg:gap-x-4 gap-x-3">
                            <Input
                              value={hour}
                              onChange={(e) => setHour(e.target.value)}
                              placeholder="Hour"
                            />
                            <span>:</span>
                            <Input
                              value={minute}
                              onChange={(e) => setMinute(e.target.value)}
                              placeholder="Minute"
                            />

                            <Select
                              value={meridiem}
                              onValueChange={setMeridiem}
                            >
                              <SelectTrigger className="w-full max-w-48">
                                <SelectValue placeholder="Select Meridiem" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="AM">AM</SelectItem>
                                <SelectItem value="PM">PM</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              disabled={loading}
                              onClick={async () => {
                                await handleLogout(attendance.id);
                                setLogoutOpen(false);
                              }}
                            >
                              {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Logout"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog open={statusOpen} onOpenChange={setStatusOpen}>
                        <DialogTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(e) => e.preventDefault()}
                          >
                            Change Status
                          </DropdownMenuItem>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm lg:h-60">
                          <DialogHeader>
                            <DialogTitle>Update Status</DialogTitle>
                            <DialogDescription>
                              Update worker&apos;s attendance status if it fails
                              to do automatically. Click update when you&apos;re
                              done.
                            </DialogDescription>
                          </DialogHeader>

                          <Select>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Attendance Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PRESENT">Present</SelectItem>
                              <SelectItem value="ABSENT">Absent</SelectItem>
                              <SelectItem value="HALFDAY">Half Day</SelectItem>
                              <SelectItem value="OVERTIME">Overtime</SelectItem>
                            </SelectContent>
                          </Select>

                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button
                              disabled={loading}
                              onClick={async () => {
                                // await updateWorker(worker.id);
                                setStatusOpen(false);
                              }}
                            >
                              {loading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                "Update"
                              )}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
