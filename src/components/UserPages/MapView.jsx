import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";
import { Button, Container } from "reactstrap";
import StateContext from "../../utils/store";
import setTimeString from "../../utils/setTimeString";
import "../../App.css";

function MapView() {
  const { coffee } = useParams();
  
  const [ cafesData, setCafesData ] = useState([]);

  const { store, dispatch } = useContext(StateContext);
  const { userLocation } = store;

  useEffect(() => {
    if (userLocation && coffee) {
      const postBody = {
        location: userLocation,
        time: setTimeString(),
        coffee: coffee
      };

      axios.post(`${process.env.REACT_APP_BACK_END_URL}/cafes/map`, postBody)
        .then((res) => setCafesData(res.data))
        .catch((err) => console.log(err));
      };
  }, [ userLocation, coffee ]);

  function handleClick(cafe, item) {
    dispatch({
      type: "setUserCoffee",
      data: {
        _id: item.coffeeId,
        name: item.coffeeName,
        price: item.coffeePrice
      }
    });
    dispatch({
      type: "setOrderCafe",
      data: cafe
    });
  }

  return (
    <>
      {userLocation && coffee ? (
        <>
          <Container fluid="true" className="background justify-content-center">
            <h2 className="text-center map-heading-colors " >Nearby cafes selling: {coffee}</h2>
            <div className="Admin-Dashboard-Center">
            <MapContainer center={userLocation} zoom={17} scrollWheelZoom={false} >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {cafesData.map((cafe, index) => (
                <React.Fragment key={index}>
                <Marker key={index} position={[cafe.location[0], cafe.location[1]]} >
                  <Popup >
                    <h2>{cafe.cafe_name}</h2>
                    <h5>Open: {cafe.operating_hours[0]} - {cafe.operating_hours[1]}</h5>
                    {cafe.menu.map((item) =>
                      item.coffeeName === coffee ? (
                        <Link to="/orders/new" onClick={() => handleClick(cafe, item)} >
                          <Button color="info" >
                              ${item.coffeePrice.toFixed(2)} - BUY NOW
                          </Button>
                        </Link>
                      ) : (<></>)
                    )}
                  </Popup>
                </Marker>
                </React.Fragment>
              ))}
            </MapContainer>
            </div>
          </Container>
        </>
      ) : (<h3>Searching for nearby cafes...</h3>)}
    </>
  );
}

export default MapView;
