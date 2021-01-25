import React, { useState, useEffect } from "react";
import CoffeesView from "./components/CoffeesView";
import NewCoffeeForm from "./components/NewCoffeeForm";
import axios from "axios";

const App = () => {
  const [coffees, setCoffees] = useState([]);
  const [reload, setReload] = useState(true);
  const [currentId, setCurrentId] = useState(null);

  const updateCoffeeArray = (eachEntry) => {
    setCoffees([...coffees, eachEntry]);
  };

  const deleteCoffee = (id) => {
    axios
      .delete(`http://localhost:5000/coffees/${id}`, coffees)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (reload == true) {
      axios
        .get("http://localhost:5000/coffees/", coffees)
        .then((res) => {
          setCoffees(res.data);
          setReload(false);
        })
        .catch((error) => console.log(error));
    }
  }, [reload]);

  return (
    <div className="container mt-4">
      <h1>App</h1>
      <CoffeesView
        coffees={coffees}
        setReload={setReload}
        deleteCoffee={deleteCoffee}
      />
      <NewCoffeeForm updateCoffeeArray={updateCoffeeArray} />
    </div>
  );
};

export default App;
