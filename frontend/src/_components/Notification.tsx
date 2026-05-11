import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
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
    </Dialog>
  );
};

export default Notification;
