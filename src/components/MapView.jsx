import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Container, Row}  from "reactstrap";
import axios from "axios";
import OrderView from './OrderView';
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
      coffee: coffee.id
    };
    
    axios
      .post("http://localhost:5000/map/", postBody)
      .then(res => setCafeData(res.data))
      .catch(error => console.log(error.message));
  }, []);

  function handleClick(cafe, coffee) {
    cafe.menu.map((menuitem) => {
      if (menuitem.coffee == coffee.id) {
        setCoffee(
          {
            id: coffee.id,
            name: coffee.name,
            price: menuitem.price
          }
        )
      }
    });
    setCafe(cafe);
    setShow(true) // uncommment for popup ordering
  };



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
    

        <Container>
            <div className="Hide-Order" id="orderPanel" >
              <button onClick={hidePanel}>Close</button>
              <OrderView coffee={coffee} cafe={cafe}  />
            </div>
        </Container>



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
              <p>Hrs: {cafe.operating_hours[0]} - {cafe.operating_hours[1]}</p>
              <p>{cafe.address}</p>
              <p>{coffee.name}</p>
              {cafe.menu.map((item) => 
              {item.coffee === coffee.id ? <Link to="/order" onClick={() => handleClick(cafe, coffee)}>${item.price.toFixed(2)} - BUY NOW</Link> : <></>}
              )}
              <Link onClick={showPanel}>BUY</Link>
            </Popup>
          </Marker>
          ))}
        </MapContainer>
    </>
  );
};

export default MapView;
