import { React, useState, useEffect } from "react";
import { Navbar, Button, NavItem, Nav } from "reactstrap";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";

import NewCafeForm from "./NewCafeForm";
import NewCoffeeForm from "./NewCoffeeForm";
import AdminLists from "./AdminLists";

const AdminHome = (props) => {
  const { match, coffees, setCoffees, handleLogout } = props;

  const [cafes, setCafes] = useState([]);
  const initialCafeState = {
    cafe_name: "",
    address: "",
    operating_hours: [],
    location: [],
  };
  const [cafeData, setCafeData] = useState(initialCafeState);

  const initialCoffeeData = {
    name: "",
    description: "",
  };
  const [coffeeData, setCoffeeData] = useState(initialCoffeeData);

  // Add all coffees and cafes into state
  useEffect(() => {
    getAllCoffees();
    getAllCafes();
  }, []);
  // Get all cafes from database
  const getAllCafes = () => {
    axios
      .get("http://localhost:5000/cafes/", cafes)
      .then((res) => setCafes(res.data))
      .catch((error) => console.log(error));
  };

  const deleteCafe = (id) => {
    axios
      .delete(`http://localhost:5000/cafes/${id}`, cafes)
      .then((res) => setCafes(cafes.filter((cafe) => cafe._id !== id)))
      .catch((error) => console.log(error));
  };

  // Get all coffees from the database
  const getAllCoffees = () => {
    axios
      .get("http://localhost:5000/coffees/", coffees)
      .then((res) => setCoffees(res.data))
      .catch((error) => console.log(error));
  };
  const deleteCoffee = (id) => {
    axios
      .delete(`http://localhost:5000/coffees/${id}`, coffees)
      .then((res) => setCoffees(coffees.filter((coffee) => coffee._id !== id)))
      .catch((error) => console.log(error));
  };

  return (
    <>
      <BrowserRouter>
        <Switch>

        <Route exact path={match.path + '/new_cafe'} render={(props) => (	
              <NewCafeForm {...props} cafes={cafes} cafeData={cafeData} setCafeData={setCafeData} setCafes={setCafes} isEditing={false} initialCafeState={initialCafeState} />	
            )}	
          />

          <Route exact path={match.path + '/edit_cafe'} render={(props) => (
              <NewCafeForm {...props} cafes={cafes} cafeData={cafeData} setCafeData={setCafeData} setCafes={setCafes} isEditing={true} initialCafeState={initialCafeState} />
            )}
          />
          <Route
            exact
            path="/admin/new_coffee"
            render={(props) => (
              <NewCoffeeForm
                {...props}
                isEditing={false}
                coffees={coffees}
                setCoffees={setCoffees}
                coffeeData={coffeeData}
                setCoffeeData={setCoffeeData}
                initialCoffeeData={initialCoffeeData}
              />
            )}
          />
          <Route
            exact
            path="/admin/edit_coffee"
            render={(props) => (
              <NewCoffeeForm
                {...props}
                isEditing={true}
                coffeeData={coffeeData}
                setCoffeeData={setCoffeeData}
                initialCoffeeData={initialCoffeeData}
                coffees={coffees}
                setCoffees={setCoffees}
              />
            )}
          />
          <Route
            exact
            path="/admin"
            render={(props) => (
              <AdminLists
                {...props}
                cafes={cafes}
                deleteCafe={deleteCafe}
                coffees={coffees}
                setCoffees={setCoffees}
                deleteCoffee={deleteCoffee}
                setCafeData={setCafeData}
                coffeeData={coffeeData}
                setCoffeeData={setCoffeeData}
                initialCoffeeData={initialCoffeeData}
              />
            )}
          />
          <Redirect to="/admin" />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default AdminHome;
