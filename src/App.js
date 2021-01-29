import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import AdminDashBoardView from "./components/AdminDashboardView";
import AllOrdersView from "./components/AllOrdersView";
import CafesView from "./components/CafesView";
import CoffeesView from "./components/CoffeesView";
import HomeView from "./components/HomeView";
import LoginView from "./components/LoginView";
import MapView from "./components/MapView";
import OrderView from "./components/OrderView";
import RegisterView from "./components/RegisterView";

const App = () => {
  const [reload, setReload] = useState(true);
  const [coffees, setCoffees] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [userLocation, setUserLocation] = useState([]);
  const [coffee, setCoffee] = useState({ id: "", name: "", price: 0 });
  const [cafe, setCafe] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [user, setUser] = useState({
    username: "",
    password: "",
    user_name: "",
    role: "user",
    phone: ""
  });

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
    // );
    setUserLocation([-27.468298, 153.0247838]); // uncomment code above & comment this out for dynamic location
  }, [reload, cafes, coffees]);

  useEffect(() => {
    fetch("http://localhost:5000/users/check", {
      credentials: "include"
    })
    .then(data => data.json())
    .then(json => {
      if (json.username) {
        setLoggedInUser({json})
      }
    })
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/users/logout", {
        credentials: "include"
      })
      .then(() => setLoggedInUser(false));
  };

  return (
    <div className="container mt-4">
      <BrowserRouter>
        <header>
          <nav>
            <Link to="/">
              <img src="logo.png" alt="Logo" style={{ height: "50px" }} />
            </Link>
            <Link to="/admin"> ADMIN</Link> |{" "} 
            <Link to="/cafes"> CAFES</Link> |{" "}
            <Link to="/coffees"> COFFEES</Link> |{" "}
            <Link to="/orders"> ORDERS</Link> |{" "}
            {!loggedInUser ? (
              <>
                <Link to="/login"> LOGIN</Link> |{" "}
                <Link to="/register">REGISTER</Link> |{" "}
              </>
            ) : (
              <>
                <span>
                  Logged in as {loggedInUser.username}
                </span> |{" "}
                <button onClick={handleLogout}>Log Out</button>
              </>
            )}
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
            path="/admin"
            render={(props) => (
              <AdminDashBoardView
                {...props}
                cafes={cafes}
                setCafes={setCafes}
                reload={reload}
                setReload={setReload}
                coffees={coffees}
                setCoffees={setCoffees}
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
                setCoffee={setCoffee}
                userLocation={userLocation}
                cafe={cafe}
                setCafe={setCafe}
              />
            )}
          />
          <Route
            exact
            path="/order"
            render={(props) => (
              <OrderView
                {...props}
                coffee={coffee}
                cafe={cafe}
              />
            )}
          />
          <Route
            exact
            path="/register"
            render={(props) => (
              <RegisterView
                {...props}
                setLoggedInUser={setLoggedInUser}
                user={user}
                setUser={setUser}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={(props) => (
              <LoginView
                {...props}
                setLoggedInUser={setLoggedInUser}
                user={user}
                setUser={setUser}
              />
            )}
          />
          <Route exact path="/admin" render={() => <AdminDashBoardView />} />
          <Route exact path="/orders" render={() => <AllOrdersView />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
