import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Input, Button, Table } from "reactstrap";
import axios from "axios";
import StateContext from "../../utils/store";

const AdminLists = () => {
  const [cafeSearchTerm, setCafeSearchTerm] = useState("");
  const [coffeeSearchTerm, setCoffeeSearchTerm] = useState("");

  const { store, dispatch } = useContext(StateContext);
  const { allCoffees, allCafes } = store;

  useEffect(() => {
    axios
      .get("http://localhost:5000/cafes/")
      .then((res) => {
        dispatch({
          type: "getAllCafes",
          data: res.data
        });
      })
      .catch((error) => console.log(error));
    dispatch({
      type: "setCafeData",
      data: null
    });
  }, [ dispatch ]);

  const deleteCafe = (id) => {
    axios
      .delete(`http://localhost:5000/cafes/${id}`)
      .then(() => {
        dispatch({
          type: "getAllCafes",
          data: allCafes.filter((cafe) => cafe._id !== id)
        });
      })
      .catch((error) => console.log(error));
  };

  const deleteCoffee = (id) => {
    axios
      .delete(`http://localhost:5000/coffees/${id}`)
      .then(() => {
        dispatch({
          type: "getAllCoffees",
          data: allCoffees.filter((coffee) => coffee._id !== id)
        });
      })
      .catch((error) => console.log(error));
  };

  const handleCafeSearchTermChange = (e) => {
    setCafeSearchTerm(e.target.value);
  };
  const handleCoffeeSearchTermChange = (e) => {
    setCoffeeSearchTerm(e.target.value);
  };

  const editCafe = (cafe) => {
    dispatch({
      type: "setCafeData",
      data: cafe
    });
    // setCafeData(cafe);
    // props.history.push("/admin/edit_cafe");
  };
  const editCoffee = (coffee) => {
    dispatch({
      type: "setCoffeeData",
      data: coffee
    });
    // setCoffeeData(coffee);
    // props.history.push("/admin/edit_coffee");
  };

  return (
    <Container>
      {!allCafes ? (<></>) : (
        <>
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
                  {allCafes
                    .filter((cafe) => cafe.cafe_name.trim().toLowerCase().includes(cafeSearchTerm.trim().toLowerCase()))
                    .map((cafe) => (
                      <tr key={cafe._id}>
                        <td style={{ width: "70%" }}>{cafe.cafe_name}</td>
                        <td>
                          <Link to="/admin/edit_cafe"><Button onClick={() => editCafe(cafe)}>Edit</Button></Link>
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
                    <th>Coffee Name</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allCoffees
                    .filter((coffee) => coffee.name.trim().toLowerCase().includes(coffeeSearchTerm.trim().toLowerCase()))
                    .map((coffee) => (
                      <tr key={coffee._id}>
                        <td style={{ width: "70%" }}>{coffee.name}</td>
                        <td>
                          <Link to="/admin/edit_coffee"><Button onClick={() => editCoffee(coffee)}>Edit</Button></Link>
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
