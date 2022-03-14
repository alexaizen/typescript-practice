import React from "react";
import NavBar from "../NavBar";
import MainAreaLarge from "../UI/MainAreaLarge";
import "./Settings.css";

function Settings(props) {
  return (
    <React.Fragment>
      <NavBar user={props.user}>
        <h2>Settings</h2>
      </NavBar>
      <MainAreaLarge>
        <h4>Settings</h4>
        <h4>fdsfsd dfsdfgds gdfgdfg</h4>
      </MainAreaLarge>
    </React.Fragment>
  );
}

export default Settings;
