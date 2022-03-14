import React from "react";
import { useState, useRef } from "react";

import "./TaskCard.css";
import TaskCardHeader from "./TaskCardHeader";

function TaskCard(props) {
  const [isEditing, setisEditing] = useState(false);

  const editedTitle = useRef();
  const editedDesc = useRef();

  const deleteTask = function (id) {
    props.delete(id);
  };

  const completeTaskCard = function (id) {
    props.onComplete(id);

    const newtasks = props.user.tasks.map((u) => {
      return u.id === id
        ? { title: u.title, id: u.id, desc: u.desc, status: "completed" }
        : u;
    });

    const updatedUser = {
      id: props.user.id,
      avatar: props.user.avatar,
      name: props.user.name,
      email: props.user.email,
      password: props.user.password,
      occupation: props.user.occupation,
      bio: props.user.bio,
      fb: props.user.fb,
      insta: props.user.insta,
      li: props.user.li,
      tasks: [...newtasks],
    };

    // Updating currently loaded user
    props.userUpdater(updatedUser);

    // Updating user data in database
    fetch(
      `https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: props.user.id,
          avatar: props.user.avatar,
          name: props.user.name,
          email: props.user.email,
          password: props.user.password,
          occupation: props.user.occupation,
          bio: props.user.bio,
          fb: props.user.fb,
          insta: props.user.insta,
          li: props.user.li,
          tasks: [...newtasks],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("New task added to database");
        return res.json().then((data) => {
          console.log(data.tasks);
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });

    // Updating status into database
  };

  const editTaskToggler = function () {
    setisEditing(true);
  };

  const saveEditTaskCard = function (id, title, desc) {
    props.onEdit(id, title, desc);

    const newtasks = props.user.tasks.map((u) => {
      return u.id === id
        ? { title: title, id: id, desc: desc, status: u.status }
        : u;
    });

    const updatedUser = {
      id: props.user.id,
      avatar: props.user.avatar,
      name: props.user.name,
      email: props.user.email,
      password: props.user.password,
      occupation: props.user.occupation,
      bio: props.user.bio,
      fb: props.user.fb,
      insta: props.user.insta,
      li: props.user.li,
      tasks: [...newtasks],
    };

    // Updating currently loaded user
    props.userUpdater(updatedUser);

    // Updating user data in database
    fetch(
      `https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: props.user.id,
          avatar: props.user.avatar,
          name: props.user.name,
          email: props.user.email,
          password: props.user.password,
          occupation: props.user.occupation,
          bio: props.user.bio,
          fb: props.user.fb,
          insta: props.user.insta,
          li: props.user.li,
          tasks: [...newtasks],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("New task added to database");
        return res.json().then((data) => {
          console.log(data.tasks);
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });
    // Updating status into database
    setisEditing(false);
  };

  return (
    <React.Fragment>
      {!isEditing && (
        <div className="task-card-single">
          <TaskCardHeader title={props.title} status={props.status} />
          <p className="task-desc" >{`${props.desc}`}</p>
          <span className="buttons-area">
            <button
              className="button-delete"
              type="button"
              onClick={() => deleteTask(props.id)}
            >
              &#9747; Delete
            </button>
            <button
              className="button-edit"
              type="button"
              onClick={editTaskToggler}
            >
              Edit
            </button>
            <button
              className="button-complete"
              type="button"
              onClick={() => completeTaskCard(props.id)}
            >
              Done
            </button>
          </span>
        </div>
      )}

      {/* Task editing form */}
      {isEditing && (
        <form
          className="task-card-single"
          onSubmit={() =>
            saveEditTaskCard(
              props.id,
              editedTitle.current.value,
              editedDesc.current.value
            )
          }
        >
          <input defaultValue={props.title} ref={editedTitle}></input>
          <textarea defaultValue={props.desc} ref={editedDesc}></textarea>

          <span className="buttons-area">
            <button
              className="button-delete"
              type="button"
              onClick={() => setisEditing(false)}
            >
              &#9747; Discard
            </button>
            <button className="button-complete" type="submit">
              Save
            </button>
          </span>
        </form>
      )}
    </React.Fragment>
  );
}

export default TaskCard;
