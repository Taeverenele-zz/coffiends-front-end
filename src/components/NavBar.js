import React from "react";
import { Link } from "react-router-dom";
import { Navbar,Button, NavItem, Nav } from "reactstrap";


const NavBar = (props) => {

   const {handleLogout, loggedInUser} = props


    console.log(loggedInUser.role)


   switch (loggedInUser.role){
    case "cafe": 
    if (loggedInUser.role === "cafe")       
}






    return (
        <header>
            <Navbar color="light" light>
            <Link to="/">
                <img src="logo.png" alt="Logo" style={{ height: "50px" }} />
            </Link>
            <div>
                <h1>COFFIENDS</h1>
            </div>
            <Nav>
                <NavItem className="mr-3">
                <Link to="/logout"><Button onClick={handleLogout}>Log Out</Button></Link>
                </NavItem>
            </Nav>
            </Navbar>
        </header>
    )
}


export default NavBar
