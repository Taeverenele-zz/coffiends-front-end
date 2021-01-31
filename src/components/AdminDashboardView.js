import { React, useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Input,
  Button,
  Form,
  NavItem,
  Nav,
  Table,
} from "reactstrap";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

import NewCafeForm from "./NewCafeForm";
import NewCoffeeForm from "./NewCoffeeForm";

const AdminDashboardView = (props) => {
  const { cafes, setCafes, reload, setReload, coffees, setCoffees } = props;
  const [isEditing, setIsEditing] = useState(false);
  const initialState = {
    cafe_name: "",
    address: "",
    operating_hours: [],
    location: [],
  };
  const [cafeData, setCafeData] = useState(initialState);
  const [cafeSearchTerm, setCafeSearchTerm] = useState("");
  const [coffeeSearchTerm, setCoffeeSearchTerm] = useState("");

  const editCafe = (cafe) => {
    setIsEditing(true);
    setCafeData(cafe);
  };
  const addCafe = (newCafe) => {
    setCafes([...cafes, newCafe]);
  };

  const deleteCafe = (id) => {
    axios
      .delete(`http://localhost:5000/cafes/${id}`, cafes)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  const handleCafeSearchTermChange = (e) => {
    setCafeSearchTerm(e.target.value);
  };
  const handleCoffeeSearchTermChange = (e) => {
    setCoffeeSearchTerm(e.target.value);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar color="light" light>
          <Link to="/">
            <img src="logo.png" alt="Logo" style={{ height: "50px" }} />
          </Link>
          <div>
            <h1>COFFIENDS</h1>
          </div>
          <Nav>
            <NavItem className="mr-3">
              <Link to="/cafes/new">Add Cafe</Link>
            </NavItem>
            <NavItem className="mr-3">
              <Link to="/coffees/new">Add Coffee</Link>
            </NavItem>
            <NavItem className="mr-3">
              <Link to="/">Log Out</Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>
          <Route
            exact
            path="/cafes/new"
            render={(props) => (
              <NewCafeForm
                {...props}
                cafeData={cafeData}
                setCafeData={setCafeData}
                addCafe={addCafe}
              />
            )}
          />
          <Route
            exact
            path="/coffees/new"
            render={(props) => <NewCoffeeForm />}
          />
        </Switch>
        <Container>
          <Row className="justify-content-center margin-add-top">
            <h1>Admin Dashboard</h1>
          </Row>

          <Row>
            <Col sm={{ size: 6 }} className="margin-add-top">
              <h3 className="text-center">All Cafes</h3>
              <Input
                placeholder="Search"
                value={cafeSearchTerm}
                onChange={handleCafeSearchTermChange}
              />
              <Table className="margin-add-top">
                <thead>
                  <tr>
                    <th>Cafe Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cafes
                    .filter((c) =>
                      c.cafe_name
                        .trim()
                        .toLowerCase()
                        .includes(cafeSearchTerm.trim().toLowerCase())
                    )
                    .map((cafe) => (
                      <tr key={cafe._id}>
                        <td>{cafe.cafe_name}</td>
                        <td>
                          <Button>Edit</Button>
                        </td>
                        <td>
                          <Button>Delete</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
            <Col sm={{ size: 6 }} className="margin-add-top">
              <h3 className="text-center">All Coffees</h3>
              <Input
                placeholder="Search"
                value={coffeeSearchTerm}
                onChange={handleCoffeeSearchTermChange}
              />
              <Table className="margin-add-top">
                <thead>
                  <tr>
                    <th>Cafe Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {coffees
                    .filter((c) =>
                      c.name
                        .trim()
                        .toLowerCase()
                        .includes(coffeeSearchTerm.trim().toLowerCase())
                    )
                    .map((coffee) => (
                      <tr key={coffee._id}>
                        <td>{coffee.name}</td>
                        <td>
                          <Button>Edit</Button>
                        </td>
                        <td>
                          <Button>Delete</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    </>
  );
};

export default AdminDashboardView;
