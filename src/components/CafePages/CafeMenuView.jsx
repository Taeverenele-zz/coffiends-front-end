import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Input, Button, Table, Form, FormGroup } from "reactstrap";
import StateContext from "../../utils/store";

const CafeMenuView = () => {
  const [ menu, setMenu ] = useState([]);
  const [ coffees, setCoffees ] = useState([]);
  const [ newCoffee, setNewCoffee ] = useState("");
  const [ newPrice, setNewPrice ] = useState("");

  const { store } = useContext(StateContext);
  const { loggedInUser, allCoffees } = store;

  useEffect(() => {
    if (loggedInUser) {
      getMenuData();
    };
  }, [ loggedInUser ]);

  const getMenuData = async () => {
    const cafeMenuArr = [];
 
    let response = await axios.get(`${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/menu`);
    const currentMenu = await response.data;
    setMenu(currentMenu);
    
    await currentMenu.forEach(element => {cafeMenuArr.push(element.coffee._id)});

    response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/coffees/available`, { menu: cafeMenuArr, coffees: allCoffees });
    const availableCoffees = await response.data;
    setCoffees(availableCoffees);
  };

  const handleCoffeeSelect = (e) => {
    setNewCoffee(e.target.value);
  };

  const handlePrice = (e) => {
    setNewPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMenuItem = {
      coffee: newCoffee,
      price: newPrice,
      cafe: loggedInUser.cafe._id
    };

    const response = await axios.post(`${process.env.REACT_APP_BACK_END_URL}/menuitems`, newMenuItem);
    const newItem = await response.data;

    const cafeMenu = await loggedInUser.cafe.menu
    cafeMenu.push(newItem._id)

    await axios.put(`${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/menu`, { menu: cafeMenu });

    setNewCoffee("");
    setNewPrice("");
    getMenuData();
  };

  const handleDelete = async (menuitem) => {
    await axios.delete(`${process.env.REACT_APP_BACK_END_URL}/menuitems/${menuitem._id}`);

    const updatedCafeMenu = loggedInUser.cafe.menu.filter((id) => id !== menuitem._id)

    await axios.put(`${process.env.REACT_APP_BACK_END_URL}/cafes/${loggedInUser.cafe._id}/menu`, { menu: updatedCafeMenu });

    getMenuData();
  };

  return (
    <>
      {(loggedInUser && menu) ? (
        <>
        <Container fluid="true" className="background full-height ">
          <div className="Admin-Dashboard-Center">
            <h2 className="cafe-name-menu">{loggedInUser.cafe.cafe_name}</h2>
          </div>
          <div>
            <Row>
              <Col>
                <div className="Admin-Dashboard-Center">
                <Table responsive className=" table-background" style={{width: "60%"}}  >
                  <thead>
                    <tr>
                      <th>Coffee</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu ? (menu.map((item) => (
                      <tr key={item._id}>
                        <td>{item.coffee.name}</td>
                        <td>{item.coffee.description}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <Button color="danger" onClick={() => handleDelete(item)} >Delete</Button>
                        </td>
                      </tr>
                    ))) : <></>}
                  </tbody>
                </Table>
                </div>
              </Col>
            </Row>
          </div>
          <hr />
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="Admin-Dashboard-Center">
              <h4 className="cafe-name-menu text-center">Add Coffee To Menu</h4>
              <br />
                <Form onSubmit={handleSubmit} className="edit-form-form ">
                  <FormGroup>
                    <select className="fill-boxes" style={{height: '40px', width: '100%', padding: '5px', border: '1px solid #ced4da', borderRadius: '.25rem'}} onChange={handleCoffeeSelect} value={newCoffee.name} >
                    <option defaultValue="">D</option>
                      {coffees.map((coffee) => 
                        <option key={coffee._id} value={coffee._id}>{coffee.name}</option>
                      )}
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <Input className="fill-boxes" style={{color: "white"}} type="Number" placeholder="Price (eg 3.5)" onChange={handlePrice} value={newPrice} />
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
