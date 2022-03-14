import React from "react";
import "./Navbar.css";

function NavBar(props) {
  return (
    <div className="navigation">
      <React.Fragment>{props.children}</React.Fragment>
      <h4>Hello {props.user.name}</h4>
      <img src={props.user.avatar} width="50px" alt="avatar" />
    </div>
  );
}

export default NavBar;
