import { useState, useEffect } from "react";
import { Row, Col, Table } from "reactstrap";
import axios from "axios";

const AllOrdersView = () => {
  const [ orders, setOrders ] = useState([]);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err.message));
  }, []);

  return (
    <>
      <h1>ALL ORDERS EVER</h1>
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
                  <th>Complete</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.cafe}</td>
                    <td>{order.user}</td>
                    <td>{Date(order.date)}</td>
                    <td>{String(order.active)}</td>
                    <td>{order.coffee}</td>
                    <td>{order.size}</td>
                    <td>{order.milk}</td>
                    <td>{order.sugar}</td>
                    <td>{order.pickup_time}</td>
                    <td>${order.total}</td>
                    <td>ORDER DONE</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
    </div>
    </>
  );
};

export default AllOrdersView;
