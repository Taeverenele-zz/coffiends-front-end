import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Input, Button, Table, Form, FormGroup } from "reactstrap";
import StateContext from "../../utils/store";

const CafeMenuView = () => {
  const [ menu, setMenu ] = useState([]);
  const [ coffees, setCoffees ] = useState([]);
  const [ newCoffee, setNewCoffee ] = useState("");
  const [ newPrice, setNewPrice ] = useState("");
  const [ reload, setReload ] = useState(false);

  const { store } = useContext(StateContext);
  const { loggedInUser, dispatch } = store;

  useEffect(() => {
    if (loggedInUser) {
      axios.get(`${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/menu`)
        .then((res) => {
          setMenu(res.data.menu);
          setCoffees(res.data.availCoffees);
        })
        .catch((error) => dispatch({ type: "setFlashMessage", data: error }));
    };
  }, [ reload, loggedInUser, dispatch ]);

  const handleCoffeeSelect = (e) => {
    setNewCoffee(e.target.value);
  };

  const handlePrice = (e) => {
    setNewPrice(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/menu`,
    { type: "add", item: { coffee: newCoffee, price: newPrice }})
      .then(() => {
        setNewCoffee("");
        setNewPrice("");
        reload ? setReload(false) : setReload(true)
      })
      .catch((error) => console.log(error));
    
  };

  const handleDelete = (menuItem) => {
    axios.put(`${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/menu`, { type: "remove", item: menuItem })
      .then(() => {reload ? setReload(false) : setReload(true)})
      .catch((error) => console.log(error));
  };

  return (
    <>
      {loggedInUser && coffees ? (
        <>
        <Container>
          <h2>{loggedInUser.cafe.cafe_name}</h2>
          <div className="mt-4">
            <Row>
              <Col>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Coffee</th>
                      <th>Price</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu ? (menu.map((item) => (
                      <tr key={item.coffeeId}>
                        <td>{item.coffeeName}</td>
                        <td>${item.coffeePrice.toFixed(2)}</td>
                        <td>
                          <Button color="danger" onClick={() => handleDelete(item)}>Delete</Button>
                        </td>
                      </tr>
                    ))) : <></>}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
          <hr />
          {}
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h4>Add Coffee To Menu</h4>
              <br />
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <select onChange={handleCoffeeSelect} style={{height: '40px', width: '100%', padding: '5px', border: '1px solid #ced4da', borderRadius: '.25rem'}} >
                    <option defaultValue=""></option>
                      {coffees.map((coffee) => 
                        <option key={coffee._id} value={coffee._id} coffname={coffee.name}>{coffee.name}</option>
                      )}
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Input type="Number" placeholder="Price (eg 3.5)" onChange={handlePrice} value={newPrice} />
                  </FormGroup>
                  <FormGroup>
                    <Button color="primary" >Add</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </>
      ) : <h3>fetching data...</h3>}
    </>
  );
};

export default CafeMenuView;
