import React, { useRef, useState } from "react";

import "./NewTask.css";

const NewTask: React.FC<{
  onAddTask: (title: string, desc: string) => void;
}> = (props) => {
  const titleInput = useRef<HTMLInputElement>(null);
  const descInput = useRef<HTMLInputElement>(null);
  const [addTaskToggle, setaddTaskToggle] = useState<boolean>(false);

  const addTaskToggleHandler = () => {
    setaddTaskToggle((prevState) => !prevState);
  };

  const formSubmitHandler = function (e: React.FormEvent) {
    e.preventDefault();
    const titleInputValue: string = titleInput.current!.value;
    const descInputValue: string = descInput.current!.value;
    props.onAddTask(titleInputValue, descInputValue);
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
