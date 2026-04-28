import { useAuth } from "@clerk/react";
import { Loader2 } from "lucide-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Landing from "./pages/Landing";

const App = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center w-full min-h-screen">
        <Loader2 color="blue" className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return isSignedIn ? (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Dashboard />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  ) : (
    <Landing />
  );
};

export default App;
