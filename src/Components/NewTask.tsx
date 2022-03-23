import React, { useRef, useState } from "react";

import "./NewTask.css";

type TaskModel = {
  desc: string;
  id: number;
  status: string;
  title: string;
};

type UserModel = {
  avatar: string;
  bio: string;
  email: string;
  fb: string;
  id: string;
  insta: string;
  li: string;
  name: string;
  occupation: string;
  password: string;
  tasks: TaskModel[];
};

const NewTask: React.FC<{
  user: UserModel;
  dbKey: string;
  onAddTask: (task: TaskModel) => void;
  currUserUpdater: (user: UserModel) => void;
}> = (props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const descInput = useRef<HTMLInputElement>(null);
  const [addTaskToggle, setaddTaskToggle] = useState<boolean>(false);

  const addTaskToggleHandler = () => {
    setaddTaskToggle((prevState) => !prevState);
  };

  // submit new task data to tasklist, current user tasks and user task list in database, called in form submit handler
  const newTaskDataSubmiter = function (
    title: string,
    desc: string,
    id: number
  ) {
    props.onAddTask({
      title: title,
      desc: desc,
      status: "active",
      id: id,
    });

    // Adding to currently loaded user
    props.currUserUpdater({
      avatar: props.user.avatar,
      bio: props.user.bio,
      email: props.user.email,
      fb: props.user.fb,
      id: props.user.id,
      insta: props.user.insta,
      li: props.user.li,
      name: props.user.name,
      occupation: props.user.occupation,
      password: props.user.password,
      tasks: [
        ...props.user.tasks,
        { id: id, title: title, desc: desc, status: "active" },
      ],
    });

    // Adding to database
    fetch(
      `https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users/${props.dbKey}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...props.user,
          tasks: [
            ...props.user.tasks,
            { id: id, title: title, desc: desc, status: "active" },
          ],
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

    // END of fetch function
  };

  const formSubmitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    const titleInputValue: string = titleInput.current!.value;
    const descInputValue: string = descInput.current!.value;
    const idValue: number = Math.random();

    newTaskDataSubmiter(titleInputValue, descInputValue, idValue);

    addTaskToggleHandler();
  };

  return (
    <React.Fragment>
      {!addTaskToggle && (
        <button
          type="button"
          onClick={addTaskToggleHandler}
          className="add-task"
        >
          Add New Task
        </button>
      )}

      {addTaskToggle && (
        <form onSubmit={formSubmitHandler} className="new-task">
          <label>Title</label>
          <input id="title" ref={titleInput} required></input>
          <label>Description</label>
          <input id="description" ref={descInput} required></input>
          <button type="submit">Create Task</button>
          <button type="button" onClick={addTaskToggleHandler}>
            Discard
          </button>
        </form>
      )}
    </React.Fragment>
  );
};

export default NewTask;
