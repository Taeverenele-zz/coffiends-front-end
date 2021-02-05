import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import stateReducer from "./utils/stateReducer"
import StateContext from "./utils/store";
import AdminHome from "./components/AdminDashboard/AdminHome";
import CafeDashboardView from "./components/CafePages/CafeDashboardView";
import CafeMenuView from "./components/CafePages/CafeMenuView";
import ChangePassword from "./components/UserPages/ChangePassword";
import EditUser from "./components/UserPages/EditUser";
import FlashMessageView from "./components/FlashMessage";
import HomeView from "./components/UserPages/HomeView";
import LoginView from "./components/LoginView";
import MapView from "./components/UserPages/MapView";
import NavBar from "./components/NavBar";
import NewCafeForm from "./components/AdminDashboard/NewCafeForm";
import NewCoffeeForm from "./components/AdminDashboard/NewCoffeeForm";
import NewOrderForm from "./components/UserPages/NewOrderForm";
import OrdersView from "./components/OrdersView";
import RegisterView from "./components/RegisterView";

const App = () => {
  const initialState = {
    flashMessage: null,
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
  const { loggedInUser } = store;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACK_END_URL}/users/check`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          dispatch({ type: "setLoggedInUser", data: data });
        };
      });
    
    // navigator.geolocation.getCurrentPosition(
    //   position => setUserLocation([position.coords.latitude, position.coords.longitude]),
    //   error => console.log(error.message)
    // );
  }, []);

  const handleLogout = () => {
    fetch(`${process.env.REACT_APP_BACK_END_URL}/users/logout`, { credentials: "include" })
      .then(() => {
          dispatch({ type: "setLoggedInUser", data: null });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid Remove-padding-margin ">
      <StateContext.Provider value={{ store, dispatch }}>
      <BrowserRouter>
          <FlashMessageView />
          <NavBar handleLogout={handleLogout} />
          <Switch>
            <>
              {!loggedInUser ? (
                <Route exact path="/" component={LoginView} />
              ) : ( <></> )}

              {loggedInUser && loggedInUser.role === "user" ? (
                <Route exact path="/" component={HomeView} />
              ) : ( <></> )}

              {loggedInUser && loggedInUser.role === "cafe" ? (
                <Route exact path="/" component={CafeDashboardView} />
              ) : ( <></> )}

              {loggedInUser && loggedInUser.role === "admin" ? (
                <Route exact path="/" component={AdminHome} />
              ) : ( <></> )}

              <Route exact path="/register" component={RegisterView} />

              <Route exact path="/map/:coffee" component={MapView} />

              <Route exact path="/orders/new" component={NewOrderForm} />

              <Route exact path="/user/edit" component={EditUser} />

              <Route exact path="/user/change_password" component={ChangePassword} />

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
