import "../App.css"
import React from "react"
import { Link } from "react-router-dom"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import * as cafeData from "../data/cafes.json"

function MapView(props) {
    const { userCoffee, userLocation } = props
    const coffee = {
        type: userCoffee,
        price: 3.5
    }

    console.log(userLocation)
    console.log(userCoffee)

    return (
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
                            <Link to="/">BUY</Link>
                        </Popup>
                    </Marker>
                ))}
        </MapContainer>
    );
}

export default MapView;