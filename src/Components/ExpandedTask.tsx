import React from "react";

import { useState, useRef } from "react";


import "./ExpandedTask.css";

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

const ExpandedTask: React.FC<{
  selectedTask: TaskModel;
  user: UserModel;
  currUserUpdater: (user: UserModel) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onEdit: (id: number, title: string, desc: string) => void;
}> = (props) => {

  const [isEditing, setisEditing] = useState<boolean>(false);

  const editedTitle = useRef<HTMLInputElement>(null);
  const editedDesc = useRef<HTMLTextAreaElement>(null);


  const editTaskToggler = function () {
    setisEditing(true);
  };

  const editFormSubmitHandler = (e: React.FormEvent) =>
  {
    e.preventDefault()
    const editedTitleValue: string = editedTitle.current!.value;
    const editedDescValue: string = editedDesc.current!.value;
    props.onEdit(props.selectedTask.id, editedTitleValue, editedDescValue)
    setisEditing(false)

  }







  return (
    <div className="expanded-task">

      {!isEditing && 
      <React.Fragment>
      <p>{props.selectedTask.title}</p>
      <p className="task-desc">{props.selectedTask.desc}</p>
      <p>Status: {props.selectedTask.status}</p>
      <div className="buttons-area">
      <button
        type="button"
        className="button-delete"
        onClick={(e: React.MouseEvent) => props.onDelete(props.selectedTask.id)}
      >
        Delete
      </button>

      <button
        type="button"
        className="button-edit"
        onClick={(e: React.MouseEvent) =>
          editTaskToggler()
        }
      >
        Edit
      </button>
      <button
        type="button"
        className="button-complete"
        onClick={(e: React.MouseEvent) =>{
        props.onComplete(props.selectedTask.id)}}
        >     
        Complete
      </button>
      </div>
      </React.Fragment>}

      {isEditing && (
        <form
          className="task-card-single"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault()
            const editedTitleValue: string = editedTitle.current!.value;
            const editedDescValue: string = editedDesc.current!.value;
            props.onEdit(props.selectedTask.id, editedTitleValue, editedDescValue)
            setisEditing(false)
          }}
        >
          <input defaultValue={props.selectedTask.title} ref={editedTitle}></input>
          <textarea defaultValue={props.selectedTask.desc} ref={editedDesc}></textarea>

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






    </div>
  );
};

export default ExpandedTask;
