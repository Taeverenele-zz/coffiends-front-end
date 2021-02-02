import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button, NavItem, Nav } from "reactstrap";

const NavBar = (props) => {
  const { handleLogout, loggedInUser } = props;

  const navConditional = () => {
    if (loggedInUser) {
      switch (loggedInUser.role) {
        case "cafe":
          return (
            <>
              <NavItem className="mr-3">
                <Link to="/dashboard">
                  <Button>Dashboard</Button>
                </Link>
              </NavItem>
              <NavItem className="mr-3">
                <Link to="/logout">
                  <Button onClick={handleLogout}>Log Out</Button>
                </Link>
              </NavItem>
            </>
          );
        case "user":
          return (
            <>
              <NavItem className="mr-3">
                <Link to="/logout">
                  <Button onClick={handleLogout}>Log Out</Button>
                </Link>
              </NavItem>
            </>
          );
        case "admin":
          return (
            <>
              <NavItem className="mr-3">
                <Link to="/admin">
                  <Button>Admin Dashboard</Button>
                </Link>
              </NavItem>
              <NavItem className="mr-3">
                <Link to="/logout">
                  <Button onClick={handleLogout}>Log Out</Button>
                </Link>
              </NavItem>
            </>
          );
      }
    } else {
      return (
        <>
          <NavItem className="mr-3">
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          </NavItem>
        </>
      );
    }
    return null;
  };
  return (
    <header>
      <Navbar color="light" light>
        <Link to="/">
          <img src="logo.png" alt="Logo" style={{ height: "50px" }} />
        </Link>
        <div>
          <h1>COFFIENDS</h1>
        </div>
        <Nav>{navConditional()}</Nav>
      </Navbar>
    </header>
  );
};

export default NavBar;
