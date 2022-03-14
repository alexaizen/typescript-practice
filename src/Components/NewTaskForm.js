import React, { useRef, useState } from "react";

import useTest from "../Hooks/useTest.js"

import "./NewTaskForm.css";


function NewTaskForm(props) {

  const [ addTaskValidation, setAddTaskValidation ] = useState(null);

  const addTaskValidationHandler = function (message) {
    setAddTaskValidation(message)
    setTimeout(()=>setAddTaskValidation(null), 5000)
  }
  
  const customHook = useTest("iz poziva custom hook")
  
  // Form submit handler with validation
  const formSubmitHandler = function (e) {
    e.preventDefault();
    const title = taskTitle.current.value;
    const desc = taskDesc.current.value;
    const id = Math.random();
    
    if(title.trim().length === 0) {
      console.log(customHook)
      console.log("Title cannot be empty")
      addTaskValidationHandler("Title cannot be empty")
      return
    }
    if(title.length > 25) {
      console.log("Title cannot be empty")
      addTaskValidationHandler("Title too long, it can't be longer than 25 characters")
      return
    }
    if(desc.trim().length === 0) {
      addTaskValidationHandler("Description cannot be empty")
      console.log("Description cannot be empty")
      return
    }
    newTaskDataSubmiter(title, desc, id)        
    
  };

  const newTaskDataSubmiter = function (title, desc,id) {
    props.onAdd({
      id: id,
      title: title,
      desc: desc,
      status: "active",
    });

    // Adding to currently loaded user
    props.dataUpdater(
      {
        tasks: [
          ...props.user.tasks,
          { id: id, title: title, desc: desc, status: "active" },
        ],
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
  }

  const taskTitle = useRef();
  const taskDesc = useRef();

  return (
    <React.Fragment>
      <form className="new-task" onSubmit={formSubmitHandler}>
        
        <input
          ref={taskTitle}
          id="task-title"
          type="text"
          placeholder="enter title"
        ></input>

        <textarea
          ref={taskDesc}
          id="task-desc"
          placeholder="enter task description"
        ></textarea>
        <button type="submit">Add Task</button>
      </form>
      <button type="text" className="cancel" onClick={props.onTaskToggle}>
        Cancel
      </button>
      {addTaskValidation && <p className="validation-error-box" >{addTaskValidation}</p>}
    </React.Fragment>
  );
}

export default NewTaskForm;
