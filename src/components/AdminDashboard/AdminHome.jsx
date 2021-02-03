import { React, useEffect } from "react";
import axios from "axios";

import AdminLists from "./AdminLists";

const AdminHome = (props) => {
  const {
    coffees,
    setCoffees,
    cafes,
    setCafes,
    cafeData,
    setCafeData,
    setCoffeeData,
  } = props;

  // Add all coffees and cafes into state
  useEffect(() => {
    getAllCoffees();
    getAllCafes();
  }, []);

  // Get all cafes from database
  const getAllCafes = () => {
    axios
      .get("http://localhost:5000/cafes/", cafes)
      .then((res) => {
        setCafes(res.data);
      })
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
      <AdminLists
        {...props}
        cafes={cafes}
        coffees={coffees}
        cafeData={cafeData}
        setCafeData={setCafeData}
        deleteCafe={deleteCafe}
        setCoffeeData={setCoffeeData}
        deleteCoffee={deleteCoffee}
      />
    </>
  );
};

export default AdminHome;
