import { Link } from "react-router-dom";
import OrdersView from "./OrdersView";

const CafeDashboardView = (props) => {
  const { loggedInUser, loggedInCafe } = props;

  return (
    <>
      <h2>{loggedInCafe.cafe_name}</h2>
      <Link to="/menu"><button>MENU</button></Link>
      <OrdersView loggedInUser={loggedInUser} loggedInCafe={loggedInCafe} />
    </>
  );
};

export default CafeDashboardView;
