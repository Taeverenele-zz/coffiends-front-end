import "../App.css";
import React from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import * as cafeData from "../data/cafes.json";
import { useState } from 'react';
import {Motion, spring} from "react-motion"
import {Container, Row} from 'reactstrap'
import OrderView from './OrderView'

function MapView(props) {
    const { coffee, userLocation, setCafe } = props;
    const [show, setShow] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    function handleClick(cafe) {
        setCafe(cafe);
    };

    return (
        <>


        <Motion defaultStyle={{x: 2000, opacity: 0}}
         style={{x: spring(show ? 0 : 2000), opacity: spring(show ? 1 : 0)}}>

        {(style) => (
            <Container>
            <div className="Order-Panel" style={{transform: `translateX(${style.x}px)` , opacity: style.opacity ,}} >
                    <OrderView coffee={coffee} setShow={setShow} >
                    </OrderView>
            </div>
            </Container>
        )}
        </Motion>
           
        <MapContainer
            center={userLocation}
            zoom={16}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                
            />
                {cafeData.data.map((cafe) => (
                    <Marker
                        key={cafe.cafe_id}
                        position={[cafe.location[0], cafe.location[1]]}
                    >
                        <Popup>
                            <h2>{cafe.name}</h2>
                            <p>{cafe.address}</p>
                            <p>{coffee.type}</p>
                            <p><b>${coffee.price}</b></p>
                            <Link onClick={() => setShow(true)} >BUY</Link>
                            
                            {/* to="/order" onClick={() => handleClick(cafe.name)}   */}
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>

      

        </>
    );
}

export default MapView;