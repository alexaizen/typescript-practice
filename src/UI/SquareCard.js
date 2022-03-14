import "./SquareCard.css";

function SquareCard(props) {
  return <div className="square-card">{props.children}</div>;
}

export default SquareCard;
