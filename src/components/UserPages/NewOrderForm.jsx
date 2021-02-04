import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StripeForm from "../StripeForm";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

const NewOrderForm = (props) => {
  const { userCoffee, cafe, loggedInUser } = props;
  const [size, setSize] = useState("Regular");
  const [milk, setMilk] = useState("Regular Milk");
  const [sugar, setSugar] = useState(0);

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    if (!loggedInUser) {
      props.history.push("/");
    } else {
      let time = new Date().getTime();
      let date = new Date(time);
      let hr = String(date.getHours());
      let min = String(date.getMinutes());
      if (hr.length < 2) {
        hr = "0" + hr;
      }
      if (min.length < 2) {
        min = "0" + min;
      }

      let defMilk = "";
      if (userCoffee.name === "Espresso" || userCoffee.name === "Long Black") {
        defMilk = "No milk";
      } else {
        defMilk = "Regular";
      }

      setOrderDetails({
        cafe: cafe._id,
        user: loggedInUser._id,
        coffee: userCoffee.name,
        size: "Regular",
        milk: defMilk,
        sugar: 0,
        pickup_time: `${hr}:${min}`,
        total: userCoffee.price,
        email: loggedInUser.username,
      });
    }
  }, []);

  const handleSize = (event) => {
    setSize(event.target.value);
    if (event.target.value === "Large") {
      setOrderDetails({ ...orderDetails, total: userCoffee.price + 0.5 });
    } else if (event.target.value === "Small") {
      setOrderDetails({ ...orderDetails, total: userCoffee.price - 0.5 });
    } else if (event.target.value === "Regular") {
      setOrderDetails({ ...orderDetails, total: userCoffee.price });
    }
  };

  const handleMilk = (event) => {
    setMilk(event.target.value);
    setOrderDetails({ ...orderDetails, milk: event.target.value });
  };

  const handleSugar = (event) => {
    setSugar(event.target.value);
    setOrderDetails({ ...orderDetails, sugar: event.target.value });
  };

  const handlePickupTime = (event) => {
    let time = new Date().getTime();
    if (event.target.value === "10") {
      time = time + 600000;
    } else if (event.target.value === "20") {
      time = time + 1200000;
    } else if (event.target.value === "30") {
      time = time + 1800000;
    }
    let date = new Date(time);
    let hr = String(date.getHours());
    let min = String(date.getMinutes());
    if (hr.length < 2) {
      hr = "0" + hr;
    }
    if (min.length < 2) {
      min = "0" + min;
    }
    setOrderDetails({ ...orderDetails, pickup_time: `${hr}:${min}` });
  };

  return (
    <>
      {!orderDetails ? (
        <></>
      ) : (
        <Container>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 8, offset: 2 }}>
              <Form>
                <FormGroup>
                  <h4>
                    Ordering: {userCoffee.name} from {cafe.cafe_name}
                  </h4>
                </FormGroup>
                <FormGroup>
                  <Label for="size">Size:</Label>
                  <select
                    name="size"
                    style={{
                      height: "40px",
                      width: "100%",
                      padding: "5px",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                    }}
                    onChange={handleSize}
                    value={size}
                  >
                    <option defaultValue=""> -- select coffee size -- </option>
                    <option value="Regular">Regular</option>
                    {userCoffee.name === "Espresso" ? (
                      <></>
                    ) : (
                      <>
                        <option value="Small">Small -$0.50</option>
                        <option value="Large">Large +$0.50</option>
                      </>
                    )}
                  </select>
                </FormGroup>
                <FormGroup>
                  {userCoffee.name === "Espresso" ||
                  userCoffee.name === "Long Black" ? (
                    <></>
                  ) : (
                    <>
                      <Label for="milk">Milk:</Label>
                      <select
                        name="milk"
                        style={{
                          height: "40px",
                          width: "100%",
                          padding: "5px",
                          border: "1px solid #ced4da",
                          borderRadius: ".25rem",
                        }}
                        onChange={handleMilk}
                        value={milk}
                      >
                        <option defaultValue="">
                          {" "}
                          -- select milk type --{" "}
                        </option>
                        <option value="Regular Milk">Full Cream</option>
                        <option value="Skim Milk">Skim</option>
                        <option value="Soy Milk">Soy</option>
                        <option value="Almond Milk">Almond</option>
                      </select>
                    </>
                  )}
                </FormGroup>
                <FormGroup>
                  <Label for="sugar">Sugar:</Label>
                  <select
                    name="sugar"
                    style={{
                      height: "40px",
                      width: "100%",
                      padding: "5px",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                    }}
                    onChange={handleSugar}
                    value={sugar}
                  >
                    <option defaultValue="">
                      {" "}
                      -- select sugar preference --{" "}
                    </option>
                    <option value="0">No Sugar</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <Label for="pickup">Pickup Time:</Label>
                  <select
                    name="pickup"
                    style={{
                      height: "40px",
                      width: "100%",
                      padding: "5px",
                      border: "1px solid #ced4da",
                      borderRadius: ".25rem",
                    }}
                    onChange={handlePickupTime}
                  >
                    <option defaultValue=""> -- select pickup time -- </option>
                    <option value="0">ASAP!</option>
                    <option value="10">10 mins</option>
                    <option value="20">20 mins</option>
                    <option value="30">30 mins</option>
                  </select>
                </FormGroup>
                <FormGroup>
                  <StripeForm orderDetails={orderDetails} />
                </FormGroup>
                <FormGroup>
                  <Link to="/">
                    <Button color="warning">Cancel</Button>
                  </Link>
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
