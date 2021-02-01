import { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "./OrderTable";
import { Container, Row, Col, Input, Button, Form, Table } from 'reactstrap';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BsDashSquareFill } from 'react-icons/bs';

const OrdersView = (props) => {
  const { loggedInUser } = props;
  const [ orders, setOrders ] = useState([]);
  const [ pastOrders, setPastOrders ] = useState([]);
  const [ showPastOrders, setShowPastOrders ] = useState(false);


  useEffect(() => {
    getOrders("active");
  }, []);

  const getOrders = (type) => {
    switch (type) {
      case "active":
        if (loggedInUser.role === "user") {
          retrieveUserOrders();
        } else if (loggedInUser.role === "cafe") {
          retrieveCafeOrders();
        } else {
          retrieveAllOrders();
        };
        break;
      case "past":
        if (loggedInUser.role === "user") {
          retrieveUserOrders("past");
        } else if (loggedInUser.role === "cafe") {
          retrieveCafeOrders("past");
        } else {
          retrieveAllOrders("past");
        };
        break;
      default:
        break;
    };
  };

  const getPastOrders = (type) => {
    if (!showPastOrders && type) {
      getOrders("past");
      setShowPastOrders(true);
    } else if (showPastOrders && !type) {
      getOrders("past");
    } else {
      setShowPastOrders(false);
    };
  };

  const retrieveAllOrders = async (pastOrders) => {
    let url = "http://localhost:5000/orders";
    if (pastOrders) {
      url = "http://localhost:5000/orders/past";
    };
    const response = await axios.get(url);
    const allOrders = await response.data;
    pastOrders ? setPastOrders(allOrders) : setOrders(allOrders);
  };

  const retrieveUserOrders = async (pastOrders) => {
    let url = `http://localhost:5000/users/${loggedInUser._id}/orders`;
    if (pastOrders) {
      url = `http://localhost:5000/users/${loggedInUser._id}/orders/past`;
    };
    const response = await axios.get(url);
    const userOrders = response.data;
    pastOrders ? setPastOrders(userOrders) : setOrders(userOrders);
  };

  const retrieveCafeOrders = async (pastOrders) => {
    let url = `http://localhost:5000/cafes/${loggedInUser.cafe._id}/orders`;
    if (pastOrders) {
      url = `http://localhost:5000/cafes/${loggedInUser.cafe._id}/orders/past`;
    };
    const response = await axios.get(url);
    const cafeOrders = await response.data;
    pastOrders ? setPastOrders(cafeOrders) : setOrders(cafeOrders);
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">  
          <h1>Current Orders</h1>
          <OrderTable orders={orders} getOrders={getOrders} getPastOrders={getPastOrders} setOrders={setOrders} loggedInUser={loggedInUser} />
        </Row>
        <Row className="justify-content-center ">

            <h1 className="justify-content-center Cafe-Header-Margin">Past Orders</h1>
              <div className="Cafe-Dashboard-Expand Cafe-Header-Margin" >
                <BsFillPlusSquareFill onClick={() => getPastOrders(true)} />
          </div>
        </Row>
        <Row id="Past-Orders">
          {showPastOrders ? (
              <div>
                <OrderTable orders={pastOrders} />
              </div>
            ) : (<></>)}
        </Row>
       
      </Container>
    </>
  );
};

export default OrdersView;
