import Navbar from "@/_components/Navbar";
import {
  deletePayslipAPI,
  fetchPayslipAPI,
  generatePayslipsAPI,
} from "@/api/payslip.api";
import { fetchWorkersAPI } from "@/api/worker.api";
import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface PayslipData {
  id: string;
  total_days: number;
  overtime_total: number;
  actual_days: number;
  weekly_wage: number;
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

  // const [startOfWeek, setStartOfWeek] = useState("");
  // const [endOfWeek, setEndOfWeek] = useState("");

  const weekStart = "2026-04-28T10:39:40.359Z";
  const weekEnd = "2026-05-04T10:39:40.359Z";

  const [loading, setLoading] = useState(false);
  const [payslipLoading, setPayslipLoading] = useState(false);

  const fetchPayslipData = async () => {
    try {
      const res = await fetchPayslipAPI(weekStart, weekEnd);
      console.log(res.data.payslip);
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
    setPayslipLoading(true);
    try {
      const res = await generatePayslipsAPI(
        workers.map((w) => w.id),
        weekStart,
        weekEnd,
      );
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setPayslipLoading(false);
      fetchPayslipData();
      fetchAllWorkers();
    }
  };

  const formatHours = (decimalHours: number) => {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);

    return `${hours}.${minutes.toString().padStart(2, "0")}`;
  };

  const exportToExcel = () => {
    if (payslipData.length === 0) {
      alert("No data to export");
      return;
    }

    const formattedData = payslipData.map((payslip, index) => {
      const days: Record<string, string> = {};

      const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

      payslip.payslip_data.forEach((pD, i) => {
        days[weekDays[i]] = typeMap[pD.type] ?? pD.type;
      });

      return {
        "Sr No": index + 1,
        Worker: payslip.workers.name,
        ...days,
        "O/T Hours": formatHours(payslip.overtime_total),
        "Total Days": payslip.total_days,
        "Actual Days": payslip.actual_days.toFixed(2),
        "Daily Payment": payslip.workers.daily_payment,
        "Total Wage": payslip.weekly_wage,
      };
    });

    // Convert JSON → Sheet
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Create Workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payslips");

    // Generate file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(
      fileData,
      `Payslips_${weekStart.split("T")[0]}_${weekEnd.split("T")[0]}.xlsx`,
    );
  };

  useEffect(() => {
    fetchPayslipData();
    fetchAllWorkers();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-full flex-col lg:gap-y-8 gap-y-4 lg:p-10 p-6">
        <div className="flex justify-between items-center w-full">
          <Button variant="secondary" onClick={exportToExcel}>
            Export to .xlsx
          </Button>
          <div />
          <div className="flex justify-end items-end w-full flex-row gap-x-2">
            <Button disabled={payslipLoading} onClick={handleGeneratePayslip}>
              {payslipLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Generate Payslip"
              )}
            </Button>
            {/* <Dialog>
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
                <Input
                  className="w-full"
                  placeholder="Week start date of this month"
                  type="number"
                  value={startOfWeek}
                  onChange={(e) => setStartOfWeek(e.target.value)}
                />
                <Input
                  className="w-full"
                  placeholder="Week end date of this month"
                  type="number"
                  value={endOfWeek}
                  onChange={(e) => setEndOfWeek(e.target.value)}
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    disabled={payslipLoading}
                    onClick={handleGeneratePayslip}
                  >
                    {payslipLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog> */}
            <Button
              disabled={loading}
              variant="destructive"
              onClick={handleDeletePayslips}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
        <Table>
          <TableCaption>
            {payslipData.length > 0 &&
              `Wage statement for period: ${weekStart.split("T")[0]} to ${weekEnd.split("T")[0]}`}
          </TableCaption>
          <TableHeader className="border">
            <TableRow>
              <TableHead>Sr No.</TableHead>
              <TableHead>Worker</TableHead>
              <TableHead>MON</TableHead>
              <TableHead>TUE</TableHead>
              <TableHead>WED</TableHead>
              <TableHead>THU</TableHead>
              <TableHead>FRI</TableHead>
              <TableHead>SAT</TableHead>
              <TableHead>SUN</TableHead>
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
                <TableCell colSpan={14} align="center" className="lg:p-6">
                  Please generate payslip to view this week&apos;s data
                </TableCell>
              </TableRow>
            ) : (
              payslipData.map((payslip, idx) => (
                <TableRow key={payslip.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{payslip.workers.name}</TableCell>
                  {payslip.payslip_data.map((pD, idx) => (
                    <TableCell key={idx}>
                      {typeMap[pD.type] ?? pD.type}
                    </TableCell>
                  ))}
                  <TableCell>{formatHours(payslip.overtime_total)}</TableCell>
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
    </>
  );
};

export default Payslip;
