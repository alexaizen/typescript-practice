import React, { useState } from "react";
import "./Tasks.css";
import NavBar from "../NavBar";
import MainAreaMediumThree from "../UI/MainAreaMediumThree";
import RightSidebar from "../UI/RightSidebar";
import StatusBar from "../StatusBar";
import NewTaskForm from "../Components/NewTaskForm";
// import TaskCard from "../UI/TaskCard";
import TaskListWrapper from "../Components/TaskListWrapper";

function Tasks(props) {
  const taskList = props.user.tasks;

  const [taskListState, setTaskListState] = useState(taskList);
  const [addingTaskToggle, setaddingTaskToggl] = useState(false);
  const [ taskAddedSuccessMsg, setTaskAddedSuccessMsg] = useState(false)

  const successMessage = function () {
    setTaskAddedSuccessMsg("Task added successfully")
    setTimeout(()=>setTaskAddedSuccessMsg(false), 4000)
  }

  const newTaskHandler = function (task) {
    setTaskListState((prevState) => [task, ...prevState]);
    console.log(taskListState);
    addTaskToggler();
    successMessage()
  };

  const addTaskToggler = function () {
    setaddingTaskToggl((prevState) => !prevState);
  };

  const deleteTaskHandler = function (id) {
    const newList = taskListState.filter((d) => d.id !== id);
    setTaskListState(newList);
    // Adding to currently loaded user
    props.dataUpdater(
      {
        tasks: newList,
      },
      props.user.id
    );

    // Adding to database
    fetch(
      `https://react-1bbaa-default-rtdb.europe-west1.firebasedatabase.app/users/${props.user.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          ...props.user,
          tasks: newList,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log("New task deleted from database");
        return res.json().then((data) => {
          console.log(data.tasks);
        });
      } else {
        return res.json().then((data) => console.log("error" + data));
      }
    });

    // END of fetch function
  };

  // Task completed function
  const completeTask = function (id) {
    // Updating local taskListState value
    setTaskListState((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return {
            id: id,
            title: item.title,
            desc: item.desc,
            status: "completed",
          };
        } else {
          return item;
        }
      });
    });
    // End of updating local taskListstate value
    console.log(taskListState);
  };
  // End of task complete function

  // Edit task function
  const editTaskUpdaterHandler = function (id, title, desc) {
    setTaskListState((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return {
            id: id,
            title: title,
            desc: desc,
            status: item.status,
          };
        } else {
          return item;
        }
      });
    });
  };
  // End of edit taks local updater function

  return (
    <React.Fragment>
      <NavBar user={props.user}>
        <h2>Tasks</h2>
      </NavBar>
      <MainAreaMediumThree>
        <TaskListWrapper
          user={props.user}
          tasks={taskListState}
          delete={deleteTaskHandler}
          dataUpdater={props.dataUpdater}
          onComplete={completeTask}
          onEdit={editTaskUpdaterHandler}
          userUpdater={props.userUpdater}
        />
      </MainAreaMediumThree>
      <RightSidebar>
        {!addingTaskToggle && (
          <React.Fragment>
          <div className="add-task">
            <button type="button" onClick={addTaskToggler}>
              Add Task
            </button>
            
          </div>
          {taskAddedSuccessMsg && <p className="add-task-success" >{taskAddedSuccessMsg}</p>}
          </React.Fragment>
        )}
        {addingTaskToggle && (
          <NewTaskForm
            user={props.user}
            onAdd={newTaskHandler}
            dataUpdater={props.dataUpdater}
            onTaskToggle={addTaskToggler}
          ></NewTaskForm>
        )}
      </RightSidebar>
      <StatusBar></StatusBar>
    </React.Fragment>
  );
}

export default Tasks;
