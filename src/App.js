
import React from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="main-container">
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
