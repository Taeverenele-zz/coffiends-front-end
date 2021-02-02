import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Input, Button, Table, Form, FormGroup } from "reactstrap";

const CafeMenuView = (props) => {
  const { loggedInUser, getUserSession } = props;
  const [ menu, setMenu ] = useState([]);
  const [ coffees, setCoffees ] = useState([]);
  const [ newCoffee, setNewCoffee ] = useState("");
  const [ newPrice, setNewPrice ] = useState("");

  useEffect(() => {
    getMenuData();
  }, []);

  const getMenuData = async () => {
    const user = await getUserSession();
    let cafemenuArr = [];
    let response = await axios.get(`http://localhost:5000/cafes/${user.cafe._id}/menu`);
    const currentMenu = await response.data;
    setMenu(response.data);
    await currentMenu.forEach(element => {cafemenuArr.push(element.coffee._id)});

    response = await axios.get("http://localhost:5000/coffees");
    const allCoffees = await response.data;

    response = await axios.post("http://localhost:5000/coffees/available", { menu: cafemenuArr, coffees: allCoffees });
    const availCoffs = await response.data;
    setCoffees(availCoffs);
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

    let response = await axios.post("http://localhost:5000/menuitems", newMenuItem);
    const newItem = await response.data;

    let cafeMenu = await loggedInUser.cafe.menu
    cafeMenu.push(newItem._id)

    response = await axios.put(`http://localhost:5000/cafes/${loggedInUser.cafe._id}/menu`, { menu: cafeMenu });
    const newMenuThing = await response.data;

    setNewCoffee("");
    setNewPrice("");
    getMenuData();
  };

  const handleDelete = async (menuitem) => {
    let response = await axios.delete(`http://localhost:5000/menuitems/${menuitem._id}`);
    const delResp = await response.data;
    console.log(delResp);

    let updatedCafeMenu = loggedInUser.cafe.menu.filter((id) => id !== menuitem._id)

    response = await axios.put(`http://localhost:5000/cafes/${loggedInUser.cafe._id}/menu`, { menu: updatedCafeMenu });
    const newMenuThing = await response.data;
    console.log(newMenuThing);
    getMenuData();
  };

  return (
    <>
      {(loggedInUser && menu) ? (
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
              </Col>
            </Row>
          </div>
          <hr />
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h4>Add Coffee To Menu</h4>
              <br />
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <select style={{height: '40px', width: '100%', padding: '5px', border: '1px solid #ced4da', borderRadius: '.25rem'}} onChange={handleCoffeeSelect} value={newCoffee.name} >
                    <option defaultValue=""> -- select coffee -- </option>
                      {coffees.map((coffee) => 
                        <option key={coffee._id} value={coffee._id}>{coffee.name}</option>
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
