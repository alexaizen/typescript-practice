import "./DashCard.css";

const Dashcard: React.FC<{}> = (props) => {
  return <div className="dash-card">{props.children}</div>;
};

export default Dashcard;
