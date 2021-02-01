import { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "./OrderTable";

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
    let url = `http://localhost:5000/users/${loggedInUser._id}/orders`;
    if (pastOrders) {
      url = `http://localhost:5000/users/${loggedInUser._id}/orders/past`;
    };

    axios
      .get(url)
      .then((res) => {
        pastOrders ? setPastOrders(res.data) : setOrders(res.data);
      })
      .catch((err) => console.log(err))
  };

  const retrieveCafeOrders = async (pastOrders) => {
    let url = `http://localhost:5000/cafes/${loggedInUser.cafe._id}/orders`;
    if (pastOrders) {
      url = `http://localhost:5000/cafes/${loggedInUser.cafe._id}/orders/past`;
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
      <OrderTable orders={orders} getOrders={getOrders} getPastOrders={getPastOrders} loggedInUser={loggedInUser} />
      <button onClick={() => getPastOrders(true)}>Show Recent Completed Orders</button>
      {showPastOrders ? (
        <div>
          <h4>RECENT COMPLETED ORDERS</h4>
          <OrderTable orders={pastOrders} />
        </div>
      ) : (<></>)}
    </>
  );
};

export default OrdersView;
