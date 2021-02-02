import { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "./OrderTable";
import { Container, Row, Col, Input, Button, Form, Table } from 'reactstrap';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BsDashSquareFill } from 'react-icons/bs';

const OrdersView = (props) => {
  // const { getUserSession } = props;
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [ orders, setOrders ] = useState([]);
  const [ pastOrders, setPastOrders ] = useState([]);
  const [ showPastOrders, setShowPastOrders ] = useState(false);

  useEffect(() => {
    getOrders("active");
  }, []);

  const getUserSession = async () => {
    const response = await fetch("http://localhost:5000/users/check", { credentials: "include" })
    const logged = await response.json();
    console.log(logged)
    setLoggedInUser(logged)
    return logged
  }

  const getOrders = async (type) => {
    const user = await getUserSession();
    switch (type) {
      case "active":
        if (user.role === "user") {
          retrieveUserOrders();
        } else if (user.role === "cafe") {
          retrieveCafeOrders();
        } else {
          retrieveAllOrders();
        };
        break;
      case "past":
        if (user.role === "user") {
          retrieveUserOrders("past");
        } else if (user.role === "cafe") {
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

  const retrieveAllOrders = (pastOrders) => {
    let url = "http://localhost:5000/orders";
    if (pastOrders) {
      url = "http://localhost:5000/orders/past";
    };
    axios
      .get(url)
      .then((res) => {
        pastOrders ? setPastOrders(res.data) : setOrders(res.data);
      })
      .catch((err) => console.log(err))
  };

  const retrieveUserOrders = async (pastOrders) => {
    const user = await getUserSession();
    let url = `http://localhost:5000/users/${user._id}/orders`;
    if (pastOrders) {
      url = `http://localhost:5000/users/${user._id}/orders/past`;
    };
    const response = await axios.get(url);
    const userOrders = response.data;
    pastOrders ? setPastOrders(userOrders) : setOrders(userOrders);
  };

  const retrieveCafeOrders = async (pastOrders) => {
    const user = await getUserSession();
    let url = `http://localhost:5000/cafes/${user.cafe._id}/orders`;
    if (pastOrders) {
      url = `http://localhost:5000/cafes/${user.cafe._id}/orders/past`;
    };

    axios
      .get(url)
      .then((res) => {
        pastOrders ? setPastOrders(res.data) : setOrders(res.data);
      })
      .catch((err) => console.log(err))
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
