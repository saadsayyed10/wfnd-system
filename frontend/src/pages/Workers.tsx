import Notification from "@/_components/Notification";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApproval } from "@/hooks/useApproval";
import { getToken } from "@clerk/react";
import { Loader2, MoreHorizontal, Plus, Search, X } from "lucide-react";
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

  const [hideSearch, setHideSearch] = useState<boolean>(false);

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
    <div className="flex justify-center items-center w-full flex-col lg:gap-y-8 gap-y-14 lg:p-10 p-6 bg-neutral-100">
      <div className="flex justify-between items-center w-full">
        <div className="flex justify-start items-center w-full lg:gap-x-2 gap-x-1">
          <Button
            variant="ghost"
            size="icon-lg"
            className="rounded-full border shadow-lg bg-white"
            onClick={() => {
              !hideSearch ? setHideSearch(true) : setHideSearch(false);
            }}
          >
            {!hideSearch ? (
              <Search width={4} height={4} />
            ) : (
              <X width={4} height={4} />
            )}
          </Button>
          {hideSearch && (
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="lg:w-62 w-40 bg-white rounded-full border shadow-lg"
            />
          )}
        </div>
        <div className="flex justify-end items-end w-full gap-x-3">
          <Notification />
          <Dialog>
            {userType === "ADMIN" && (
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="rounded-full border shadow-lg bg-white"
                >
                  <Plus width={4} height={4} />
                </Button>
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
                type="number"
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
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">Name</TableHead>
            <TableHead
              className={`${userType === "MODERATOR" ? `text-end` : `text-center`}`}
            >
              Daily Payment
            </TableHead>
            {userType === "ADMIN" && (
              <TableHead className="text-end">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredWorkers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center lg:py-6">
                No workers found.
              </TableCell>
            </TableRow>
          ) : (
            filteredWorkers.map((worker) => (
              <TableRow key={worker.id}>
                <TableCell className="text-start">{worker.name}</TableCell>
                <TableCell
                  className={`${userType === "MODERATOR" ? `text-end` : `text-center`}`}
                >
                  ₹ {worker.daily_payment}
                </TableCell>
                {userType === "ADMIN" && (
                  <TableCell className="text-end">
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
