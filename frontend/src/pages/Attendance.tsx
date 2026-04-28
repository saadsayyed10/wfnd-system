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
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

const Attendance = () => {
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
          <h4 className="lg:text-lg font-semibold">Tue 28 Apr</h4>
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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Saad Sayyed</TableCell>
            <TableCell>10:30 AM</TableCell>
            <TableCell>06:00 PM</TableCell>
            <TableCell>PRESENT</TableCell>
            <TableCell>
              <MoreHorizontal className="w-4 h-4" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>Test 2</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>ABSENT</TableCell>
            <TableCell>
              <MoreHorizontal className="w-4 h-4" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>Test 3</TableCell>
            <TableCell>09:00 AM</TableCell>
            <TableCell>03:00 PM</TableCell>
            <TableCell>HALF DAY</TableCell>
            <TableCell>
              <MoreHorizontal className="w-4 h-4" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Attendance;
