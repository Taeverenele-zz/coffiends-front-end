import { Link } from "react-router-dom";
import { Row,Table, Container, Button } from "reactstrap";
import axios from "axios";


const OrderTable = (props) => {
  const { orders, getOrders, getPastOrders, loggedInUser, setOrders } = props;

  const completeOrder = async (id) => {
    const response = await axios.put(`http://localhost:5000/orders/${id}`);
    const completedOrder = response.data;
    getOrders();
    setOrders();
    getPastOrders(false);
  };

  return (
    <>
   <Container> 
    <Row className="justify-content-center margin-add-top">
    </Row>
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
                    {(order.active && loggedInUser.role === "cafe") ? (
                      <td>
                         <Button onClick={() => completeOrder(order._id)}>Complete</Button>
                      </td>
                    ) : (<></>)
                    }
                  </tr>
                ))) : <></>}
              </tbody>
            </Table>
        </Row>
    </Container>
    </>
  );
};

export default OrderTable;




// <Row className="margin-add-top">
// <Table responsive>
// <thead>
// <tr>
// <th>Coffee</th>
// <th>Milk</th>
// <th>Sugar</th>
// <th>Name</th>
// <th>Phone</th>
// <th>Time</th>
// <th>Done</th>

// </tr>
// </thead>
// <tbody>
// <tr>
//
// </tr>
// <tr>
// <th scope="row">Long Black</th>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// </tr>
// <tr>
// <th scope="row">Espresso</th>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// </tr>
// </tbody>
// </Table>
// </Row>


// <Row className="justify-content-center margin-add-top">
// <h1>Past Orders</h1>
// <BsFillPlusSquareFill onClick={showOrders} className="align-self-center Dashboard-Margin-Left" / > 
// </Row>

// <Row className="Dashboard-Hide justify-content-center" id="Past-Orders">

// <BsDashSquareFill className="Admin-Button-Margin justify-content-center" onClick={hideOrders} />

// <Table responsive>
// <thead>
// <tr>
// <th>Coffee</th>
// <th>Milk</th>
// <th>Sugar</th>
// <th>Name</th>
// <th>Phone</th>
// <th>Time</th>
// <th>Done</th>

// </tr>
// </thead>
// <tbody>
// <tr>
// <th scope="row">Flat White</th>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// </tr>
// <tr>
// <th scope="row">Hot Chocolate</th>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// </tr>
// <tr>
// <th scope="row">Green Tea</th>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// <td>Table cell</td>
// </tr>
// </tbody>
// </Table>
// </Row>



// )
// };
