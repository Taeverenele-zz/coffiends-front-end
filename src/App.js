import React, { useState, useEffect } from "react";
import CoffeesView from "./components/CoffeesView";
import NewCoffeeForm from "./components/NewCoffeeForm";
import axios from "axios";

const App = () => {
  const [coffees, setCoffees] = useState([]);
  const updateCoffeeArray = (eachEntry) => {
    setCoffees([...coffees, eachEntry]);
  };
  // const deleteCoffee = (id) => {
  //   axios.get('ttp://localhost:5000/coffees', coffees)
  //   .then(())
  //   let newCoffees = [...coffees];
  //   newCoffees = newCoffees.filter((coffee) => coffee._id != id);
  //   setCoffees(newCoffees);
  // };

  useEffect(() => {
    axios
      .get("http://localhost:5000/coffees", coffees)
      .then((res) => setCoffees(res.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="container mt-4">
      <h1>App</h1>
      <CoffeesView coffees={coffees} />
      <NewCoffeeForm
        updateCoffeeArray={updateCoffeeArray}
        // deleteCoffee={deleteCoffee}
      />
    </div>
  );
};

export default App;
