import React from "react";

import "./LeftSidebar.css";

const LeftSidebar: React.FC<{ title: string }> = (props) => {
  return (
    <div className="left-sidebar">
      <h4>{props.title}</h4>
      <p>Test test test sdasdasda</p>
    </div>
  );
};

export default LeftSidebar;
