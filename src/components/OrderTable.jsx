import { useContext } from "react";
import axios from "axios";
import { Row,Table, Container, Button } from "reactstrap";
import StateContext from "../utils/store";

const OrderTable = (props) => {
  const { orders, getOrders, getPastOrders } = props;

  const { store } = useContext(StateContext);
  const { loggedInUser } = store;

  const completeOrder = (id) => {
    axios
      .put(`http://localhost:5000/orders/${id}`)
      .then(() => {
        getOrders("active");
        getPastOrders(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container> 
        <Row className="justify-content-center margin-add-top"></Row>
        <Row>
          <Table responsive>
            <thead>
              <tr>
                <th>Cafe</th>
                <th>User</th>
                <th>Order Date</th>
                <th>Active?</th>
                <th>Coffee</th>
                <th>Size</th>
                <th>Milk</th>
                <th>Sugar</th>
                <th>Pickup Time</th>
                <th>Total</th>
                <th>COMPLETE</th>
              </tr>
            </thead>
            <tbody>
              {orders ? (orders.map((order) => (
                <tr key={order._id}>
                  <th>{order.cafe.cafe_name}</th>
                  <td>{order.user.user_name}</td>
                  <td>{new Date(order.order_date).toLocaleString("en-Au", {timeZone: "Australia/Brisbane"})}</td>
                  <td>{String(order.active)}</td>
                  <td>{order.coffee}</td>
                  <td>{order.size}</td>
                  <td>{order.milk}</td>
                  <td>{order.sugar}</td>
                  <td>{order.pickup_time}</td>
                  <td>${order.total.toFixed(2)}</td>
                  {(loggedInUser && order.active && loggedInUser.role === "cafe") ? (
                    <td>
                      <Button onClick={() => completeOrder(order._id)}>Complete</Button>
                    </td>
                  ) : (<></>)}
                </tr>
              ))) : (<></>)}
            </tbody>
          </Table>
        </Row>
      </Container>
    </>
  );
};

export default OrderTable;
