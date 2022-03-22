import React from "react";

import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import { selectLoggedIn } from "./Store/store";

import LeftSidebar from "./LeftSidebar";

import "./app.css";
import Dashboard from "./Pages/Dashboard";
import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";

function App() {
  const isLogedIn = useSelector(selectLoggedIn);
  const [isLoaded, setIsloaded] = useState<boolean>(false);

  type TaskModel ={
    desc: string;
    id: number;
    status: string;
    title: string;
}

type UserModel = {
    avatar: string;
    bio: string;
    email: string;
    fb: string;
    id: string;
    insta: string;
    li: string;
    name: string;
    occupation: string;
    password: string;
    tasks: TaskModel[]
}

  // Identifies currently logged user by email
  const [currentUser, setCurrentUser] = useState<UserModel>({
    avatar: "string",
      bio: "string",
      email: "no email",
      fb: "string",
      id: "string",
      insta: "string",
      li: "string",
      name: "string",
      occupation: "string",
      password: "string",
      tasks: []
  });
  // Set currently logged user by email
  const currentUserDataHandler = function (dbData: UserModel) {
    setCurrentUser((prevState) => {
      return { ...prevState, ...dbData};
    });
    console.log(currentUser.email);
    setIsloaded(true);
  };

  const currentUserDataUpdater = function (user: UserModel) {
    setCurrentUser(user);
  };

  return (
    <div className="layout">
      <LeftSidebar title={"Title Test"} userData={currentUserDataHandler}></LeftSidebar>
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
