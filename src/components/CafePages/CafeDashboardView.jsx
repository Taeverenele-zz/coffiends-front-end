import { useContext } from "react";
import { Container } from "reactstrap";
import StateContext from "../../utils/store";
import OrdersView from "..//OrdersView";

const CafeDashboardView = () => {
  const { store } = useContext(StateContext);
  const { loggedInUser } = store;
  // check if there is a logged in user and if the user has a role 'cafe', only then render the 'OrdersView'
  return (
    <>
      {loggedInUser && loggedInUser.cafe ?
      (<>
        <Container fluid="true" className="Remove-padding-margin nav-color ">
          <h2 className=" text-center cafe-name ">{loggedInUser.cafe.cafe_name}</h2>
          <OrdersView />
        </Container>
      </>) : (
        <>
          <h1>You do not have permission to view this page</h1>
          <h5>Only cafe users can view this page.</h5>
        </>
      )}
    </>
  );
};

export default CafeDashboardView;
