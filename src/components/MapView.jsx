import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
<<<<<<< HEAD
import { Motion, spring } from "react-motion";
import { Container, Row } from "reactstrap";
=======
import { Container, Row}  from "reactstrap";
>>>>>>> 65f36bc44c51cc63ea5d6ffc61a7289bde7c5c63
import axios from "axios";
import OrderView from "./OrderView";
import "../App.css";

function MapView(props) {
  const { coffee, setCoffee, userLocation, setCafe, cafe } = props;
  const [cafeData, setCafeData] = useState([]);
  const [show, setShow] = useState(false);
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);


  useEffect(() => {
    const time = new Date();
    const postBody = {
      location: userLocation,
      // time: (String(time.getHours()) + String(time.getMinutes())),
      time: "1000", // uncomment line above to use actual time & comment this one out
      coffee: coffee.id,
    };

    axios
      .post("http://localhost:5000/map/", postBody)
      .then((res) => setCafeData(res.data))
      .catch((error) => console.log(error.message));
  }, []);

  function handleClick(cafe, coffee) {
    cafe.menu.map((menuitem) => {
      if (menuitem.coffee == coffee.id) {
        setCoffee({
          id: coffee.id,
          name: coffee.name,
          price: menuitem.price,
        });
      }
    });
    setCafe(cafe);
<<<<<<< HEAD
    // setShow(true); // uncommment for popup ordering
  }
=======
    setShow(true) // uncommment for popup ordering
  };
>>>>>>> 65f36bc44c51cc63ea5d6ffc61a7289bde7c5c63



const showPanel = () => {
  var orderElement = document.getElementById("orderPanel");
  orderElement.classList.remove("Hide-Order")
  orderElement.classList.add("Show-Order");
}

const hidePanel = () => {
  var orderElement = document.getElementById("orderPanel");
  orderElement.classList.remove("Show-Order")
  orderElement.classList.add("Hide-Order");
}


  return (
    <>
<<<<<<< HEAD
      <Motion
        defaultStyle={{ x: 2000, opacity: 0 }}
        style={{ x: spring(show ? 0 : 2000), opacity: spring(show ? 1 : 0) }}
      >
        {(style) => (
          <Container>
            <div
              className="Order-Panel"
              style={{
                transform: `translateX(${style.x}px)`,
                opacity: style.opacity,
              }}
            >
              <OrderView coffee={coffee} cafe={cafe} setShow={setShow} />
            </div>
          </Container>
        )}
      </Motion>
=======
    

        <Container>
            <div className="Hide-Order" id="orderPanel" >
              <button onClick={hidePanel}>Close</button>
              <OrderView coffee={coffee} cafe={cafe}  />
            </div>
        </Container>


>>>>>>> 65f36bc44c51cc63ea5d6ffc61a7289bde7c5c63

      <MapContainer center={userLocation} zoom={17} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {cafeData.map((cafe) => (
          <Marker
            key={cafe._id}
            position={[cafe.location[0], cafe.location[1]]}
          >
            <Popup key={cafe._id}>
              <h3>{cafe.cafe_name}</h3>
              <p>
                Hrs: {cafe.operating_hours[0]} - {cafe.operating_hours[1]}
              </p>
              <p>{cafe.address}</p>
              <p>{coffee.name}</p>
<<<<<<< HEAD
              {cafe.menu.map((item) =>
                item.coffee === coffee.id ? (
                  <Link to="/order" onClick={() => handleClick(cafe, coffee)}>
                    ${item.price.toFixed(2)} - BUY NOW
                  </Link>
                ) : (
                  <></>
                )
              )}
              <Link onClick={() => setShow(true)}>BUY</Link>
=======
              {cafe.menu.map((item) => 
              {item.coffee === coffee.id ? <Link to="/order" onClick={() => handleClick(cafe, coffee)}>${item.price.toFixed(2)} - BUY NOW</Link> : <></>}
              )}
              <Link onClick={showPanel}>BUY</Link>
>>>>>>> 65f36bc44c51cc63ea5d6ffc61a7289bde7c5c63
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

export default MapView;
