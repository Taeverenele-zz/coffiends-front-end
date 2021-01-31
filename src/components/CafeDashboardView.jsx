import { Link } from "react-router-dom";
import axios from "axios";
import OrdersView from "./OrdersView";
// cab022014@coderacademy.edu.au
const CafeDashboardView = (props) => {
  const { loggedInUser, loggedInCafe } = props;

  return (
    <>
      <h2>{loggedInCafe.cafe_name}</h2>
      {/* <Link to="/menu"><button onClick={() => getMenuItems()}>MENU</button></Link> */}
      <Link to="/menu"><button>MENU</button></Link>
      <OrdersView loggedInUser={loggedInUser} loggedInCafe={loggedInCafe} />
    </>
  );
};

export default CafeDashboardView;
