import React from "react";

import { useState } from "react";
import ExpandedTask from "../Components/ExpandedTask";
import NewTask from "../Components/NewTask";
import SingleTaskCard from "../Components/SingleTaskCard";

import TitleBar from "../Components/TitleBar";
import PageContentWrapper from "../UI/PageContentWrapper";
import "./Tasks.css";

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

const Tasks: React.FC<{
  user: UserModel;
  currUserUpdater: (user: UserModel) => void;
}> = (props) => {
  const [tasks, setTasks] = useState<TaskModel[]>(props.user.tasks);
  const [selectedTask, setSelectedTask] = useState<TaskModel>({
    title: "no title",
    desc: "no desc",
    id: -1,
    status: "unknown",
  });

  const selectedTaskHandler = (id: number) => {
    const choosenTask = tasks.find((task) => task.id === id);
    if (typeof choosenTask !== "undefined") {
      setSelectedTask(choosenTask);
    }
  };

  const updateTasksList = (task: TaskModel) => {
    setTasks((prevState) => [task, ...prevState]);
    console.log(tasks);
  };

  // Delete task handler

  const deleteTaskHandler = function (id: number) {
    const newList = tasks.filter((d) => d.id !== id);

    // updating tasks list in Tasks component
    setTasks(newList);
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
      tasks: newList,
    });

    // Adding to database
    fetch(
      `https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
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
          tasks: newList,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("Task deleted from database");
        return res.json().then((data) => {
          console.log(data.tasks);
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });

    // END of fetch function
  };

  // Complete task handler

  const completeTaskHandler = function (id: number) {
    // Updating local taskListState value
    const newList = tasks.map((u) => {
      return u.id === id
        ? { title: u.title, id: u.id, desc: u.desc, status: "completed" }
        : u;
    });

    // updating tasks list in Tasks component
    setTasks(newList);
    // End of updating local taskListstate value

    const updatedUser = {
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
      tasks: newList,
    };

    // Updating currently loaded user
    props.currUserUpdater(updatedUser);

    // Updating user data in database
    fetch(
      `https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
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
          tasks: newList,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("Task completed in database");
        return res.json().then((data) => {
          console.log(data.tasks);
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });
    // End of database updating

    // selectedTaskHandler(id);
  };
  // End of task complete function

  // Edit task function
  const editTaskHandler = function (id: number, title: string, desc: string) {
    const newList = tasks.map((u) => {
      return u.id === id
        ? {
            id: u.id,
            title: title,
            desc: desc,
            status: u.status,
          }
        : u;
    });
    // updating tasks list in Tasks component
    setTasks(newList);
    // End of updating local taskListstate value

    const updatedUser = {
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
      tasks: newList,
    };

    // Updating currently loaded user
    props.currUserUpdater(updatedUser);

    // Updating user data in database
    fetch(
      `https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
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
          tasks: newList,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("Task edited in database");
        return res.json().then((data) => {
          console.log(data.tasks);
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });
    // End of database updating
  };

  return (
    <PageContentWrapper>
      <TitleBar title={"Tasks"} />

      <ul className="content-wrapper">
        <NewTask
          onAddTask={updateTasksList}
          user={props.user}
          currUserUpdater={props.currUserUpdater}
        ></NewTask>

        {tasks.map((task) => (
          <SingleTaskCard
            title={task.title}
            desc={task.desc}
            key={task.id}
            id={task.id}
            status={task.status}
            // delete={props.delete}
            user={props.user}
            selectedTaskHandler={selectedTaskHandler}
            // dataUpdater={props.dataUpdater}
            // onComplete={props.onComplete}
            // userUpdater={props.userUpdater}
            // onEdit={props.onEdit}
          />
        ))}
      </ul>
      <ExpandedTask
        selectedTask={selectedTask}
        user={props.user}
        currUserUpdater={props.currUserUpdater}
        onDelete={deleteTaskHandler}
        onComplete={completeTaskHandler}
        onEdit={editTaskHandler}
      />
    </PageContentWrapper>
  );
};

export default Tasks;
