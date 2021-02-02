import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { Navbar, Container, Row, Col, Input, Button, NavItem, Nav, Table  } from "reactstrap";
import AdminHome from "./components/AdminDashboard/AdminHome";
import CafeDashboardView from "./components/CafeDashboardView.jsx";
import CafeMenuView from "./components/CafeMenuView";
import CafesView from "./components/CafesView";
import CoffeesView from "./components/CoffeesView";
import HomeView from "./components/HomeView";
import LoginView from "./components/LoginView";
import MapView from "./components/MapView";
import NewOrderForm from "./components/NewOrderForm";
import OrdersView from "./components/OrdersView";
import PaymentCancelView from "./components/PaymentCancelView";
import PaymentSuccessView from "./components/PaymentSuccessView";
import RegisterView from "./components/RegisterView";
import StripeForm from "./components/StripeForm";
import NavBar from "./components/NavBar"



const App = () => {
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
  

  const homePageConditional = (props) => {
    if (loggedInUser) {
        switch (loggedInUser.role) {
            case 'cafe':
              return (
                     <CafeDashboardView {...props} 
                    loggedInUser={loggedInUser} />
              )
            case 'user':
              return (
                    <HomeView {...props}
                      coffees={coffees} setCoffees={setCoffees} setUserCoffee={setUserCoffee}/> 
              )
            case 'admin':
              return (
                  <AdminHome {...props}
                    coffees={coffees} setCoffees={setCoffees} />
            )
    }
    return null
      }
  }

  return (

    <div className="container-fluid Remove-padding-margin ">
      <BrowserRouter>

      <NavBar loggedInUser={loggedInUser} handleLogout={handleLogout}> </NavBar>


        <Switch>
          <>

          <Route exact path="/register" render={(props) => (
            <RegisterView {...props}
            setLoggedInUser={setLoggedInUser} loggedInUser={loggedInUser}  /> )} />

          <Route exact path="/login" render={(props) => (
            <LoginView {...props}
            setLoggedInUser={setLoggedInUser} /> )} />
          
          
          {loggedInUser ? (
            <>

              <Route exact path="/" render={(props) => (homePageConditional(props))} />

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
                <AdminHome {...props}
                  coffees={coffees} setCoffees={setCoffees} /> )} />

              <Route exact path="/coffees" render={(props) => (
                <CoffeesView {...props}
                  coffees={coffees} /> )} />
              
              <Route exact path="/payment" render={(props) => (
                <StripeForm {...props}
                  loggedInUser={loggedInUser} /> )} />
              
              <Route exact path="/payment/cancel" render={(props) => (
                <PaymentCancelView {...props}
                  loggedInUser={loggedInUser} /> )} />

              <Route exact path="/logout">
                <Redirect to="/login" />
              </Route>

            </>
          ) : (
            <h1>PLEASE LOG IN OR SIGN UP</h1>
          )}
          </>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
