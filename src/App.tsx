import React from "react";

import LeftSidebar from "./LeftSidebar";

import "./app.css";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div className="layout">
      <LeftSidebar title={"Title Test"}></LeftSidebar>
      <Dashboard />
    </div>
  );
}

export default App;
