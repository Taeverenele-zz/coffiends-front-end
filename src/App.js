import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "reactstrap";
import AdminDashBoardView from "./components/AdminDashboardView";
import CafeDashboardView from "./components/CafeDashboardView.jsx";
import CafeMenuView from "./components/CafeMenuView";
import CafesView from "./components/CafesView";
import CoffeesView from "./components/CoffeesView";
import HomeView from "./components/HomeView";
import LoginView from "./components/LoginView";
import MapView from "./components/MapView";
import NewOrderForm from "./components/NewOrderForm";
import OrdersView from "./components/OrdersView";
import RegisterView from "./components/RegisterView";

const App = () => {
  const [ reload, setReload ] = useState(true);
  const [ loggedInUser, setLoggedInUser ] = useState(null);
  const [ coffees, setCoffees ] = useState([]);
  const [ userCoffee, setUserCoffee ] = useState({ id: "", name: "", price: 0 });
  const [ userLocation, setUserLocation ] = useState([ -27.468298, 153.0247838 ]);
  const [ cafe, setCafe ] = useState("");


  // Checks session for a logged in user
  useEffect(() => {
    fetch("http://localhost:5000/users/check", { credentials: "include" })
      .then((data) => data.json())
      .then((json) => {
        if (json) {
          setLoggedInUser(json);
        }
      });
  }, []);

  // useEffect(() => {
  //   if (reload === true) {
  //     axios
  //       .get("http://localhost:5000/coffees/", coffees)
  //       .then((res) => {
  //         setCoffees(res.data);
  //         setReload(false);
  //       })
  //       .catch((error) => console.log(error));
  //     axios
  //       .get("http://localhost:5000/cafes/", cafes)
  //       .then((res) => {
  //         setCafes(res.data);
  //         setReload(false);
  //       })
  //       .catch((error) => console.log(error));
  //   }
    // navigator.geolocation.getCurrentPosition(
    //   position => setUserLocation([position.coords.latitude, position.coords.longitude]),
    //   error => console.log(error.message)
    // );
  // }, [reload, cafes, coffees]);
// 
  const handleLogout = () => {
    fetch("http://localhost:5000/users/logout", {
      credentials: "include",
    }).then((res) => {
      if (res.status == 200) {
        setLoggedInUser(false);
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div className="container mt-4">
      <BrowserRouter>
        <header>
          <nav>
            <Link to="/">
              <img src="logo.png" alt="Logo" style={{ height: "50px" }} />
            </Link>
            <Link to="/orders"> ORDERS</Link> |{" "}
            <Link to="/dashboard">CAFE DASHBOARD</Link> |{" "}
            <Link to="/coffees"> COFFEES</Link> |{" "}
            <Link to="/cafes"> CAFES</Link> | <Link to="/admin">ADMIN</Link>
            {!loggedInUser ? (
              <>
                <Link to="/login">
                  <Button color="primary" size="sm" style={{ margin: "2px" }}>
                    LOG IN
                  </Button>
                </Link>
                <Link to="/register">
                  <Button color="info" size="sm" style={{ margin: "2px" }}>
                    SIGN UP
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/logout">
                <Button
                  color="dark"
                  size="sm"
                  style={{ margin: "5px" }}
                  onClick={handleLogout}
                >
                  LOG OUT
                </Button>
              </Link>
            )}
          </nav>
        </header>
        <Switch>
          <Route exact path="/" render={(props) => (
            <HomeView {...props}
              coffees={coffees} setCoffees={setCoffees} setUserCoffee={setUserCoffee} /> )} />

          <Route exact path="/register" render={(props) => (
            <RegisterView {...props}
              setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser} /> )} />

          <Route exact path="/login" render={(props) => (
            <LoginView {...props}
              setLoggedInUser={setLoggedInUser} /> )} />
          
          {loggedInUser ? (
            <>
              <Route exact path="/map" render={(props) => (
                <MapView {...props}
                  userCoffee={userCoffee} setUserCoffee={setUserCoffee} userLocation={userLocation} setCafe={setCafe} /> )} />

              <Route exact path="/orders/new" render={(props) => (
                <NewOrderForm {...props}
                  userCoffee={userCoffee} cafe={cafe} loggedInUser={loggedInUser} /> )} />

              <Route exact path="/orders" render={(props) => (
                <OrdersView {...props}
                  loggedInUser={loggedInUser} /> )} />
              
              <Route exact path="/dashboard" render={(props) => (
                <CafeDashboardView {...props} 
                  loggedInUser={loggedInUser} /> )} />

              <Route exact path="/menu" render={(props) => (
                <CafeMenuView {...props}
                  loggedInUser={loggedInUser} coffees={coffees} /> )} />
              
              <Route exact path="/admin" render={(props) => (
                <AdminDashBoardView {...props}
                  cafes={cafes} setCafes={setCafes} reload={reload} setReload={setReload} coffees={coffees} setCoffees={setCoffees} /> )} />

              <Route exact path="/coffees" render={(props) => (
                <CoffeesView {...props}
                  coffees={coffees} setReload={setReload} deleteCoffee={deleteCoffee} updateCoffeeArray={updateCoffeeArray} /> )} />

              <Route exact path="/cafes" render={(props) => (
                <CafesView {...props}
                  cafes={cafes} setCafes={setCafes} setReload={setReload} /> )} />

              <Route exact path="/logout">
                <Redirect to="/login" />
              </Route>
            </>
          ) : (
            <h1>PLEASE LOG IN OR SIGN UP</h1>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
