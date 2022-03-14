import React from "react";
import { useRef, useState, useEffect } from "react";

import Message from "./Message";

import "./chatBox.css";

function ChatBox(props) {
  const messageInput = useRef();
  const [messagesArray, setMessagesArray] = useState([]);
  let previousSender = "no sender";
  let messageAligment = "left";

  const messagesArrayReset = function () {
    setMessagesArray([]);
  };

  const messageArrayUpdate = function (messageObject) {
    setMessagesArray((prevState) => [...prevState, messageObject]);
  }; // // Error message handler and display
  // const errorHandler = function (error) {
  //   if (error === "INVALID_EMAIL") {
  //     setError("Incorect E-mail, please enter valid E-mail address");
  //   } else if (error === "MISSING_PASSWORD") {
  //     setError("Password field cant be empty, please provide password")
  //   } else if (error === "INVALID_PASSWORD") {
  //     setError ("Incorect password, please enter valid login credentials")
  //   } else {
  //     setError(error)
  //   }

  //   setTimeout(() => setError(null), 5000);
  // };

  // function sendMessage sends message to the database
  const pushMessage = function (message) {
    fetch(
      "https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/messages.json",
      {
        method: "POST",
        body: JSON.stringify({
          keyIdMsg: Math.random(),
          userIdMsg: `Message user ${props.user.id}`,
          nameMsg: props.user.name,
          avatarMsg: props.user.avatar,
          messageMsg: message,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          // console.log(data.name);
          // console.log(data);
          // console.log(data.name);
          // console.log(data);
          console.log("message sent");
          return res
            .json()
            .then((data) => {
              console.log(data);
            })
            .catch();
        } else {
          return res
            .json()
            .then((data) => console.log("error" + data))
            .catch();
        }
      })
      .then(() => {
        fetchMessages();
      })
      .catch();
  };

  const sendMessage = function (e) {
    e.preventDefault();
    const messageInputValue = messageInput.current.value;
    pushMessage(messageInputValue);
    e.target.reset();
    // fetchMessages()
  };

  // function that fetch messsages from database
  const fetchMessages = function () {
    fetch(
      "https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/messages.json"
    ).then((res) => {
      if (res.ok) {
        console.log("messages fetched");
        messagesArrayReset();
        return res.json().then((data) => {
          for (const key in data) {
            // if (data[key].email === currUser) {
            //   props.userData(data[key], key);
            //   console.log("User loaded");
            // }
            messageArrayUpdate({
              keyIdMsg: data[key].keyIdMsg,
              userIdMsg: data[key].userIdMsg,
              nameMsg: data[key].nameMsg,
              avatarMsg: data[key].avatarMsg,
              messageMsg: data[key].messageMsg,
            });
            // if (data[key].email === currUser) {
            //   props.userData(data[key], key);
            //   console.log("User loaded");
            // }
          }
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });
  };

  useEffect(() => {
    fetch(
      "https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/messages.json"
    ).then((res) => {
      if (res.ok) {
        console.log("messages fetched");
        messagesArrayReset();
        return res.json().then((data) => {
          for (const key in data) {
            // if (data[key].email === currUser) {
            //   props.userData(data[key], key);
            //   console.log("User loaded");
            // }
            messageArrayUpdate({
              keyIdMsg: data[key].keyIdMsg,
              userIdMsg: data[key].userIdMsg,
              nameMsg: data[key].nameMsg,
              avatarMsg: data[key].avatarMsg,
              messageMsg: data[key].messageMsg,
            });
            // if (data[key].email === currUser) {
            //   props.userData(data[key], key);
            //   console.log("User loaded");
            // }
          }
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });
  }, []);

  return (
    <React.Fragment>
      <div className="message-area">
        <ul className="message-area-inner">
          {messagesArray.map((msg) => {
            const isSameSender = previousSender === msg.userIdMsg;
            if (!isSameSender) {
              messageAligment === "left"
                ? (messageAligment = "right")
                : (messageAligment = "left");
            }
            previousSender = msg.userIdMsg;
            return (
              <Message
                key={msg.keyIdMsg + Math.random()}
                id={msg.userIdMsg}
                avatar={msg.avatarMsg}
                name={msg.nameMsg}
                message={msg.messageMsg}
                sameSender={isSameSender}
                messageAligment={messageAligment}
              ></Message>
            );
          })}
        </ul>
      </div>
      <form onSubmit={sendMessage}>
        <textarea ref={messageInput} className="text-area"></textarea>
        <button className="chat-btn" type="submit">
          SEND
        </button>
        {/* <button type="button" onClick={fetchMessages}>
          Get Msg
        </button> */}
      </form>
    </React.Fragment>
  );
}

export default ChatBox;
