import "./StockExchangeCard.css";
import SquareCard from "../UI/SquareCard";

function StockExchangeCard(props) {
  return (
    <SquareCard>
      <h4>StockExchange</h4>
      <p>{props.user.occupation}</p>
    </SquareCard>
  );
}

export default StockExchangeCard;
