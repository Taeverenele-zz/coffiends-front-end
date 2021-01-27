import React from "react";
import { Link } from "react-router-dom";

const HomeView = (props) => {
    const { coffees, setCoffee } = props;

    function addUserCoffee(type, price) {
        setCoffee({ type, price })
    }

    return (
        <div>
            <h2>Search Cafes by Coffee</h2>
            <ul>
                {coffees.map((coffee) => (
                    <li key={coffee._id} onClick={() => addUserCoffee(coffee.name, 3.50)}>{coffee.name} - <Link to="/map">SEARCH</Link></li>
                ))}
            </ul>
        </div>
    );
};

export default HomeView;