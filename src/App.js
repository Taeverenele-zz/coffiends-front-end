import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "reactstrap";
import AdminDashBoardView from "./components/AdminDashboardView";
import CafeDashboardView from "./components/CafeDashboardView";
import CafeMenuView from "./components/CafeMenuView";
import CafesView from "./components/CafesView";
import CoffeesView from "./components/CoffeesView";
import HomeView from "./components/HomeView";
import LoginView from "./components/LoginView";
import MapView from "./components/MapView";
import NewOrderView from "./components/NewOrderView";
import OrdersView from "./components/OrdersView";
import RegisterView from "./components/RegisterView";

const App = () => {
  const [ reload, setReload ] = useState(true);
  const [ coffees, setCoffees ] = useState([]);
  const [ cafes, setCafes ] = useState([]);
  const [ userLocation, setUserLocation ] = useState([]);
  const [ coffee, setCoffee ] = useState({ id: "", name: "", price: 0 });
  const [ cafe, setCafe ] = useState("");
  const [ loggedInUser, setLoggedInUser ] = useState(false);
  const [ user, setUser ] = useState({
    username: "",
    password: "",
    user_name: "",
    role: "user",
    phone: ""
  });
  const [ userCafe, setUserCafe ] = useState({});
  const [ menu, setMenu ] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users/check", { credentials: "include" })
      .then(data => data.json())
      .then(json => {
        if (json) {
          setLoggedInUser(json);
        };
      });
  }, []);

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

  const handleLogout = () => {
    fetch("http://localhost:5000/users/logout", { credentials: "include" })
      .then((res) => {
        if (res.status == 200) {
          setLoggedInUser(false);
        } else {
          console.log(res);
        };
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
            {loggedInUser ? (
              <>
                {loggedInUser.role === "admin" ? (
                  <>
                    <Link to="/admin">ADMIN</Link> |{" "}
                    <Link to="/cafes"> CAFES</Link> |{" "}
                    <Link to="/coffees"> COFFEES</Link> |{" "}
                  </>
                )  : <></> }
                {loggedInUser.role === "cafe" ? (
                  <>
                    <Link to="/dashboard">CAFE DASHBOARD</Link>
                  </>
                )  : <></> }
                {loggedInUser.role !== "cafe" ? (
                  <>
                    <Link to="/orders"> ORDERS</Link>
                  </>
                )  : <></> }
                <Link to="/logout">
                  <Button color="dark" size="sm" style={{ margin: "5px" }} onClick={handleLogout}>
                    LOG OUT
                  </Button>
                </Link>
              </>
            ) : (
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
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
                user={user}
                setUser={setUser}
                userCafe={userCafe}
                setUserCafe={setUserCafe}
              />
            )}
          />
          {loggedInUser ? (
            <>
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
                path="/orders/new"
                render={(props) => (
                  <NewOrderView
                    {...props}
                    coffee={coffee}
                    cafe={cafe}
                    loggedInUser={loggedInUser}
                  />
                )}
              />
              <Route
                exact
                path="/orders"
                render={(props) => (
                  <OrdersView
                    {...props}
                    loggedInUser={loggedInUser}
                    userCafe={userCafe}
                  />
                )}
              />
              <Route
                exact
                path="/dashboard"
                render={(props) => (
                  <CafeDashboardView
                    {...props}
                    loggedInUser={loggedInUser}
                    userCafe={userCafe}
                    setMenu={setMenu}
                  />
                )}
              />
              <Route
                exact
                path="/menu"
                render={(props) => (
                  <CafeMenuView
                    {...props}
                    loggedInUser={loggedInUser}
                    userCafe={userCafe}
                    setMenu={setMenu}
                    menu={menu}
                  />
                )}
              />
              <Route exact path="/logout">
                <Redirect to="/" />
              </Route>
            </>
          ) : (
            <>
              <h1>PLEASE LOG IN OR SIGN UP</h1>
            </>
          )}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
