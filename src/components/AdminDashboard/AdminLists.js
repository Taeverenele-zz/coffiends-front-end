import React, { useState } from "react";
import {
  Navbar,
  Container,
  Row,
  Col,
  Input,
  Button,
  NavItem,
  Nav,
  Table,
} from "reactstrap";

const AdminLists = (props) => {
  const {
    cafes,
    deleteCafe,
    coffees,
    setCoffees,
    deleteCoffee,
    setCafeData,
    coffeeData,
    setCoffeeData,
  } = props;
  const [cafeSearchTerm, setCafeSearchTerm] = useState("");
  const [coffeeSearchTerm, setCoffeeSearchTerm] = useState("");

  const handleCafeSearchTermChange = (e) => {
    setCafeSearchTerm(e.target.value);
  };
  const handleCoffeeSearchTermChange = (e) => {
    setCoffeeSearchTerm(e.target.value);
  };

  const editCafe = (cafe) => {
    setCafeData(cafe);
    props.history.push("/admin/edit_cafe");
  };
  const editCoffee = (coffee) => {
    setCoffeeData(coffee);
    props.history.push("/admin/edit_coffee");
  };

  return (
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
                .filter((cafe) =>
                  cafe.cafe_name
                    .trim()
                    .toLowerCase()
                    .includes(cafeSearchTerm.trim().toLowerCase())
                )
                .map((cafe) => (
                  <tr key={cafe._id}>
                    <td style={{ width: "70%" }}>{cafe.cafe_name}</td>
                    <td>
                      <Button onClick={() => editCafe(cafe)}>Edit</Button>
                    </td>
                    <td>
                      <Button onClick={() => deleteCafe(cafe._id)}>
                        Delete
                      </Button>
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
                .filter((coffee) =>
                  coffee.name
                    .trim()
                    .toLowerCase()
                    .includes(coffeeSearchTerm.trim().toLowerCase())
                )
                .map((coffee) => (
                  <tr key={coffee._id}>
                    <td style={{ width: "70%" }}>{coffee.name}</td>
                    <td>
                      <Button onClick={() => editCoffee(coffee)}>Edit</Button>
                    </td>
                    <td>
                      <Button onClick={() => deleteCoffee(coffee._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLists;
