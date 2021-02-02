import { Link } from "react-router-dom";
import OrdersView from "./OrdersView";
import { Container } from "reactstrap";

const CafeDashboardView = (props) => {
  const { loggedInUser } = props;

  return (
    loggedInUser && loggedInUser.cafe ?
    (<>
      <Container>
        <h2>{loggedInUser.cafe.cafe_name}</h2>
        <Link to="/menu"><button>MENU</button></Link>
        <OrdersView loggedInUser={loggedInUser} />
      </Container>
    </>) : (<><h1>Must be cafe</h1></>)
  );
};

export default CafeDashboardView;
