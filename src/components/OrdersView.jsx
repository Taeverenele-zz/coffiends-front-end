import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row } from "reactstrap";
import { BsFillPlusSquareFill } from "react-icons/bs";
import OrderTable from "./OrderTable";
import StateContext from "../utils/store";

const OrdersView = () => {
  const [ orders, setOrders ] = useState([]);
  const [ pastOrders, setPastOrders ] = useState([]);
  const [ showPastOrders, setShowPastOrders ] = useState(false);

  const { store } = useContext(StateContext);
  const { loggedInUser } = store;

  useEffect(() => {
    if (loggedInUser) {
      getOrders("active");
    }
  }, [ loggedInUser ]);

  const getOrders = (type) => {
    switch (type) {
      case "active":
        if (loggedInUser.role === "user") {
          retrieveUserOrders();
        } else if (loggedInUser.role === "cafe") {
          retrieveCafeOrders();
        } else {
          retrieveAllOrders();
        }
        break;
      case "past":
        if (loggedInUser.role === "user") {
          retrieveUserOrders("past");
        } else if (loggedInUser.role === "cafe") {
          retrieveCafeOrders("past");
        } else {
          retrieveAllOrders("past");
        }
        break;
      default:
        break;
    }
  };

  const getPastOrders = (type) => {
    if (!showPastOrders && type) {
      getOrders("past");
      setShowPastOrders(true);
    } else if (showPastOrders && !type) {
      getOrders("past");
    } else {
      setShowPastOrders(false);
    }
  };

  const retrieveAllOrders = (pastOrders) => {
    let url = `${process.env.REACT_APP_BACK_END_URL}/orders`;
    if (pastOrders) {
      url = `${process.env.REACT_APP_BACK_END_URL}/orders/past`;
    }

    axios
      .get(url)
      .then((res) => {
        pastOrders ? setPastOrders(res.data) : setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const retrieveUserOrders = async (pastOrders) => {
    let url = `${process.env.REACT_APP_BACK_END_URL}/users/${loggedInUser._id}/orders`;
    if (pastOrders) {
      url = `${process.env.REACT_APP_BACK_END_URL}/users/${loggedInUser._id}/orders/past`;
    };

    axios
      .get(url)
      .then((res) => {
        pastOrders ? setPastOrders(res.data) : setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const retrieveCafeOrders = (pastOrders) => {
    let url = `${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/orders`;
    if (pastOrders) {
      url = `${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/orders/past`;
    }

    axios
      .get(url)
      .then((res) => {
        pastOrders ? setPastOrders(res.data) : setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Container fluid="true" className="background full-height" >
        <Row className="justify-content-center">
          <h1 className="heading-colors margin-add-top">Current Orders</h1>
        </Row>
        <Row>
          <OrderTable orders={orders} getOrders={getOrders} getPastOrders={getPastOrders} setOrders={setOrders}  />
        </Row>
        <Row className="justify-content-center  ">
          <h1 className="heading-colors Cafe-Header-Margin">
            Past Orders
          </h1>
          <div className="Cafe-Dashboard-Expand Cafe-Header-Margin ">
            <BsFillPlusSquareFill className="plusIcon" onClick={() => getPastOrders(true)} />
          </div>
        </Row>
        <Row id="Past-Orders" className="justify-content-center">
          {showPastOrders ? (
            <div >
              <OrderTable orders={pastOrders} />
            </div>
          ) : (<></>)}
        </Row>
      </Container>
    </>
  );
};

export default OrdersView;
