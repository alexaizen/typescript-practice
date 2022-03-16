import React from "react";

import { Route, Switch } from "react-router-dom";

import LeftSidebar from "./LeftSidebar";

import "./app.css";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <div className="layout">
      <LeftSidebar title={"Title Test"}></LeftSidebar>
      <Switch>
        <Route path="/Dashboard" exact>
               <Dashboard />
        </Route>
        <Route path="/Profile" exact>
               <Dashboard />
        </Route>
      

      </Switch>
      
    </div>
  );
}

export default App;
