import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import stateReducer from "./utils/stateReducer"
import StateContext from "./utils/store";
import AdminHome from "./components/AdminDashboard/AdminHome";
import CafeDashboardView from "./components/CafeDashboardView.jsx";
import CafeMenuView from "./components/CafeMenuView";
import HomeView from "./components/HomeView";
import LoginView from "./components/LoginView";
import MapView from "./components/MapView";
import NewOrderForm from "./components/NewOrderForm";
import EditUser from "./components/EditUser";
import OrdersView from "./components/OrdersView";
import RegisterView from "./components/RegisterView";
import NavBar from "./components/NavBar";
import NewCafeForm from "./components/AdminDashboard/NewCafeForm";
import NewCoffeeForm from "./components/AdminDashboard/NewCoffeeForm";

const App = () => {
  const initialState = {
    loggedInUser: null,
    userLocation: [ -27.468298, 153.0247838 ],
    allCafes: null,
    allCoffees: null,
    userCoffee: null,
    orderCafe: null,
    cafeData: null,
    coffeeData: null
  };

  const [ store, dispatch ] = useReducer(stateReducer, initialState);

  // Checks session for a logged in user, gets coffees, sets user location
  useEffect(() => {
    fetch("http://localhost:5000/users/check", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch({
            type: "setLoggedInUser",
            data: data
          });
        };
      });

    axios.get("http://localhost:5000/coffees/")
      .then((res) => {
        dispatch({
          type: "getAllCoffees",
          data: res.data
        });
      })
      .catch((err) => console.log(err));
    
    // navigator.geolocation.getCurrentPosition(
    //   position => setUserLocation([position.coords.latitude, position.coords.longitude]),
    //   error => console.log(error.message)
    // );
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/users/logout", { credentials: "include" })
      .then(() => {
          dispatch({
            type: "setLoggedInUser",
            data: null
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid Remove-padding-margin ">
      <StateContext.Provider value={{ store, dispatch }}>
      <BrowserRouter>
          <NavBar handleLogout={handleLogout} />
          <Switch>
            <>
              {!store.loggedInUser ? (
                <Route exact path="/" component={LoginView} />
              ) : ( <></> )}

              {store.loggedInUser && store.loggedInUser.role === "user" ? (
                <Route exact path="/" component={HomeView} />
              ) : ( <></> )}

              {store.loggedInUser && store.loggedInUser.role === "cafe" ? (
                <Route exact path="/" component={CafeDashboardView} />
              ) : ( <></> )}

              {store.loggedInUser && store.loggedInUser.role === "admin" ? (
                <Route exact path="/" component={AdminHome} />
              ) : ( <></> )}

              <Route exact path="/register" component={RegisterView} />

              <Route exact path="/map/:coffee" component={MapView} />

              <Route exact path="/orders/new" component={NewOrderForm} />

              <Route exact path="/user/edit" component={EditUser} />

              <Route exact path="/orders" component={OrdersView} />

              <Route exact path="/menu" component={CafeMenuView} />

              <Route exact path="/admin/cafe/:action" component={NewCafeForm} />

              <Route exact path="/admin/coffee/:action" component={NewCoffeeForm} />

              <Route exact path="/logout">
                <Redirect to="/" /></Route>
            </>
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
};

export default App;
