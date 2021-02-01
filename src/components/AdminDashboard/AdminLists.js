import React, {useState}  from 'react'
import { Navbar, Container, Row, Col, Input, Button, NavItem, Nav, Table } from "reactstrap";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

const AdminLists = (props) => {

  const {cafes, editCafe, deleteCafe,coffees, deleteCoffee} = props;
  const [cafeSearchTerm, setCafeSearchTerm] = useState("");
  const [coffeeSearchTerm, setCoffeeSearchTerm] = useState("");


  const handleCafeSearchTermChange = (e) => {
    setCafeSearchTerm(e.target.value);
  };
  const handleCoffeeSearchTermChange = (e) => {
    setCoffeeSearchTerm(e.target.value);
  };

  return (
    <BrowserRouter>
    <Container>
          <Row className="justify-content-center margin-add-top">
            <h1>Admin Dashboard</h1>
          </Row>
          <Row>
            <Col sm={{ size: 6 }} className="margin-add-top">
              <h3 className="text-center">All Cafes</h3>
              <Input placeholder="Search" value={cafeSearchTerm} onChange={handleCafeSearchTermChange}
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
                    .filter((cafe) =>
                      cafe.cafe_name
                        .trim()
                        .toLowerCase()
                        .includes(cafeSearchTerm.trim().toLowerCase())
                    )
                    .map((cafe) => (
                      <tr key={cafe._id}>
                        <td>{cafe.cafe_name}</td>
                        <td>
                          <Link to='/admin/new_cafe'><Button onClick={() => editCafe(cafe)}>Edit</Button></Link>
                        </td>
                        <td>
                          <Button onClick={() => deleteCafe(cafe._id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
            <Col sm={{ size: 6 }} className="margin-add-top">
              <h3 className="text-center">All Coffees</h3>
              <Input placeholder="Search" value={coffeeSearchTerm} onChange={handleCoffeeSearchTermChange}
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
                    .filter((coffee) =>
                      coffee.name
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
                          <Button onClick={() => deleteCoffee(coffee._id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
        </BrowserRouter>
  )
}

export default AdminLists