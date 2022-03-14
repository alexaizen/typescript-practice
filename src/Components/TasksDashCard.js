import "./TasksDashCard.css";
import SquareCard from "../UI/SquareCard";

function TasksDashCard(props) {

  const tasksCount = props.user.tasks.length;
  const activeTasksCount =props.user.tasks.filter((task)=> task.status === "active").length
  const completedTasksCount =props.user.tasks.filter((task)=> task.status === "completed").length
  console.log(activeTasksCount)

  
  return (

    

    <SquareCard>
      <h4>Tasks </h4>        
      <span className="tasks-preview"><img src="/Assets/fire.png" alt="active status"  height="28px"/><p>Active: </p><p className="tasks-preview-count">{activeTasksCount}</p></span>
      <span className="tasks-preview"><img src="/Assets/plant.png" alt="completed status"  height="28px" /><p>Completed: </p><p className="tasks-preview-count">{completedTasksCount}</p></span>
      <span className="tasks-preview"><img src="/Assets/water.png" alt="total status"  height="28px" /><p>Total: </p><p className="tasks-preview-count">{tasksCount}</p></span>
    </SquareCard>
  );
}

export default TasksDashCard;
