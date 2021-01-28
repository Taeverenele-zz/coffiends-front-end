import "../App.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import {Motion, spring} from "react-motion";
import {Container, Row} from "reactstrap";
import axios from "axios";

function MapView(props) {
    const { coffee, userLocation, setCafe } = props;
    const [show, setShow] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    const [cafeData, setCafeData] = useState([])

    useEffect(() => {
        const time = new Date
        const postBody = {
            location: userLocation,
            time: (String(time.getHours()) + String(time.getMinutes())),
            coffee: coffee.id
        }
        console.log(postBody)
        axios
        .post("http://localhost:5000/map/", postBody)
        .then((res) => {
            setCafeData(res.data);
        })
        .catch((error) => console.log(error.message));
      }, []);

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
                    <Row className="justify-content-center">
                     <h1>Coffee</h1> 
                    </Row>
                    <Row className="justify-content-center">
                     <h1>Order</h1> 
                    </Row>
                    <Row className="justify-content-center">
                        _____________________________________
                    </Row>
                    <Row className="justify-content-center">
                        <h2>Cafe Name</h2>
                    </Row>
                    <Row className="justify-content-center">
                        <input value="Coffee State" readonly></input>
                    </Row>
                    <Row className="justify-content-center Order-Panel-margin " >
                        <select name="milk" id="milk">
                        <option value="" disabled selected>Milk:</option>
                        <option value="skim">Skim</option>
                        <option value="light">Light</option>
                        <option value="2 %">2 %</option>
                        <option value="almond">almond</option>
                        </select>
                    </Row>

                    <Row className="justify-content-center Order-Panel-margin " >
                        <select name="sugar" id="sugar">
                        <option value="" disabled selected>Sugars:</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        </select>
                    </Row>
                    <Row className="justify-content-center Order-Panel-margin " >
                        <select name="size" id="size">
                        <option value="" disabled selected>Size:</option>
                        <option value="small">Small</option>
                        <option value="medium">Medium</option>
                        <option value="large">Large</option>
                        <option value="big">Need BIG coffee</option>
                        </select>
                    </Row>
                    <Row className="justify-content-center">
                        _____________________________________
                    </Row>
                    <Row className="justify-content-center">
                        <h2>Order Time</h2>
                    </Row>
                    <Row className="justify-content-center Order-Panel-margin " >
                        <select name="time" id="time">
                        <option value="" disabled selected>Order Time:</option>
                        <option value="asap">ASAP</option>
                        <option value="10mins">10mins</option>
                        <option value="20mins">20mins</option>
                        <option value="30mins">30mins</option>
                        </select>
                    </Row>
                    {/* {console.log(show)} */}
                    <Row className="justify-content-center" Order-Panel-margin>
                    <button onClick={() => setShow(false)} className="Order-Panel-margin">Cancel </button>
                    <button className="Order-Panel-margin">Pay </button>
                    </Row>
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
                {cafeData.map((cafe) => (
                    <Marker
                        key={cafe._id}
                        position={[cafe.location[0], cafe.location[1]]}
                    >
                        <Popup>
                            <h2>{cafe.cafe_name}</h2>
                            <p>{cafe.address}</p>
                            <p>{coffee.name}</p>
                            <p><b>${cafe.menu[0].price}</b></p>
                            <Link onClick={() => setShow(true)}>BUY</Link>
                            {/* to="/order" onClick={() => handleClick(cafe.name)} */}
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>

      

        </>
    );
}

export default MapView;