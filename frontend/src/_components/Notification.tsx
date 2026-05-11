import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Bell } from "lucide-react";

const Notification = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="rounded-full border shadow-lg bg-white"
        >
          <Bell width={4} height={4} />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex justify-start items-start flex-col gap-y-4 w-full h-75 overflow-y-auto px-4 lg:py-10 py-10">
        <div className="flex justify-start items-start flex-col gap-y-1 p-2 shadow rounded-xl border w-full">
          <h4 className="font-medium text-lg">Worker notification:</h4>
          <h6 className="text-xs text-neutral-500">
            Anasaya has been added to the system.
          </h6>
          <div className="flex justify-between items-center w-full mt-4">
            <p className="text-xs text-neutral-500">1:04 PM</p>
            <p className="text-xs text-neutral-500">2026-05-09</p>
          </div>
        </div>
        <div className="flex justify-start items-start flex-col gap-y-1 p-2 shadow rounded-xl border w-full">
          <h4 className="font-medium text-lg">Attendance notification:</h4>
          <h6 className="text-xs text-neutral-500">
            Asif Mistri logged-in at 9:17 AM
          </h6>
          <div className="flex justify-between items-center w-full mt-4">
            <p className="text-xs text-neutral-500">1:04 PM</p>
            <p className="text-xs text-neutral-500">2026-05-09</p>
          </div>
        </div>
        <div className="w-full">
          <Button className="w-full" variant="destructive">
            Delete All
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Notification;
