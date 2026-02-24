import { useState } from "react";
import LandingPage from "./components/LandingPage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleStart = () => {
    setShowDashboard(true);
  };

  return (
    <div className="relative overflow-hidden">
      {!showDashboard && (
        <div className="transition-opacity duration-700 ease-in-out">
          <LandingPage onStart={handleStart} />
        </div>
      )}

      {showDashboard && (
        <div className="transition-opacity duration-700 ease-in-out">
          <Dashboard />
        </div>
      )}
    </div>
  );
}

export default App;