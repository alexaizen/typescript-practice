import React from "react";

import { useState } from "react";
import NewTask from "../Components/NewTask";
import SingleTaskCard from "../Components/SingleTaskCard";

import TitleBar from "../Components/TitleBar";
import PageContentWrapper from "../UI/PageContentWrapper";
import "./Tasks.css";

const Tasks = () => {
  const [tasks, setTasks] = useState<{ title: string; desc: string }[]>([]);

  const updateTasksList = (title: string, desc: string) => {
    setTasks((prevState) => [...prevState, { title: title, desc: desc }]);
    console.log(tasks);
  };

  return (
    <PageContentWrapper>
      <TitleBar title={"Tasks"} />

      <ul className="content-wrapper">
        <NewTask onAddTask={updateTasksList}></NewTask>

        {tasks.map((task) => (
          <SingleTaskCard title={task.title} desc={task.desc} />
        ))}
      </ul>
    </PageContentWrapper>
  );
};

export default Tasks;
