import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table } from "reactstrap";

const CafeMenuView = (props) => {
  const { loggedInUser, coffees } = props;
  const [ menu, setMenu ] = useState([]);
  const [ newCoffee, setNewCoffee ] = useState("");
  const [ newPrice, setNewPrice ] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cafes/${loggedInUser.cafe._id}/menu`)
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));    
  }, []);

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
  };

  const handleDelete = async (menuitem) => {
    let response = await axios.delete(`http://localhost:5000/menuitems/${menuitem._id}`);
    const delResp = await response.data;

    let updatedCafeMenu = loggedInUser.cafe.menu.filter((id) => id !== menuitem._id)

    response = await axios.put(`http://localhost:5000/cafes/${loggedInUser.cafe._id}/menu`, { menu: updatedCafeMenu });
    const newMenuThing = await response.data;
    console.log(newMenuThing);
  };

  return (
    <>
      {(loggedInUser && menu) ? (
        <>
          <h2>{loggedInUser.cafe.cafe_name}</h2>
          <Link to="/dashboard"><button>BACK</button></Link>
          <div className="mt-4">
            <Row>
              <Col>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Coffee</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu ? (menu.map((item) => (
                      <tr key={item._id}>
                        <td>{item.coffee.name}</td>
                        <td>{item.coffee.description}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>
                          <button onClick={() => handleDelete(item)} >Delete</button>
                        </td>
                      </tr>
                    ))) : <></>}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </div>
          <hr />
          <h4>Add Coffee To Menu</h4>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <select onChange={handleCoffeeSelect} value={newCoffee.name} >
              <option disabled selected value> -- select coffee -- </option>
                {coffees.map((coffee) => 
                  <option key={coffee._id} value={coffee._id}>{coffee.name}</option>
                )}
              </select>
            </div>
            <br />
            <div>
              <input type="Number" placeholder="Price (eg 3.5)" onChange={handlePrice} value={newPrice} />
            </div>
            <br />
            <div>
              <button>Add</button>
            </div>
          </form>
        </>
      ) : <h3>fetching data...</h3>}
    </>
  );
};

export default CafeMenuView;
