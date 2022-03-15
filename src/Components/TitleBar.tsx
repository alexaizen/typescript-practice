import React from "react";
import "./TitleBar.css";

const TitleBar: React.FC<{ title: string }> = (props) => {
  return (
    <div className="title-bar">
      <h3>{props.title}</h3>
    </div>
  );
};

export default TitleBar;
