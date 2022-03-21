import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Navigation from "./Components/Navigation";

import { selectLoggedIn, loginToggle } from "./Store/store";

import "./LeftSidebar.css";

const LeftSidebar: React.FC<{ title: string }> = (props) => {
  const dispatch = useDispatch();
  const isLogedIn = useSelector(selectLoggedIn);
  const history = useHistory();

  const loginStatusHandler = function () {
    // e.preventDefault();
    dispatch(loginToggle());
    console.log(isLogedIn);
    history.push(isLogedIn ? "/welcome" : "/dashboard");
  };

  return (
    <div className="left-sidebar">
      <h4>{props.title}</h4>
      <p>Test test test sdasdasda</p>
      <Navigation></Navigation>
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
