
import React from "react";
import { FileText, LayoutDashboard } from "lucide-react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <FileText size={28} />
        <span>Resume<span className="highlight">Analyzer</span></span>
      </div>

      <div className="nav-links">
        <span>
          <LayoutDashboard size={18} />
          Dashboard
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
