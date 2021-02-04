import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button, NavItem, Nav, Container, Row, Col } from "reactstrap";
import logo from "../assets/newLogo.svg"

const NavBar = (props) => {
  const { handleLogout, loggedInUser } = props;

  const loggedOut = (
    <>
      <NavItem className="mr-3">
        <Link to="/">
          <Button color="primary">LOG IN</Button>
        </Link>
      </NavItem>
      <NavItem className="mr-3">
        <Link to="/register">
          <Button color="info">SIGN UP</Button>
        </Link>
      </NavItem>
    </>
  );
  const activeSession = (
    <>
      <NavItem className="mr-3">
        <Link to="/logout">
          <Button outline onClick={handleLogout} className="button-color" size="sm" >
            LOG OUT
          </Button>
        </Link>
      </NavItem>
    </>
  );
  const userNav = (
    <>
      <NavItem className="mr-3">
        <Link to="/user/edit">
          <Button outline size="sm" className="button-color" >EDIT PROFILE</Button>
        </Link>
      </NavItem>
      <NavItem  className="mr-3">
        <Link to="/orders">
          <Button outline size="sm" className="button-color">ORDERS</Button>
        </Link>
      </NavItem>
    </>
  );
  const cafeNav = (
    <>
      <NavItem className="mr-3">
        <Link to="/menu">
          <Button>MENU</Button>
        </Link>
      </NavItem>
    </>
  );
  const adminNav = (
    <>
      <NavItem className="mr-3">
        <Link to="/admin/new_cafe">
          <Button>ADD CAFE</Button>
        </Link>
      </NavItem>
      <NavItem className="mr-3">
        <Link to="/admin/new_coffee">
          <Button>ADD COFFEE</Button>
        </Link>
      </NavItem>
    </>
  );

  return (
    <Container fluid={true} className="Remove-padding-margin ">
       <Navbar className="nav-color">
        <Col sm={{ size: 'auto' }}>
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-styles" />
          </Link>
        </Col>
        <Col sm={{ size: 'auto', offset: "1"}}>
            <div className="header"><b>Co<span>ff</span>ien<span>d</span>s</b></div>
        </Col>
        <Nav>
          <Col sm={{ size: 'auto'}} className="d-flex flex-nowrap">
          {!loggedInUser ? loggedOut : <></>}
          {loggedInUser && loggedInUser.role === "user" ? userNav : <></>}
          {loggedInUser && loggedInUser.role === "cafe" ? cafeNav : <></>}
          {loggedInUser && loggedInUser.role === "admin" ? adminNav : <></>}
          {loggedInUser ? activeSession : <></>}
          </Col>
        </Nav>
      </Navbar>
    </Container>
  );
};

export default NavBar;
