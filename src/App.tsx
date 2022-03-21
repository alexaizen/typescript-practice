import React from "react";

import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectLoggedIn } from "./Store/store";

import LeftSidebar from "./LeftSidebar";

import "./app.css";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";

function App() {
  const isLogedIn = useSelector(selectLoggedIn);

  return (
    <div className="layout">
      <LeftSidebar title={"Title Test"}></LeftSidebar>
      <Switch>
        {isLogedIn && (
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
        )}

        {isLogedIn && (
          <Route path="/tasks" exact>
            <Tasks />
          </Route>
        )}

        {isLogedIn && (
          <Route path="/profile" exact>
            <Profile />
          </Route>
        )}
        <Route path="*">
          <p>Welcome</p>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
