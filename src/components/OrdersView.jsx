import { useState, useEffect } from "react";
import axios from "axios";
import OrderTable from "./OrderTable";

const OrdersView = (props) => {
  const { loggedInUser, userCafe } = props;
  const [ orders, setOrders ] = useState([]);
  const [ pastOrders, setPastOrders ] = useState([]);
  const [ showPastOrders, setShowPastOrders ] = useState(false);

  useEffect(() => {
    getActiveOrders();
  }, []);

  const getActiveOrders = () => {
    if (loggedInUser.role === "user") {
      retrieveUserActiveOrders();
    } else if (loggedInUser.role === "cafe") {
      retrieveCafeActiveOrders();
    } else {
      retrieveAllActiveOrders();
    };
  };

  const getPastRoleOrders = () => {
    if (loggedInUser.role === "user") {
      retrieveUserPastOrders();
    } else if (loggedInUser.role === "cafe") {
      retrieveCafePastOrders();
    } else {
      retrieveAllPastOrders();
    };
  };

  const getPastOrders = (type) => {
    if (!showPastOrders && type) {
      getPastRoleOrders();
      setShowPastOrders(true);
    } else if (showPastOrders && !type) {
      getPastRoleOrders();
    } else {
      setShowPastOrders(false);
    };
  };

  const retrieveAllActiveOrders = () => {
    axios
      .get("http://localhost:5000/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.log(err.message));
  };

  const retrieveUserActiveOrders = () => {
    if (loggedInUser.role === "user") {
      axios
      .get(`http://localhost:5000/users/${loggedInUser.id}/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err.message));
    };
  };

  const retrieveCafeActiveOrders = () => {
    if (loggedInUser.role === "cafe") {
      axios
      .get(`http://localhost:5000/cafes/${userCafe._id}/orders`)
      .then(res => setOrders(res.data))
      .catch(err => console.log(err.message));
    };
  };

  const retrieveAllPastOrders = () => {
    axios
      .get("http://localhost:5000/orders/past")
      .then(res => setPastOrders(res.data))
      .catch(err => console.log(err.message));
  };

  const retrieveUserPastOrders = () => {
    if (loggedInUser.role === "user") {
      axios
      .get(`http://localhost:5000/users/${loggedInUser.id}/orders/past`)
      .then(res => setPastOrders(res.data))
      .catch(err => console.log(err.message));
    };
  };

  const retrieveCafePastOrders = () => {
    if (loggedInUser.role === "cafe") {
      axios
      .get(`http://localhost:5000/cafes/${userCafe._id}/orders/past`)
      .then(res => setPastOrders(res.data))
      .catch(err => console.log(err.message));
    };
  };

  return (
    <>
      <OrderTable orders={orders} getActiveOrders={getActiveOrders} getPastOrders={getPastOrders} loggedInUser={loggedInUser} />
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
