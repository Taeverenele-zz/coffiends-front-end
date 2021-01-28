import { useState, useEffect } from "react";

const OrderView = (props) => {
  const { coffee, cafe, setShow} = props;
  const [ orderPrice, setOrderPrice ] = useState(coffee.price);
  const [ size, setSize ] = useState("Regular");
  const [ milk, setMilk ] = useState("Regular Milk");
  const [ sugar, setSugar ] = useState(0);
  const [ pickupTime, setPickupTime ] = useState(Date.now());
  
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
    setPickupTime(`${hr}:${min}`);
    if (coffee.name === "Espresso" || coffee.name === "Long Black") {
      setMilk("No milk");
    };
  }, []);

  const handleSize = (event) => {
    setSize(event.target.value);
    if (event.target.value === "Large") {
      setOrderPrice((coffee.price + 0.5));
    } else if (event.target.value === "Small") {
      setOrderPrice((coffee.price - 0.5));
    } else if (event.target.value === "Regular") {
      setOrderPrice((coffee.price));
    };
  };

  const handleMilk = (event) => {
    setMilk(event.target.value);
  };

  const handleSugar = (event) => {
    setSugar(event.target.value);
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
    setPickupTime(`${hr}:${min}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(
      `
        ${size} ${coffee.name}
        ${milk}
        ${sugar} Sugars
        Pick up at ${pickupTime} from ${cafe.cafe_name}
        ${cafe.address}
      `
    );
  };

  return (
    <>
      <button onClick={() => setShow(false)} className="Order-Panel-margin">Cancel</button>
      <h3>{cafe.cafe_name}</h3>
      <h4>{coffee.name}</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Size: </label>
          <select value={size} onChange={handleSize}>
            <option value="Regular">Regular</option>
            {coffee.name === "Espresso" ?
              (<></>) : (
                <>
                  <option value="Small">Small -$0.50</option>
                  <option value="Large">Large +$0.50</option>
                </>
              )
            }
          </select>
        </div>
        {coffee.name === "Espresso" || coffee.name === "Long Black" ?
          (<div></div>) : (
            <div>
              <label>Milk:</label>
              <select value={milk} onChange={handleMilk}>
                <option value="Regular Milk">Full Cream</option>
                <option value="Skim Milk">Skim</option>
                <option value="Soy Milk">Soy</option>
                <option value="Almond Milk">Almond</option>
              </select>
            </div>
          )
        }
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
        <button>${orderPrice.toFixed(2)} - BUY NOW</button>
      </form>
    </>
  );
};

export default OrderView;
