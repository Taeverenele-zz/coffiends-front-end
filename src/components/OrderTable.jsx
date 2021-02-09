import { useContext } from "react";
import axios from "axios";
import { Row,Table, Container, Button } from "reactstrap";
import StateContext from "../utils/store";

const OrderTable = (props) => {
  const { orders, pastOrderToggle, setCompleteOrder } = props;

  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser } = store;

  const setOrderToCompleted = (id) => {
    axios.put(`${process.env.REACT_APP_BACK_END_URL}/orders/${id}`)
      .then(() => {
        pastOrderToggle(false);
        setCompleteOrder(true);
      })
      .catch(() => dispatch({ type: "setFlashMessage", data: "Order was not completed successfully" }));
  };

  return (
    <>
      <Container> 
        <Row className="justify-content-center margin-add-top"></Row>
          <Table responsive className="table-background ">
            <thead>
              <tr className="text-center">
                {loggedInUser.role === "user" ? <th>Cafe</th> : <></>}
                {loggedInUser.role === "cafe" ? <th>User</th> : <></>}
                <th>Coffee</th>
                <th>Size</th>
                <th>Milk</th>
                <th>Sugar</th>
                <th>Pickup Time</th>
                {loggedInUser.role === 'cafe' ? <th>COMPLETE</th> : <></>}
              </tr>
            </thead>
         
            <tbody>
              {orders ? (orders.map((order) => (
                <tr className="text-center" key={order._id}>
                  {loggedInUser.role === "user" ? <th>{order.cafe.cafe_name}</th> : <></>}
                  {loggedInUser.role === "cafe" ? <td>{order.user.user_name}</td> : <></>}
                  <td>{order.coffee}</td>
                  <td>{order.size}</td>
                  <td>{order.milk}</td>
                  <td>{order.sugar}</td>
                  <td>{order.pickup_time}</td>
                  {(loggedInUser && order.active && loggedInUser.role === "cafe") ? (
                    <td>
                      <Button onClick={() => setOrderToCompleted(order._id)}>Complete</Button>
                    </td>
                  ) : (<></>)}
                </tr>
              ))) : (<></>)}
            </tbody>
          </Table>
      </Container>
    </>
  );
};

export default OrderTable;