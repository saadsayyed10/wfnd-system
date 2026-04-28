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
import { MoreHorizontal, Search } from "lucide-react";

const Workers = () => {
  return (
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-8 gap-y-4 lg:p-10 p-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full lg:gap-x-2 gap-x-1">
          <Search className="lg:w-6 lg:h-6 w-4 h-4 opacity-25" />
          <Input className="w-62" placeholder="Search worker..." />
        </div>
        <Button size="lg">Add Worker</Button>
      </div>
      <Table>
        <TableCaption>A list of all WFND Workers</TableCaption>
        <TableHeader className="border">
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Daily Payment</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Arif Chacha</TableCell>
            <TableCell>2000.00</TableCell>
            <TableCell>
              <MoreHorizontal className="w-4 h-4" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Workers;
