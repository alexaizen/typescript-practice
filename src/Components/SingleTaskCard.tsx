import React from "react";
import "./SingleTaskCard.css";

const SingleTaskCard: React.FC<{ title: string; desc: string }> = (props) => {
  return (
    <li className="single-task-card">
      <p>{props.title}</p>
      <p>{props.desc}</p>
    </li>
  );
};

export default SingleTaskCard;
