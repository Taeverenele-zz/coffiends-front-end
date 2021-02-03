import OrdersView from "./OrdersView";
import { Container } from "reactstrap";

const CafeDashboardView = (props) => {
  const { loggedInUser } = props;

  return (
    loggedInUser && loggedInUser.cafe ?
    (<>
      <Container>
        <h2>{loggedInUser.cafe.cafe_name}</h2>
        <OrdersView loggedInUser={loggedInUser} />
      </Container>
    </>) : (<><h1>Must be cafe</h1></>)
  );
};

export default CafeDashboardView;
