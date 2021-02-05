import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StripeForm from "./StripeForm";
import { Container, Row, Col, Button, Form, FormGroup, Label } from "reactstrap";
import StateContext from "../../utils/store";
import setTimeString from "../../utils/setTimeString";

const NewOrderForm = (props) => {
  const [ size, setSize ] = useState("Regular");
  const [ milk, setMilk ] = useState("Regular");
  const [ sugar, setSugar ] = useState(0);
  const [ orderDetails, setOrderDetails ] = useState(null);

  const { store } = useContext(StateContext);
  const { loggedInUser, userCoffee, orderCafe } = store

  useEffect(() => {
    if (!loggedInUser) {
      props.history.push("/");
    } else {
      setOrderDetails({
        cafe: orderCafe._id,
        user: loggedInUser._id,
        coffee: userCoffee.name,
        size: "Regular",
        milk: "Regular",
        sugar: 0,
        pickup_time: setTimeString(),
        total: userCoffee.price,
        email: loggedInUser.username,
      });
    }
  }, [ loggedInUser, orderCafe, userCoffee, props ]);

  const handleSize = (e) => {
    setSize(e.target.value);
    if (e.target.value === "Large") {
      setOrderDetails({ ...orderDetails, total: userCoffee.price + 0.5 });
    } else if (e.target.value === "Small") {
      setOrderDetails({ ...orderDetails, total: userCoffee.price - 0.5 });
    } else {
      setOrderDetails({ ...orderDetails, total: userCoffee.price });
    }
  };

  const handleMilk = (e) => {
    setMilk(e.target.value);
    setOrderDetails({ ...orderDetails, milk: e.target.value });
  };

  const handleSugar = (e) => {
    setSugar(e.target.value);
    setOrderDetails({ ...orderDetails, sugar: e.target.value });
  };

  const handlePickupTime = (e) => {
    let time = new Date().getTime();
    if (e.target.value === "10") {
      time = time + 600000;
    } else if (e.target.value === "20") {
      time = time + 1200000;
    } else if (e.target.value === "30") {
      time = time + 1800000;
    };
    setOrderDetails({ ...orderDetails, pickup_time: setTimeString(time) });
  };

  return (
    <>
      {!orderDetails ? (<></>) : (
        <Container fluid="true" className="background full-height ">
          <Row className="mt-4 justify-content-center">
            <Col className="Admin-Dashboard-Center">
              <Form className="text-center order-form  ">
                <FormGroup>
                  <h4 className="order-heading-colors">Ordering: {userCoffee.name} from {orderCafe.cafe_name}</h4>
                </FormGroup>
                <FormGroup>
                  <Label for="size" className="border-color">Size:</Label>
                  <select name="size" onChange={handleSize} value={size} className="fill-boxes" style={{ height: "40px", width: "100%", padding: "5px", border: "1px solid #ced4da", borderRadius: ".25rem" }} >
                    <option disabled >SIZE</option>
                    <option value="Regular" >Regular</option>
                    {userCoffee.name === "Espresso" ? (<></>) : (
                      <>
                        <option value="Small">Small -$0.50</option>
                        <option value="Large">Large +$0.50</option>
                      </>
                    )}
                  </select>
                </FormGroup>
                <FormGroup>
                  {userCoffee.name === "Espresso" || userCoffee.name === "Long Black" ? (<></>) : (
                    <>
                      <Label for="milk" className="border-color">Milk:</Label>
                      <select name="milk" onChange={handleMilk} className="fill-boxes" value={milk} style={{ height: "40px", width: "100%", padding: "5px", border: "1px solid #ced4da", borderRadius: ".25rem" }} >
                        <option disabled>MILK</option>
                        <option value="Regular">Full Cream</option>
                        <option value="Skim Milk">Skim</option>
                        <option value="Soy Milk">Soy</option>
                        <option value="Almond Milk">Almond</option>
                      </select>
                    </>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="sugar" className="border-color">Sugar:</Label>
                  <select name="sugar" onChange={handleSugar} value={sugar} className="fill-boxes" style={{ height: "40px", width: "100%", padding: "5px", border: "1px solid #ced4da", borderRadius: ".25rem" }} >
                    <option disabled>SUGARS</option>
                    <option value="0">No Sugar</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label for="pickup" className="border-color">Pickup Time:</Label>
                  <select name="pickup" onChange={handlePickupTime} value="0" className="fill-boxes" style={{ height: "40px", width: "100%", padding: "5px", border: "1px solid #ced4da", borderRadius: ".25rem" }} >
                    <option disabled>PICKUP TIME</option>
                    <option value="0">ASAP</option>
                    <option value="10">10 mins</option>
                    <option value="20">20 mins</option>
                    <option value="30">30 mins</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <StripeForm orderDetails={orderDetails} />
                </FormGroup>
                <FormGroup>
                  <Link to="/"><Button color="warning">Cancel</Button></Link>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default NewOrderForm;
