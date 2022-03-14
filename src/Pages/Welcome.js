import React from "react";

import MainAreaMedium from "../UI/MainAreaMedium";
import "./Welcome.css";

function Welcome(props) {
  return (
    <React.Fragment>
      <h3>Welcome</h3>
      <MainAreaMedium>
        We are glad that you are using our application, please create account
        and log In :)
      </MainAreaMedium>
    </React.Fragment>
  );
}

export default Welcome;
