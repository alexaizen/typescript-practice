import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Navigation from "./Components/Navigation";

import { selectLoggedIn, loginToggle } from "./Store/store";

import "./LeftSidebar.css";
import LoginForm from "./Components/LoginForm";


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

const LeftSidebar: React.FC<{title: string, userData: (dbData: UserModel)=> void;}> = (props) => {

  
  const dispatch = useDispatch();
  const isLogedIn = useSelector(selectLoggedIn);
  const history = useHistory();

  const loginStatusHandler = () => {
    dispatch(loginToggle());
    history.push(isLogedIn ? "/" : "/dashboard");
  };

  return (
    <div className="left-sidebar">
      <div className="profile-area">
        <img
          src="/Assets/network.png"
          alt="avatar"
          width="60px"
          height="60px"
        />
        <h4>Connectify</h4>
      </div>
      {isLogedIn && <Navigation></Navigation>}

      {!isLogedIn && <LoginForm onLogin={loginStatusHandler} userData={props.userData}/>}
      <button
        className="button-log-out"
        type="button"
        onClick={loginStatusHandler}
      >
        {isLogedIn ? "Log Out" : "Log In"}
      </button>
    </div>
  );
};

export default LeftSidebar;
