import React from "react";
import "./TaskCardHeader.css";

function TaskCardHeader(props) {
  const activityIcon =
    props.status === "active" ? "/Assets/fire.png" : "/Assets/plant.png";
  return (
    <React.Fragment>
      <div className="task-card-header">
        <h5>{props.title}</h5>

        <p>{props.status}</p>
        <img src={activityIcon} height="24px" alt="activity status" />
      </div>
    </React.Fragment>
  );
}

export default TaskCardHeader;
