import { Link } from "react-router-dom";
import axios from "axios";
import OrdersView from "./OrdersView";

const CafeDashboardView = (props) => {
  const { loggedInUser, userCafe, setMenu } = props;

  const getMenuItems = () => {
    axios
      .get(`http://localhost:5000/cafes/${userCafe._id}/menu`)
      .then((res) => setMenu(res.data))
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <h2>{userCafe.cafe_name}</h2>
      <Link to="/menu"><button onClick={() => getMenuItems()}>MENU</button></Link>
      <OrdersView loggedInUser={loggedInUser} userCafe={userCafe} />
    </>
  );
};

export default CafeDashboardView;
