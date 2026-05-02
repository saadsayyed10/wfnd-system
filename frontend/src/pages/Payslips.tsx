import {
  deletePayslipAPI,
  fetchPayslipAPI,
  generatePayslipsAPI,
} from "@/api/payslip.api";
import { fetchWorkersAPI } from "@/api/worker.api";
import { Button } from "@/components/ui/button";
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

  const weekStart = "2026-04-20T10:39:40.359Z";
  const weekEnd = "2026-04-22T10:39:40.359Z";

  const fetchPayslipData = async () => {
    try {
      const res = await fetchPayslipAPI(weekStart, weekEnd);
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
    setLoading(true);
    try {
      await generatePayslipsAPI(
        workers.map((w) => w.id),
        weekStart,
        weekEnd,
      );
      console.log(
        payslipData.map((p) => p.workersId),
        weekStart,
        weekEnd,
      );
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
            <Button onClick={handleGeneratePayslip}>Generate Payslip</Button>
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
