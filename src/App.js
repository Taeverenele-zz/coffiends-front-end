import React, { useState, useEffect } from "react";
import CoffeesView from "./components/CoffeesView";
import CafesView from "./components/CafesView";
import axios from "axios";
import Home from "./components/Home";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import HomeView from "./components/HomeView";
import MapView from "./components/MapView";
import OrderView from "./components/OrderView";
import LoginView from "./components/LoginView";
import RegisterView from "./components/RegisterView";
import AdminDashBoardView from "./components/AdminDashboardView"

const App = () => {
  const [coffees, setCoffees] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [reload, setReload] = useState(true);

  const [userCoffee, setUserCoffee] = useState("");

  const [coffee, setCoffee] = useState({
    type: "",
    price: 0,
  });

  const [userLocation, setUserLocation] = useState([-27.468298, 153.0247838]);
  const [cafe, setCafe] = useState("");

  //COFFEES
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
    if (reload === true) {
      axios
        .get("http://localhost:5000/coffees/", coffees)
        .then((res) => {
          setCoffees(res.data);
          setReload(false);
        })
        .catch((error) => console.log(error));
      axios
        .get("http://localhost:5000/cafes/", cafes)
        .then((res) => {
          setCafes(res.data);
          setReload(false);
        })
        .catch((error) => console.log(error));
    }
    // navigator.geolocation.getCurrentPosition(
    //   position => setUserLocation([position.coords.latitude, position.coords.longitude]),
    //   error => console.log(error.message)
    // )
  }, [reload, cafes, coffees]);

  // CAFES
  const addCafe = (newCafe) => {
    setCafes([...cafes, newCafe]);
  };

  const deleteCafe = (id) => {
    axios
      .delete(`http://localhost:5000/cafes/${id}`, cafes)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div className="container mt-4">
      <BrowserRouter>
        <header>
          <nav>
            <span>
              <h3>COFFIENDS</h3>
            </span>
            <Link to="/">HOME</Link> |<Link to="/coffees"> COFFEES</Link> |{" "}
            <Link to="/cafes"> CAFES</Link>
          </nav>
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <HomeView {...props} coffees={coffees} setCoffee={setCoffee} />
            )}
          />
          <Route
            exact
            path="/coffees"
            render={(props) => (
              <CoffeesView
                {...props}
                coffees={coffees}
                setReload={setReload}
                deleteCoffee={deleteCoffee}
                updateCoffeeArray={updateCoffeeArray}
              />
            )}
          />
          <Route
            exact
            path="/cafes"
            render={(props) => (
              <CafesView
                {...props}
                cafes={cafes}
                setCafes={setCafes}
                setReload={setReload}
                deleteCafe={deleteCafe}
                addCafe={addCafe}
              />
            )}
          />
          <Route
            exact
            path="/map"
            render={(props) => (
              <MapView
                {...props}
                coffee={coffee}
                userLocation={userLocation}
                setCafe={setCafe}
              />
            )}
          />
          <Route
            exact
            path="/order"
            render={(props) => (
              <OrderView {...props} coffee={coffee} cafe={cafe} />
            )}
          />
          <Route exact
           path="/login"
            render={() => <LoginView></LoginView>} />
          <Route
            exact
            path="/register"
            render={() => <RegisterView></RegisterView>}
          />
          <Route
            exact
            path="/admin"
            render={() => <AdminDashBoardView></AdminDashBoardView>}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
