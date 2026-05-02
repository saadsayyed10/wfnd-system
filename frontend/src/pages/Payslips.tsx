import {
  deletePayslipAPI,
  fetchPayslipAPI,
  generatePayslipsAPI,
} from "@/api/payslip.api";
import { fetchWorkersAPI } from "@/api/worker.api";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { format } from "date-fns";
import { ChevronDownIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

interface PayslipData {
  id: string;
  total_days: number;
  overtime_total: number;
  actual_days: number;
  weekly_wage: number;
  workersId: string;
  workers: {
    name: string;
    daily_payment: string;
  };
  payslip_data: [
    {
      type: string;
      login: string;
      logout: string;
      totalHours: number;
      overtimeHours: number;
    },
  ];
}

const typeMap: Record<string, string> = {
  PRESENT: "P",
  ABSENT: "A",
  OVERTIME: "O/T",
  HALFDAY: "HD",
};

const Payslip = () => {
  const [payslipData, setPayslipData] = useState<PayslipData[]>([]);
  const [workers, setWorkers] = useState<{ id: string; name: string }[]>([]);

  const [loading, setLoading] = useState(false);

  const [weekStart, setWeekStart] = useState<Date>(new Date());
  const [weekEnd, setWeekEnd] = useState<Date>(new Date());

  const addOneDay = (date: Date) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    return d;
  };

  const fetchPayslipData = async () => {
    try {
      const splitWeekStart = addOneDay(weekStart).toISOString().split("T")[0];
      const splitWeekEnd = addOneDay(weekEnd).toISOString().split("T")[0];

      const res = await fetchPayslipAPI(
        splitWeekStart + "T18:45:00.000Z",
        splitWeekEnd + "T18:45:00.000Z",
      );
      console.log(res.data);
      setPayslipData(res.data.payslip);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const fetchAllWorkers = async () => {
    setLoading(true);
    try {
      const token = await getToken();

      if (!token) {
        throw new Error("Unauthorized: No token found");
      }

      const res = await fetchWorkersAPI(token);
      setWorkers(res.data.worker);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePayslips = async () => {
    setLoading(true);
    try {
      await deletePayslipAPI();
      alert("Payslip deleted");

      setWeekStart(new Date());
      setWeekEnd(new Date());
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      fetchPayslipData();
    }
  };

  const handleGeneratePayslip = async () => {
    if (!weekStart || !weekEnd) {
      alert("Please enter week start and week end");
      return;
    }
    setLoading(true);
    try {
      const splitWeekStart = addOneDay(weekStart).toISOString().split("T")[0];
      const splitWeekEnd = addOneDay(weekEnd).toISOString().split("T")[0];

      const res = await generatePayslipsAPI(
        workers.map((w) => w.id),
        splitWeekStart + "T18:45:00.000Z",
        splitWeekEnd + "T18:45:00.000Z",
      );
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      fetchPayslipData();
    }
  };

  useEffect(() => {
    fetchPayslipData();
    fetchAllWorkers();
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-8 gap-y-4 lg:p-10 p-6">
      <div className="flex justify-between items-center w-full">
        {payslipData.length > 0 && (
          <Button variant="secondary">Export to .xlsx</Button>
        )}
        <div className="flex justify-end items-end w-full flex-row gap-x-2">
          {payslipData.length === 0 && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>Generate Payslip</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                  <DialogTitle>Generate Payslip</DialogTitle>
                  <DialogDescription>
                    Generate payslips of workers for the week here. Click
                    generate when you&apos;re done.
                  </DialogDescription>
                </DialogHeader>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!weekStart}
                      className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {weekStart ? (
                        format(weekStart, "PPP")
                      ) : (
                        <span>Assign the start of the week</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={weekStart}
                      onSelect={setWeekStart}
                      defaultMonth={weekStart}
                    />
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      data-empty={!weekEnd}
                      className="w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
                    >
                      {weekEnd ? (
                        format(weekEnd, "PPP")
                      ) : (
                        <span>Assign the start of the week</span>
                      )}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={weekEnd}
                      onSelect={setWeekEnd}
                      defaultMonth={weekEnd}
                    />
                  </PopoverContent>
                </Popover>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleGeneratePayslip}>Generate</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
          {payslipData.length > 0 && (
            <Button variant="destructive" onClick={handleDeletePayslips}>
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          )}
        </div>
      </div>
      <Table>
        {payslipData.length !== 0 && (
          <TableCaption>
            Wage statement for period: 20-04-2026 to 25-04-2026
          </TableCaption>
        )}
        <TableHeader className="border">
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>Worker</TableHead>
            <TableHead>MON</TableHead>
            <TableHead>TUE</TableHead>
            <TableHead>WED</TableHead>
            {/* <TableHead>THU</TableHead>
            <TableHead>FRI</TableHead>
            <TableHead>SAT</TableHead> */}
            <TableHead>O/T Hours</TableHead>
            <TableHead>Total Days</TableHead>
            <TableHead>Actual Day</TableHead>
            <TableHead>Daily Payment</TableHead>
            <TableHead>Total Wage</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          {payslipData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={14}
                className="text-center align-middle lg:py-6"
              >
                Please generate payslip to view weekly data
                {/* {addOneDay(weekStart).toISOString().split("T")[0]} -{" "}
                {addOneDay(weekEnd).toISOString().split("T")[0]} */}
              </TableCell>
            </TableRow>
          ) : (
            payslipData.map((payslip, idx) => (
              <TableRow key={payslip.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{payslip.workers.name}</TableCell>
                {payslip.payslip_data.map((pD, idx) => (
                  <TableCell key={idx}>{typeMap[pD.type] ?? pD.type}</TableCell>
                ))}
                <TableCell>{payslip.overtime_total.toFixed(2)}</TableCell>
                <TableCell>{payslip.total_days}</TableCell>
                <TableCell>{payslip.actual_days.toFixed(2)}</TableCell>
                <TableCell>{payslip.workers.daily_payment}</TableCell>
                <TableCell>{payslip.weekly_wage}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Payslip;
