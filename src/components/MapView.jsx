import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Container }  from "reactstrap";
import axios from "axios";
import NewOrderForm from './NewOrderForm';
import "../App.css";

function MapView(props) {
  const { userCoffee, setUserCoffee, userLocation, setCafe } = props;
  const [ cafesData, setCafesData ] = useState([]);
  // const [dropdownOpen, setOpen] = useState(false);
  // const toggle = () => setOpen(!dropdownOpen);

  useEffect(() => {
    getCafeData();
  }, []);

  const getCafeData = async () => {
    const time = new Date();
    const postBody = {
      location: userLocation,
      time: (String(time.getHours()) + String(time.getMinutes())),
      // time: "1000", // uncomment line above to use actual time & comment this one out
      coffee: userCoffee.id
    };

    const response = await axios.post("http://localhost:5000/map/", postBody);
    const searchResults = await response.data;
    setCafesData(searchResults);
  };

  function handleClick(cafe, coffee) {
    cafe.menu.map((menuitem) => {
      if (menuitem.coffee === coffee.id) {
        setUserCoffee({ ...userCoffee, price:  menuitem.price });
      };
    });
    setCafe(cafe);
  };

  // const showPanel = () => {
  //   var orderElement = document.getElementById("orderPanel");
  //   orderElement.classList.remove("Hide-Order");
  //   orderElement.classList.add("Show-Order");
  // };

  // const hidePanel = () => {
  //   var orderElement = document.getElementById("orderPanel");
  //   orderElement.classList.remove("Show-Order");
  //   orderElement.classList.add("Hide-Order");
  // };

  return (
    <>
      {/* <Container>
          <div className="Hide-Order" id="orderPanel" >
            <button onClick={hidePanel}>Close</button>
            <NewOrderForm coffee={coffee} cafe={cafe}  />
          </div>
      </Container> */}

      <MapContainer center={userLocation} zoom={17} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  
        />

        {cafesData.map((cafe) => (
          <Marker
            key={cafe._id}
            position={[cafe.location[0], cafe.location[1]]}
          >
            <Popup key={cafe._id}>
              <h3>{cafe.cafe_name}</h3>
              <p>Hrs: {cafe.operating_hours[0]} - {cafe.operating_hours[1]}</p>
              <p>{cafe.address}</p>
              <p>{userCoffee.name}</p>
              {cafe.menu.map((item) => 
                item.coffee === userCoffee.id ? <Link to="/orders/new" onClick={() => handleClick(cafe, userCoffee)}>${item.price.toFixed(2)} - BUY NOW</Link> : <></>
                // item.coffee === coffee.id ? <Link to="/orders/new" onClick={() => showPanel}>${item.price.toFixed(2)} - BUY NOW</Link> : <></>
              )}
            </Popup>
          </Marker>
          ))}
        </MapContainer>
    </>
  );
};

export default MapView;
