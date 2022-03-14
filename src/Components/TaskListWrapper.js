import React from "react";

import TaskCard from "../UI/TaskCard";

function TaskListWrapper(props) {
  return (
    <React.Fragment>
      {props.tasks.map((taskitem) => (
        <TaskCard
          key={taskitem.id}
          id={taskitem.id}
          title={taskitem.title}
          desc={taskitem.desc}
          status={taskitem.status}
          tasks={props.tasks}
          delete={props.delete}
          user={props.user}
          dataUpdater={props.dataUpdater}
          onComplete={props.onComplete}
          userUpdater={props.userUpdater}
          onEdit={props.onEdit}
        />
      ))}
    </React.Fragment>
  );
}

export default TaskListWrapper;
