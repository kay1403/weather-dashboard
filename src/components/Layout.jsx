import { useState } from "react";
import Landing from "./Landing";

function Layout({ children }) {
  const [started, setStarted] = useState(false);

  return (
    <div className="relative overflow-hidden">
      {!started && (
        <div className="absolute inset-0 transition-all duration-700 ease-in-out opacity-100">
          <Landing onStart={() => setStarted(true)} />
        </div>
      )}
      {started && (
        <div className="transition-all duration-700 ease-in-out opacity-100">
          {children || <div>Loading...</div>}
        </div>
      )}
    </div>
  );
}

export default Layout;