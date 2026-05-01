import Navbar from "@/_components/Navbar";
import { fetchPayslipAPI } from "@/api/payslip.api";
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
import { useEffect, useState } from "react";

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
  const weekStart = "2026-04-27T10:39:40.359Z";
  const weekEnd = "2026-04-30T10:39:40.359Z";

  const fetchPayslipData = async () => {
    try {
      const res = await fetchPayslipAPI(weekStart, weekEnd);
      console.log(res.data.payslip);
      setPayslipData(res.data.payslip);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPayslipData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen items-center w-full flex-col lg:gap-y-8 gap-y-4 lg:p-10 p-6">
        <div className="flex justify-between items-center w-full">
          {/* <div className="flex justify-start items-center w-full lg:gap-x-2 gap-x-1">
            <Search className="lg:w-6 lg:h-6 w-4 h-4 opacity-25" />
            <Input className="w-62" placeholder="Search worker..." />
          </div> */}
          <div />
          <div className="flex justify-end items-end w-full flex-row gap-x-2">
            <Button>Generate Payslip</Button>
            <Button variant="secondary">Delete</Button>
          </div>
        </div>
        <Table>
          <TableCaption>
            Wage statement for period: 20-04-2026 to 25-04-2026
          </TableCaption>
          <TableHeader className="border">
            <TableRow>
              <TableHead>Sr No.</TableHead>
              <TableHead>Worker</TableHead>
              <TableHead>MON</TableHead>
              <TableHead>TUE</TableHead>
              <TableHead>WED</TableHead>
              <TableHead>THU</TableHead>
              <TableHead>O/T</TableHead>
              <TableHead>Total Days</TableHead>
              <TableHead>Actual Day</TableHead>
              <TableHead>Daily Payment</TableHead>
              <TableHead>Total Wage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border">
            {payslipData.map((payslip, idx) => (
              <TableRow key={payslip.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{payslip.workers.name}</TableCell>
                {payslip.payslip_data.map((pD, idx) => (
                  <TableCell key={idx}>{typeMap[pD.type] ?? pD.type}</TableCell>
                ))}
                <TableCell>{payslip.overtime_total}</TableCell>
                <TableCell>{payslip.total_days}</TableCell>
                <TableCell>{payslip.actual_days}</TableCell>
                <TableCell>{payslip.workers.daily_payment}</TableCell>
                <TableCell>{payslip.weekly_wage}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Payslip;
