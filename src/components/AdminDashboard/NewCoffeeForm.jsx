import React, { useEffect } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const NewCoffeeForm = (props) => {
  const {
    coffees,
    setCoffees,
    coffeeData,
    setCoffeeData,
    initialCoffeeData,
    isEditing,
    loggedInUser,
  } = props;

  useEffect(() => {
    if (!loggedInUser) {
      props.history.push("/");
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoffeeData({ ...coffeeData, [name]: value });
  };
  const addCoffee = (newCoffee) => {
    setCoffees([...coffees, newCoffee]);
  };
  const saveNewCoffee = () => {
    return axios
      .post(`${process.env.REACT_APP_BACK_END_URL}/coffees`, coffeeData)
      .then(() => {
        addCoffee(coffeeData);
        setCoffeeData(initialCoffeeData);
      })
      .catch((error) => console.log(error));
  };
  const updateCoffee = (newCoffee) => {
    console.log("1", coffees);
    setCoffees(
      coffees.map((coffee) =>
        coffee._id === coffeeData._id ? newCoffee : coffee
      )
    );
    console.log("2", coffees);
    setCoffeeData(initialCoffeeData);
  };

  const updateExistingCoffee = () => {
    axios
      .put(
        `${process.env.REACT_APP_BACK_END_URL}/coffees/${coffeeData._id}`,
        coffeeData
      )
      .then((res) => updateCoffee(res.data))
      .catch((error) => console.log(error));
    props.history.push("/");
  };
  const cancelEditing = () => {
    setCoffeeData(initialCoffeeData);
    props.history.push("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateExistingCoffee();
    } else {
      saveNewCoffee()
        .then(() => {
          props.history.push("/");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>{isEditing ? "Edit" : "Add New"} Coffee</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                name="name"
                value={coffeeData.name}
                onChange={handleInputChange}
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input
                name="description"
                value={coffeeData.description}
                onChange={handleInputChange}
                required
              ></Input>
            </FormGroup>
            <Button>Submit</Button>
            <Button onClick={cancelEditing}>Cancel</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default NewCoffeeForm;
