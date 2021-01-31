import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Table } from "reactstrap";

// cab022014@coderacademy.edu.au

const CafeMenuView = (props) => {
  const { loggedInUser } = props;
  // const [ availCoffees, setAvailCoffees ] = useState([]);
  const [ loggedInCafe, setLoggedInCafe ] = useState({});
  const [ menu, setMenu ] = useState([]);
  const [ coffees, setCoffees ] = useState([]);
  const [ newCoffee, setNewCoffee ] = useState("");
  const [ newPrice, setNewPrice ] = useState("");

  useEffect(() => {
    getPageData();
    // getAvailCoffees();
  });

  const getPageData = async () => {
    let response = await axios.get(`http://localhost:5000/cafes/user/601662ec184850a589571570`);
    const cafeDetails = await response.data
    setLoggedInCafe(cafeDetails);

    response = await axios.get(`http://localhost:5000/cafes/${cafeDetails._id}/menu`);
    const menuItems = await response.data;
    setMenu(menuItems);

    response = await axios.get("http://localhost:5000/coffees/", coffees);
    const allCoffees = await response.data;
    setCoffees(allCoffees);
  };

  // getMenuItems();

  // const getAvailCoffees = () => {
  //   let coffIdArr = [];
  //   coffees.map((coffee) => {
  //     coffIdArr.push(coffee._id);
  //   });
  //   menu.map((item) => {
  //     if (coffIdArr.includes(item.coffee._id)) {
  //       coffIdArr = coffIdArr.filter(c => c !== item.coffee._id);
  //     };
  //   });
  //   let newAvailCoffees = [];
  //   coffees.map((coffee) => {
  //     if (coffIdArr.includes(coffee._id)) {
  //       newAvailCoffees.push(coffee);
  //     };
  //   });
  //   setAvailCoffees(newAvailCoffees);
  // };

  const handleCoffeeSelect = (e) => {
    // e.preventDefault();
    setNewCoffee(e.target.value);
  };

  const handlePrice = (e) => {
    // e.preventDefault();
    setNewPrice(e.target.value);
  };

  // const addItemToCafeMenu = async () => {
    
  //   // getMenuItems();
  //   // getAvailCoffees();
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMenuItem = {
      coffee: newCoffee,
      price: newPrice,
      cafe: loggedInCafe._id
    };

    let response = await axios.post("http://localhost:5000/menuitems", newMenuItem);
    const newItem = await response.data;
    console.log(newItem);
    
    // response = await axios.put(`http://localhost:5000/cafes/${loggedInCafe._id}/menu`, { newMenuId: newItem._id });
    // const updatedCafe = await response.data;
    // console.log(updatedCafe);

    // setLoggedInCafe(updatedCafe);

    // addItemToCafeMenu();
    // setNewCoffee("");
    // setNewPrice("");
  };

  return (
    <>
      {(loggedInCafe && menu) ? (
        <>
          <h2>{loggedInCafe.cafe_name}</h2>
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
                          <button>Delete</button>
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
          <form onSubmit={() => handleSubmit}>
            <div>
              <select onChange={() => handleCoffeeSelect} value={newCoffee.name} >
              <option disabled selected value> -- select coffee -- </option>
                {coffees.map((coffee) => 
                  <option key={coffee._id} value={coffee._id}>{coffee.name}</option>
                )}
              </select>
            </div>
            <br />
            <div>
              <input type="Number" placeholder="Price (eg 3.5)" onChange={() => handlePrice} value={newPrice} />
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
