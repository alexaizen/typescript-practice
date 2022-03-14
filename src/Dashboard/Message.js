import React from "react";

import "./Message.css";

function Message(props) {
  const isSameSender = props.sameSender;
  const messageAligment = props.messageAligment;

  return (
    <React.Fragment>
      <li className={`message-container ${messageAligment}`}>
        {!isSameSender && messageAligment === "left" && (
          <div className={`message-header ${messageAligment}`}>
            <img src={props.avatar} width="26px" alt="mesage sender avatar" />
            <h5>{props.name}</h5>
          </div>
        )}
        {!isSameSender && messageAligment === "right" && (
          <div className={`message-header ${messageAligment}`}>
            <h5>{props.name}</h5>
            <img src={props.avatar} width="26px" alt="mesage sender avatar" />
          </div>
        )}

        <p>{props.message}</p>
      </li>
    </React.Fragment>
  );
}

export default Message;
