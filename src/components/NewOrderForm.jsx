import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StripeForm from "./StripeForm";

const NewOrderForm = (props) => {
  const { userCoffee, cafe, loggedInUser } = props;
  const [ size, setSize ] = useState("Regular");
  const [ milk, setMilk ] = useState("Regular Milk");
  const [ sugar, setSugar ] = useState(0);

  const [ orderDetails, setOrderDetails ] = useState({
      cafe: cafe._id,
      user: loggedInUser._id,
      coffee: userCoffee.name,
      size: "Regular",
      milk: "Regular",
      sugar: 0,
      pickup_time: "",
      total: userCoffee.price,
      email: loggedInUser.username,
  });

  useEffect(() => {
    let time = new Date().getTime();
    let date = new Date(time);
    let hr = String(date.getHours());
    let min = String(date.getMinutes());
    if (hr.length < 2) {
      hr = "0" + hr;
    };
    if (min.length < 2) {
      min = "0" + min;
    };
    if (userCoffee.name === "Espresso" || userCoffee.name === "Long Black") {
      setOrderDetails({ ...orderDetails, milk: "No milk" })
    };
    setOrderDetails({ ...orderDetails, pickup_time: `${hr}:${min}` });
  }, []);

  const handleSize = (event) => {
    setSize(event.target.value);
    if (event.target.value === "Large") {
      setOrderDetails({ ...orderDetails, total: userCoffee.price + 0.5 });
    } else if (event.target.value === "Small") {
      setOrderDetails({ ...orderDetails, total: userCoffee.price - 0.5 });
    } else if (event.target.value === "Regular") {
      setOrderDetails({ ...orderDetails, total: userCoffee.price });
    };
  };

  const handleMilk = (event) => {
    setMilk(event.target.value);
    setOrderDetails({ ...orderDetails, milk: event.target.value });
  };

  const handleSugar = (event) => {
    setSugar(event.target.value);
    setOrderDetails({ ...orderDetails, sugar: event.target.value });
  };

  const handlePickupTime = (event) => {
    let time = new Date().getTime();
    if (event.target.value === "10") {
      time = time + 600000;
    } else if (event.target.value === "20") {
      time = time + 1200000;
    } else if (event.target.value === "30") {
      time = time + 1800000;
    };
    let date = new Date(time);
    let hr = String(date.getHours());
    let min = String(date.getMinutes());
    if (hr.length < 2) {
      hr = "0" + hr;
    };
    if (min.length < 2) {
      min = "0" + min;
    };
    setOrderDetails({ ...orderDetails, pickup_time: `${hr}:${min}` });
  };

  return (
    <>
      <button><Link to="/map">Cancel</Link></button>
      <h3>{cafe.cafe_name}</h3>
      <h4>{userCoffee.name}</h4>
      <form>
        <div>
          <label>Size: </label>
          <select value={size} onChange={handleSize}>
            <option value="Regular">Regular</option>
            {userCoffee.name === "Espresso" ? (
              <></>
            ) : (
              <>
                <option value="Small">Small -$0.50</option>
                <option value="Large">Large +$0.50</option>
              </>
            )}
          </select>
        </div>
        {userCoffee.name === "Espresso" || userCoffee.name === "Long Black" ? (
          <div></div>
        ) : (
          <div>
            <label>Milk:</label>
            <select value={milk} onChange={handleMilk}>
              <option value="Regular Milk">Full Cream</option>
              <option value="Skim Milk">Skim</option>
              <option value="Soy Milk">Soy</option>
              <option value="Almond Milk">Almond</option>
            </select>
          </div>
        )}
        <div>
          <label>Sugar:</label>
          <select value={sugar} onChange={handleSugar}>
            <option value="0">No Sugar</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
        <div>
          <label>Pickup Time:</label>
          <select onChange={handlePickupTime}>
            <option value="0">ASAP!</option>
            <option value="10">10 mins</option>
            <option value="20">20 mins</option>
            <option value="30">30 mins</option>
          </select>
        </div>
      </form>
      <StripeForm orderDetails={orderDetails} />
    </>
  );
};

export default NewOrderForm;
