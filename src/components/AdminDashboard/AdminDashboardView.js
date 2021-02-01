import { React, useState, useEffect } from "react";
import { Navbar, Container, Row, Col, Input, Button, NavItem, Nav, Table } from "reactstrap";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import NewCafeForm from "./NewCafeForm";
import NewCoffeeForm from "./NewCoffeeForm";

const AdminDashboardView = (props) => {
  const { coffees, setCoffees, handleLogout, match } = props;
  const [isEditing, setIsEditing] = useState(false);
  const [cafes, setCafes] = useState([]);
  const initialCafeState = {
    cafe_name: "",
    address: "",
    operating_hours: [],
    location: [],
  };
  const [cafeData, setCafeData] = useState(initialCafeState);
  const [cafeSearchTerm, setCafeSearchTerm] = useState("");
  const [coffeeSearchTerm, setCoffeeSearchTerm] = useState("");

  // Add all coffees and cafes into state
  useEffect(() => {
    getAllCoffees();
    getAllCafes();
  }, [])
  // Get all cafes from database
  const getAllCafes = () => {
    axios.get("http://localhost:5000/cafes/", cafes)
    .then(res => setCafes(res.data))
    .catch(error => console.log(error));
  };
  
  const editCafe = (cafe) => {
    setIsEditing(true);
    console.log('!!!!!!!!', cafe)
    setCafeData(cafe);
  };
  
  const deleteCafe = (id) => {
    axios
    .delete(`http://localhost:5000/cafes/${id}`, cafes)
    .then((res) => setCafes(cafes.filter(cafe => cafe._id !== id)))
    .catch(error => console.log(error));
  };
  const getAllCoffees = () => {
    axios.get("http://localhost:5000/coffees/", coffees)
    .then(res => setCoffees(res.data))
    .catch(error => console.log(error))
  };
  const deleteCoffee = (id) => {
    axios
      .delete(`http://localhost:5000/coffees/${id}`, coffees)
      .then((res) => setCoffees(coffees.filter(coffee => coffee._id !== id)))
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
          <Link to="/admin">
            <img src="logo.png" alt="Logo" style={{ height: "50px" }} />
          </Link>
          <div>
            <h1>COFFIENDS</h1>
          </div>
          <Nav>
            <NavItem className="mr-3">
              <Link to="/admin/new_cafe"><Button>Add Cafe</Button></Link>
            </NavItem>
            <NavItem className="mr-3">
              <Link to="/admin/new_coffee"><Button>Add Coffee</Button></Link>
            </NavItem>
            <NavItem className="mr-3">
              <Link to="/logout"><Button onClick={handleLogout}>Log Out</Button></Link>
            </NavItem>
          </Nav>
        </Navbar>
        <Switch>
          <Route exact path={match.path + '/new_cafe'} render={(props) => (
              <NewCafeForm {...props} cafes={cafes} cafeData={cafeData} setCafeData={setCafeData} setCafes={setCafes} isEditing={isEditing} setIsEditing={setIsEditing} editCafe={editCafe} initialCafeState={initialCafeState} />
            )}
          />
          <Route exact path="/admin/new_coffee" render={(props) => (<NewCoffeeForm {...props} />)}
          />
          <Route exact path="/admin" render={(props) => (<Container>
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
        </Container>)}
          />
        </Switch>
        
      </BrowserRouter>
    </>
  );
};

export default AdminDashboardView;
