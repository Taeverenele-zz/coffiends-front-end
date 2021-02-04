// import React, { useContext, useEffect } from "react";
// import axios from "axios";
// import StateContext from "../../utils/store";
// import AdminLists from "./AdminLists";

// const AdminHome = () => {
//   const { dispatch } = useContext(StateContext);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/cafes/")
//       .then((res) => {
//         dispatch({
//           type: "getAllCafes",
//           data: res.data
//         });
//       })
//       .catch((error) => console.log(error));
//   }, [ dispatch ]);

//   return (
//     <>
//       <AdminLists />
//     </>
//   );
// };

// export default AdminHome;

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
    axios.get("http://localhost:5000/cafes/")
      .then((res) => { dispatch({ type: "getAllCafes", data: res.data }) })
      .catch((error) => console.log(error));
    
    dispatch({ type: "setCafeData", data: null });
    
    axios.get("http://localhost:5000/coffees/")
      .then((res) => { dispatch({ type: "getAllCoffees", data: res.data }) })
      .catch((err) => console.log(err));
    
    dispatch({ type: "setCoffeeData", data: null });
  }, [ dispatch, reload ]);

  const deleteCafe = (id) => {
    axios.delete(`http://localhost:5000/cafes/${id}`)
      .then(() => { reload ? setReload(false) : setReload(true) })
      .catch((error) => console.log(error));
  };

  const deleteCoffee = (id) => {
    axios.delete(`http://localhost:5000/coffees/${id}`)
      .then(() => { reload ? setReload(false) : setReload(true) })
      .catch((error) => console.log(error));
  };

  const handleCafeSearchTermChange = (e) => {
    setCafeSearchTerm(e.target.value);
  };
  const handleCoffeeSearchTermChange = (e) => {
    setCoffeeSearchTerm(e.target.value);
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
                          <Link to="/admin/cafe/edit"><Button onClick={() => dispatch({ type: "setCafeData", data: cafe })}>Edit</Button></Link>
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
                          <Link to="/admin/coffee/edit"><Button onClick={() => dispatch({ type: "setCoffeeData", data: coffee })}>Edit</Button></Link>
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
