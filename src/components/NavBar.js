import React from "react";
import { Link } from "react-router-dom";
import { Navbar,Button, NavItem, Nav } from "reactstrap";


const NavBar = (props) => {
    
    const {handleLogout, loggedInUser } = props

 

    const roleConditional = () => {
        if (loggedInUser) {
            switch (loggedInUser.role) {
                case 'cafe':
                  return (
                      <>
                         <NavItem className="mr-3">
                            <Link to="/menu"><Button >Menu</Button></Link>
                        </NavItem>
                            <NavItem className="mr-3">
                            <Link to="/logout"><Button onClick={handleLogout}>Log Out</Button></Link>
                        </NavItem>
                      </>
                  )
                case 'user':
                  return (
                      <>
                        <NavItem className="mr-3">
                             <Link to="/orders"><Button>Orders</Button></Link>
                        </NavItem>
                        <NavItem className="mr-3">
                             <Link to="/logout"><Button onClick={handleLogout}>Log Out</Button></Link>
                        </NavItem>
                    </>
                  )
                case 'admin':
                  return (
                    <>
                    <NavItem className="mr-3">
                        <Link to="/admin/new_cafe"><Button>Add Cafe</Button></Link>
                    </NavItem>
                    <NavItem className="mr-3">
                        <Link to="/admin/new_coffee"><Button>Add Coffee</Button></Link>
                    </NavItem>
                      <NavItem className="mr-3">
                        <Link to="/logout"><Button onClick={handleLogout}>Log Out</Button></Link>
                      </NavItem>
                  </>
                )
            }
        }
        return null
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
                {roleConditional()}
            </Nav>
            </Navbar>
        </header>
    )
}


export default NavBar
