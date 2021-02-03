import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Button, Container } from "reactstrap";
import axios from "axios";
import "../App.css";

function MapView(props) {
  const { coff } = useParams();
  const { setUserCoffee, userLocation, setCafe } = props;
  const [cafesData, setCafesData] = useState([]);

  useEffect(() => {
    if (userLocation && coff) {
      getCafeData();
    };
  }, [userLocation, coff]);

  const getCafeData = () => {
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
    time = `${hr}:${min}`

    const postBody = {
      location: userLocation,
      time: time,
      coffee: coff,
    };

    axios.post("http://localhost:5000/map/", postBody)
      .then((res) => setCafesData(res.data))
      .catch((err) => console.log(err))
  };

  function handleClick(cafe, item) {
    setUserCoffee({
      _id: item.coffee._id,
      name: item.coffee.name,
      price: item.price
    });
    setCafe(cafe);
  }

  return (
    <>
      {userLocation && coff ? (      
        <Container>
          <h2>Nearby cafes selling: {coff}</h2>
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
                  <h2>{cafe.cafe_name}</h2>
                  <h5>Open: {cafe.operating_hours[0]} - {cafe.operating_hours[1]}</h5>
                  {cafe.menu.map(
                    (item) =>
                      item.coffee.name === coff ? (
                        <Link to="/orders/new" onClick={() => handleClick(cafe, item)} >
                          <Button color="info">
                              ${item.price.toFixed(2)} - BUY NOW
                          </Button>
                        </Link>
                      ) : (
                        <></>
                      )
                  )}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </Container>
      ) : (<h3>Searching for nearby cafes...</h3>)}
    </>
  );
}

export default MapView;
