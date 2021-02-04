import React, { useState, useEffect, useReducer } from "react";
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
import StripeForm from "./components/StripeForm";
import NavBar from "./components/NavBar";
import NewCafeForm from "./components/AdminDashboard/NewCafeForm";
import NewCoffeeForm from "./components/AdminDashboard/NewCoffeeForm";

const App = () => {
  const [cafes, setCafes] = useState([]);
  const initialCafeData = {
    cafe_name: "",
    address: "",
    operating_hours: [],
    location: [],
  };
  const [cafeData, setCafeData] = useState(initialCafeData);
  const initialCoffeeData = {
    name: "",
    description: "",
  };
  const [coffeeData, setCoffeeData] = useState(initialCoffeeData);

  const initialState = {
    loggedInUser: null,
    userLocation: [ -27.468298, 153.0247838 ],
    allCoffees: null,
    userCoffee: null,
    orderCafe: null
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
      .then((res) => {
          dispatch({
            type: "setLoggedInUser",
            data: null
          });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid Remove-padding-margin ">
      <StateContext.Provider value={{store, dispatch}}>
      <BrowserRouter>
          <NavBar handleLogout={handleLogout} />
          <Switch>
            <>
              {!store.loggedInUser ? (
                <Route exact path="/" component={LoginView} />
              ) : (
                <></>
              )}
              {store.loggedInUser && store.loggedInUser.role === "user" ? (
                <Route exact path="/" component={HomeView} />
              ) : (
                <></>
              )}
              {store.loggedInUser && store.loggedInUser.role === "cafe" ? (
                <Route exact path="/" component={CafeDashboardView} />
              ) : (
                <></>
              )}
              {store.loggedInUser && store.loggedInUser.role === "admin" ? (
                <Route exact path="/" render={(props) => (
                  <AdminHome {...props}
                    // coffees={coffees}
                    // setCoffees={setCoffees}
                    cafes={cafes}
                    setCafes={setCafes}
                    cafeData={cafeData}
                    setCafeData={setCafeData}
                    coffeeData={coffeeData}
                    setCoffeeData={setCoffeeData}
                    initialCoffeeData={initialCoffeeData} /> )} />
              ) : (
                <></>
              )}

              <Route exact path="/register" component={RegisterView} />

              <Route exact path="/map/:coffee" component={MapView} />

              <Route exact path="/orders/new" component={NewOrderForm} />

              <Route exact path="/user/edit" component={EditUser} />

              <Route exact path="/orders" component={OrdersView} />

              <Route
                exact
                path="/menu"
                render={(props) => (
                  <CafeMenuView
                    {...props}
                    loggedInUser={store.loggedInUser}
                    // coffees={coffees}
                  />
                )}
              />

              <Route
                exact
                path="/admin/new_cafe"
                render={(props) => (
                  <NewCafeForm
                    {...props}
                    isEditing={false}
                    cafes={cafes}
                    setCafes={setCafes}
                    cafeData={cafeData}
                    setCafeData={setCafeData}
                    initialCafeData={initialCafeData}
                    loggedInUser={store.loggedInUser}
                  />
                )}
              />

              <Route
                exact
                path="/admin/edit_cafe"
                render={(props) => (
                  <NewCafeForm
                    {...props}
                    isEditing={true}
                    cafes={cafes}
                    setCafes={setCafes}
                    cafeData={cafeData}
                    setCafeData={setCafeData}
                    initialCafeData={initialCafeData}
                    loggedInUser={store.loggedInUser}
                  />
                )}
              />
              <Route
                exact
                path="/admin/new_coffee"
                render={(props) => (
                  <NewCoffeeForm
                    {...props}
                    // coffees={coffees}
                    // setCoffees={setCoffees}
                    isEditing={false}
                    coffeeData={coffeeData}
                    setCoffeeData={setCoffeeData}
                    initialCoffeeData={initialCoffeeData}
                    loggedInUser={store.loggedInUser}
                  />
                )}
              />
              <Route
                exact
                path="/admin/edit_coffee"
                render={(props) => (
                  <NewCoffeeForm
                    {...props}
                    // coffees={coffees}
                    // setCoffees={setCoffees}
                    isEditing={true}
                    coffeeData={coffeeData}
                    setCoffeeData={setCoffeeData}
                    initialCoffeeData={initialCoffeeData}
                    loggedInUser={store.loggedInUser}
                  />
                )}
              />

              <Route
                exact
                path="/payment"
                render={(props) => (
                  <StripeForm {...props} loggedInUser={store.loggedInUser} />
                )}
              />

              <Route exact path="/logout">
                <Redirect to="/" />
              </Route>
            </>
          </Switch>
        </BrowserRouter>
      </StateContext.Provider>
    </div>
  );
};

export default App;
