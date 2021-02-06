import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row } from "reactstrap";
import { BsFillPlusSquareFill } from "react-icons/bs";
import OrderTable from "./OrderTable";
import StateContext from "../utils/store";

const OrdersView = () => {
  const [ orders, setOrders ] = useState(null);
  const [ pastOrders, setPastOrders ] = useState(null);
  const [ showPastOrders, setShowPastOrders ] = useState(false);
  const [ completeOrder, setCompleteOrder ] = useState(false);

  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser } = store;

  useEffect(() => {
    if (loggedInUser) {
      let url = "";
      switch (loggedInUser.role) {
        case "user":
          url = `${process.env.REACT_APP_BACK_END_URL}/users/${loggedInUser._id}/orders`
          break;
        case "cafe":
          url = `${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/orders`
          break;
        default:
          break;
      };
      axios.get(url)
        .then((res) => setOrders(res.data))
        .catch(() => dispatch({ type: "setFlashMessage", data: "Could not retrieve order data" }));
    };
    if (completeOrder) {
      setCompleteOrder(false);
    };
  }, [ loggedInUser, dispatch, completeOrder ]);

  const getPastOrders = () => {
    let url = "";
    switch (loggedInUser.role) {
      case "user":
        url = `${process.env.REACT_APP_BACK_END_URL}/users/${loggedInUser._id}/orders/past`
        break;
      case "cafe":
        url = `${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/orders/past`
        break;
      default:
        break; 
    };
    axios.get(url)
        .then((res) => setPastOrders(res.data))
        .catch(() => dispatch({ type: "setFlashMessage", data: "Could not retrieve order data" }));
  };

  const pastOrderToggle = (show) => {
    if (!showPastOrders && show) {
      getPastOrders();
      setShowPastOrders(true);
    } else if (showPastOrders && !show) {
      getPastOrders();
    } else {
      setShowPastOrders(false);
    };
  };

  return (
    <>
      <Container fluid="true" className="background full-height" >
        {orders === [] ? (
          <Row>
            <OrderTable orders={orders} pastOrderToggle={pastOrderToggle} setCompleteOrder={setCompleteOrder} />
          </Row>
        ) : (
          <>
          <Row className="justify-content-center">
            <h4 className="heading-colors Cafe-Header-Margin">No active orders</h4>
          </Row>
          </>
        )}
        <Row className="justify-content-center">
          <h1 className="heading-colors Cafe-Header-Margin">
            Past Orders
          </h1>
          <div className="Cafe-Dashboard-Expand Cafe-Header-Margin ">
            <BsFillPlusSquareFill className="plusIcon" onClick={() => pastOrderToggle(true)} />
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
