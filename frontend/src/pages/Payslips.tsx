// import { Button } from "@/components/ui/button";
import Navbar from "@/_components/Navbar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Payslip = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center min-h-screen items-center w-full flex-col lg:gap-y-8 gap-y-4 lg:p-10 p-6">
        {/* <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full lg:gap-x-2 gap-x-1">
          <Search className="lg:w-6 lg:h-6 w-4 h-4 opacity-25" />
          <Input className="w-62" placeholder="Search worker..." />
        </div>
        <div />
      </div> */}
        <Table>
          <TableCaption>
            Wage statement for period: 20-04-2026 to 25-04-2026
          </TableCaption>
          <TableHeader className="border">
            <TableRow>
              <TableHead>Sr No.</TableHead>
              <TableHead>Worker</TableHead>
              <TableHead>O/T</TableHead>
              <TableHead>MON</TableHead>
              <TableHead>TUE</TableHead>
              <TableHead>WED</TableHead>
              <TableHead>THU</TableHead>
              <TableHead>FRI</TableHead>
              <TableHead>SAT</TableHead>
              <TableHead>Total Days</TableHead>
              <TableHead>Actual Day</TableHead>
              <TableHead>Daily Payment</TableHead>
              <TableHead>Total Wage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="border">
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Ashpak</TableCell>
              <TableCell>0.02</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>A</TableCell>
              <TableCell>P</TableCell>
              <TableCell>5</TableCell>
              <TableCell>5.02</TableCell>
              <TableCell>1000</TableCell>
              <TableCell>5020</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>2</TableCell>
              <TableCell>Gaikwad</TableCell>
              <TableCell>0.7</TableCell>
              <TableCell>A</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>A</TableCell>
              <TableCell>P</TableCell>
              <TableCell>4</TableCell>
              <TableCell>4.7</TableCell>
              <TableCell>600</TableCell>
              <TableCell>2820</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>3</TableCell>
              <TableCell>Asif Mistri</TableCell>
              <TableCell>0.4</TableCell>
              <TableCell>A</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>A</TableCell>
              <TableCell>P</TableCell>
              <TableCell>4</TableCell>
              <TableCell>4.4</TableCell>
              <TableCell>1250</TableCell>
              <TableCell>5500</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>4</TableCell>
              <TableCell>Sharif Chacha</TableCell>
              <TableCell>0.61</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>P</TableCell>
              <TableCell>A</TableCell>
              <TableCell>P</TableCell>
              <TableCell>5</TableCell>
              <TableCell>5.61</TableCell>
              <TableCell>850</TableCell>
              <TableCell>4769</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default Payslip;
