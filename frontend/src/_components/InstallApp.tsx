import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const choice = await deferredPrompt.userChoice;
    console.log(choice);

    setDeferredPrompt(null);
  };

  if (!deferredPrompt) return null;

  return (
    <Button variant="ghost" onClick={handleInstall}>
      Install App
    </Button>
  );
};

export default InstallButton;
