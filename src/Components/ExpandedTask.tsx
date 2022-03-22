import React from "react";
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
  return (
    <div className="expanded-task">
      <p>{props.selectedTask.title}</p>
      <p>{props.selectedTask.desc}</p>
      <p>Status: {props.selectedTask.status}</p>
      <button
        type="button"
        onClick={(e: React.MouseEvent) => props.onDelete(props.selectedTask.id)}
      >
        Delete
      </button>
      <button
        type="button"
        onClick={(e: React.MouseEvent) =>
          props.onComplete(props.selectedTask.id)
        }
      >
        Complete
      </button>
      <button
        type="button"
        onClick={(e: React.MouseEvent) =>
          props.onEdit(props.selectedTask.id, "title edited", "desc edited")
        }
      >
        Edit
      </button>
    </div>
  );
};

export default ExpandedTask;
