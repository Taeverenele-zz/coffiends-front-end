import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button, NavItem, Nav } from "reactstrap";

const NavBar = (props) => {
  const { handleLogout, loggedInUser } = props;

  const loggedOut = (
    <>
      <NavItem className="mr-3">
          <Link to="/login"><Button color="primary">LOG IN</Button></Link>
      </NavItem>
      <NavItem className="mr-3">
          <Link to="/register"><Button color="info">SIGN UP</Button></Link>
      </NavItem>
    </>
  );
  const activeSession = (
    <>
      <NavItem className="mr-3">
        <Link to="/logout"><Button color="warning" onClick={handleLogout}>LOG OUT</Button></Link>
      </NavItem>
    </>
  );
  const userNav = (
    <>
      <NavItem className="mr-3">
        <Link to="/orders"><Button>ORDERS</Button></Link>
      </NavItem>
    </>
  );
  const cafeNav = (
    <>
      <NavItem className="mr-3">
        <Link to="/menu"><Button>MENU</Button></Link>
      </NavItem>
    </>
  );
  const adminNav = (
    <>
      <NavItem className="mr-3">
          <Link to="/admin/new_cafe"><Button>ADD CAFE</Button></Link>
      </NavItem>
      <NavItem className="mr-3">
          <Link to="/admin/new_coffee"><Button>ADD COFFEE</Button></Link>
      </NavItem>
    </>
  );

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
          {!loggedInUser ? loggedOut : <></>}
          {(loggedInUser && loggedInUser.role === "user") ? userNav : <></>}
          {(loggedInUser && loggedInUser.role === "cafe") ? cafeNav : <></>}
          {(loggedInUser && loggedInUser.role === "admin") ? adminNav : <></>}
          {loggedInUser ? activeSession : <></>}
        </Nav>
      </Navbar>
    </header>
  );
};

export default NavBar;

 // const roleConditional = () => {
    //     if (loggedInUser) {
    //         switch (loggedInUser.role) {
    //             case 'cafe':
    //               return (
    //                   <>
    //                      <NavItem className="mr-3">
    //                         <Link to="/menu"><Button >Menu</Button></Link>
    //                     </NavItem>
    //                         <NavItem className="mr-3">
    //                         <Link to="/logout"><Button onClick={handleLogout}>Log Out</Button></Link>
    //                     </NavItem>
    //                   </>
    //               )
    //             case 'user':
    //               return (
    //                   <>
    //                     <NavItem className="mr-3">
    //                          <Link to="/orders"><Button>Orders</Button></Link>
    //                     </NavItem>
    //                     <NavItem className="mr-3">
    //                          <Link to="/logout"><Button onClick={handleLogout}>Log Out</Button></Link>
    //                     </NavItem>
    //                 </>
    //               )
    //             case 'admin':
    //               return (
    //                 <>
    //                 <NavItem className="mr-3">
    //                     <Link to="/admin/new_cafe"><Button>Add Cafe</Button></Link>
    //                 </NavItem>
    //                 <NavItem className="mr-3">
    //                     <Link to="/admin/new_coffee"><Button>Add Coffee</Button></Link>
    //                 </NavItem>
    //                   <NavItem className="mr-3">
    //                     <Link to="/logout"><Button onClick={handleLogout}>Log Out</Button></Link>
    //                   </NavItem>
    //               </>
    //             )
    //         }
    //     }
    //     return null
    // }
    // return (
        // <header>
        //     <Navbar color="light" light>
        //     <Link to="/">
        //         <img src="logo.png" alt="Logo" style={{ height: "50px" }} />
        //     </Link>
        //     <div>
        //         <h1>COFFIENDS</h1>
        //     </div>
        //     <Nav>
        //         {roleConditional()}
        //     </Nav>
        //     </Navbar>
        // </header>
      //   );
      // };