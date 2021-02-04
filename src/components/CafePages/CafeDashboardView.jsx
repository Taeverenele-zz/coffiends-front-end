import { useContext } from "react";
import { Container } from "reactstrap";
import StateContext from "../utils/store";
import OrdersView from "./OrdersView";

const CafeDashboardView = () => {
  const { store } = useContext(StateContext);
  const { loggedInUser } = store;

  return (
    loggedInUser && loggedInUser.cafe ?
    (<>
      <Container>
        <h2>{loggedInUser.cafe.cafe_name}</h2>
        <OrdersView />
      </Container>
    </>) : (
      <>
        <h1>You do not have permission to view this page</h1>
        <h5>Only cafe users can view this page.</h5>
      </>
    )
  );
};

export default CafeDashboardView;
