import "./SingleTaskCard.css";

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

const SingleTaskCard: React.FC<{
  title: string;
  desc: string;
  id: number;
  status: string;
  user: UserModel;
  selectedTaskHandler: (id: number) => void;
}> = (props) => {
  // const selectedTaskPicker = (
  //   event: React.MouseEventHandler<HTMLLIElement>,
  //   id: number
  // ) => {
  //   props.selectedTaskHandler(id);
  // };

  return (
    <li
      className="single-task-card"
      onClick={(e: React.MouseEvent) => {
        props.selectedTaskHandler(props.id);
      }}
    >
      <p>{props.title}</p>
    </li>
  );
};

export default SingleTaskCard;
