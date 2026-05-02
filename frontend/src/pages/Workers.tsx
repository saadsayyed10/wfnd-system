import {
  addWorkerAPI,
  deleteWorkerAPI,
  fetchWorkersAPI,
  updateWorkerAPI,
} from "@/api/worker.api";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApproval } from "@/hooks/useApproval";
import { getToken } from "@clerk/react";
import { Loader2, MoreHorizontal, Search } from "lucide-react";
import { useEffect, useState } from "react";

interface Workers {
  id: string;
  name: string;
  daily_payment: number;
  created_at: string;
}

const Workers = () => {
  const [workers, setWorkers] = useState<Workers[]>([]);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [dailyPayment, setDailyPayment] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [open, setOpen] = useState(false);

  const { userType } = useApproval();

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

  const filteredWorkers = workers.filter((worker) =>
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const addWorker = async () => {
    if (!name || !dailyPayment) {
      alert("Please do not leave any fields empty");
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      await addWorkerAPI(name, parseFloat(dailyPayment), token!);

      setName("");
      setDailyPayment("");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      fetchAllWorkers();
    }
  };

  const deleteWorker = async (id: string) => {
    setLoading(true);
    try {
      const token = await getToken();
      await deleteWorkerAPI(id, token!);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      fetchAllWorkers();
    }
  };

  const updateWorker = async (id: string) => {
    if (!name || !dailyPayment) {
      alert("Please do not leave any fields empty");
      return;
    }
    setLoading(true);
    try {
      const token = await getToken();
      await updateWorkerAPI(id, name, parseFloat(dailyPayment), token!);

      setName("");
      setDailyPayment("");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
      fetchAllWorkers();
    }
  };

  useEffect(() => {
    fetchAllWorkers();
  }, []);

  return (
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-8 gap-y-4 lg:p-10 p-6">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full lg:gap-x-2 gap-x-1">
          <Search className="lg:w-6 lg:h-6 w-4 h-4 opacity-25" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="lg:w-62 w-44"
            placeholder="Search worker..."
          />
        </div>
        <Dialog>
          {userType === "ADMIN" && (
            <DialogTrigger asChild>
              <Button size="lg">Add Worker</Button>
            </DialogTrigger>
          )}
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Register Worker</DialogTitle>
              <DialogDescription>
                Add worker to your system here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name of Worker"
            />
            <Input
              value={dailyPayment}
              onChange={(e) => setDailyPayment(e.target.value)}
              placeholder="Set Daily Payment"
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button disabled={loading} onClick={addWorker}>
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableCaption>A list of all WFND Workers</TableCaption>
        <TableHeader className="border">
          <TableRow>
            <TableHead>Sr No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Daily Payment</TableHead>
            <TableHead>Added On</TableHead>
            {userType === "ADMIN" && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody className="border">
          {filteredWorkers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center lg:py-6">
                No workers found.
              </TableCell>
            </TableRow>
          ) : (
            filteredWorkers.map((worker, idx) => (
              <TableRow>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{worker.name}</TableCell>
                <TableCell>{worker.daily_payment}</TableCell>
                <TableCell>{worker.created_at.split("T")[0]}</TableCell>
                {userType === "ADMIN" && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => deleteWorker(worker.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                        <Dialog open={open} onOpenChange={setOpen}>
                          <DialogTrigger asChild>
                            <DropdownMenuItem
                              onSelect={(e) => e.preventDefault()}
                            >
                              Update Payment
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-sm">
                            <DialogHeader>
                              <DialogTitle>Update Worker</DialogTitle>
                              <DialogDescription>
                                Update worker&apos;s name or payment to your
                                system here. Click update when you&apos;re done.
                              </DialogDescription>
                            </DialogHeader>

                            <Input
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Name of Worker"
                            />
                            <Input
                              value={dailyPayment}
                              onChange={(e) => setDailyPayment(e.target.value)}
                              placeholder="Set Daily Payment"
                            />

                            <DialogFooter>
                              <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                              </DialogClose>
                              <Button
                                disabled={loading}
                                onClick={async () => {
                                  await updateWorker(worker.id);
                                  setOpen(false);
                                }}
                              >
                                {loading ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  "Update changes"
                                )}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Workers;
