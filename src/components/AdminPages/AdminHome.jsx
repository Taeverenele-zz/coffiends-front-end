import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";
import StateContext from "../../utils/store";

const AdminLists = () => {
  const [cafeSearchTerm, setCafeSearchTerm] = useState("");
  const [coffeeSearchTerm, setCoffeeSearchTerm] = useState("");
  const [ reload, setReload ] = useState(false);

  const { store, dispatch } = useContext(StateContext);
  const { allCoffees, allCafes } = store;

  useEffect(() => {
    // Get all cafes from database
    axios.get(`${process.env.REACT_APP_BACK_END_URL}/cafes`)
      .then((res) => { dispatch({ type: "getAllCafes", data: res.data }) })
      .catch(() => dispatch({ type: "setFlashMessage", data: "Cafe data could not be retrieved" }));
    
    // Initiate a single cafe object for editing purposes
    dispatch({ type: "setCafeData", data: null });
    
    //Get all coffees database
    axios.get(`${process.env.REACT_APP_BACK_END_URL}/coffees`)
      .then((res) => { dispatch({ type: "getAllCoffees", data: res.data }) })
      .catch(() => dispatch({ type: "setFlashMessage", data: "Coffee data could not be retrieved" }));
    
    // Initiate a single coffee object for editing purposes
    dispatch({ type: "setCoffeeData", data: null });
  }, [ dispatch, reload ]);

  // delete a cafe from database and reload the list of cafes when delete button is clicked
  const deleteCafe = (cafe) => {
    axios.delete(`${process.env.REACT_APP_BACK_END_URL}/cafes/${cafe._id}`)
      .then(() => { 
        axios.delete(`${process.env.REACT_APP_BACK_END_URL}/users/${cafe.owner}`)
        reload ? setReload(false) : setReload(true)
      })
      .catch(() => dispatch({ type: "setFlashMessage", data: "Cafe did not get deleted successfully" }));
  };

    // delete a coffee from database and reload the list of coffees when delete button is clicked
  const deleteCoffee = (id) => {
    axios.delete(`${process.env.REACT_APP_BACK_END_URL}/coffees/${id}`)
      .then(() => { reload ? setReload(false) : setReload(true) })
      .catch((error) => dispatch({ type: "setFlashMessage", data: "Coffee did not get deleted successfully" }));
  };

  // Sets cafeSearchTerm to be used in cafe filter function
  const handleCafeSearchTermChange = (e) => {
    setCafeSearchTerm(e.target.value);
  };
    // Sets coffeeSearchTerm to be used in coffee filter function
  const handleCoffeeSearchTermChange = (e) => {
    setCoffeeSearchTerm(e.target.value);
  };

  return (
    <Container fluid="true" className="background full-height">
      {!allCafes || !allCoffees ? (<></>) : (
        <>
          <Row className="justify-content-center margin-add-top">
            <h1 className="admin-heading-colors ">Admin Dashboard</h1>
          </Row>
          <Row>
            <Col sm={{ size: 6 }} className="margin-add-top Admin-Dashboard-Center ">
              <h3 className="text-center admin-subheading-colors">All Cafes</h3>
              <Input
                placeholder="Search"
                value={cafeSearchTerm}
                onChange={handleCafeSearchTermChange}
                className="search-admin"
              />
              <Table className="margin-add-top table-background search-admin" >
                <thead>
                  <tr>
                    <th>Cafe Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allCafes
                    .filter((cafe) => cafe.cafe_name
                    .trim()
                    .toLowerCase()
                    .includes(cafeSearchTerm.trim().toLowerCase()))
                    .map((cafe) => (
                      <tr key={cafe._id}>
                        <td style={{ width: "70%" }}>{cafe.cafe_name}</td>
                        <td>
                          <Link to="/admin/cafe/edit">
                            <Button onClick={() => dispatch({ type: "setCafeData", data: cafe })}>
                              Edit
                            </Button>
                          </Link>
                        </td>
                        <td>
                          <Button onClick={() => deleteCafe(cafe)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Col>
            <Col sm={{ size: 6 }} className="margin-add-top Admin-Dashboard-Center ">
              <h3 className="text-center admin-subheading-colors">All Coffees</h3>
              <Input
                placeholder="Search"
                value={coffeeSearchTerm}
                onChange={handleCoffeeSearchTermChange}
                className="search-admin"
              />
              <Table className="margin-add-top table-background search-admin">
                <thead>
                  <tr>
                    <th>Coffee Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allCoffees
                    .filter((coffee) => coffee.name
                    .trim()
                    .toLowerCase()
                    .includes(coffeeSearchTerm.trim().toLowerCase()))
                    .map((coffee) => (
                      <tr key={coffee._id}>
                        <td style={{ width: "70%" }}>{coffee.name}</td>
                        <td>
                          <Link to="/admin/coffee/edit">
                            <Button onClick={() => dispatch({ type: "setCoffeeData", data: coffee })}>
                              Edit
                            </Button>
                          </Link>
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
        </>
      )}
    </Container>
  );
};

export default AdminLists;