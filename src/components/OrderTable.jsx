import { Link } from "react-router-dom";
import { Row, Col, Table } from "reactstrap";
import axios from "axios";

const OrderTable = (props) => {
  const { orders, getOrders, getPastOrders, loggedInUser } = props;

  const completeOrder = (id) => {
    axios
      .put(`http://localhost:5000/orders/${id}`)
      .then((res) => {
        console.log(res.data);
        getOrders("active");
        getPastOrders(false);
      })
  };

  return (
    <>
      <div className="mt-4">
        <Row>
          <Col>
            <Table hover>
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
                </tr>
              </thead>
              <tbody>
                {orders ? (orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.cafe.cafe_name}</td>
                    <td>{order.user.user_name}</td>
                    <td>{new Date(order.order_date).toLocaleString("en-Au", {timeZone: "Australia/Brisbane"})}</td>
                    <td>{String(order.active)}</td>
                    <td>{order.coffee}</td>
                    <td>{order.size}</td>
                    <td>{order.milk}</td>
                    <td>{order.sugar}</td>
                    <td>{order.pickup_time}</td>
                    <td>${order.total.toFixed(2)}</td>
                    {(order.active && loggedInUser.role === "cafe") ? (
                      <td>
                        <Link to="/dashboard" onClick={() => completeOrder(order._id)}>COMPLETE</Link>
                      </td>
                    ) : (<></>)
                    }
                  </tr>
                ))) : <></>}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderTable;
