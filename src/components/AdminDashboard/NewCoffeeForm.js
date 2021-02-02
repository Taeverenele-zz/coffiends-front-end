import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const NewCoffeeForm = (props) => {
  const {
    updateCoffeeArray,
    coffees,
    setCoffees,
    coffeeData,
    setCoffeeData,
    initialCoffeeData,
    isEditing,
  } = props;
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoffeeData({ ...coffeeData, [name]: value });
  };
  const addCoffee = (newCoffee) => {
    setCoffees([...coffees, newCoffee]);
  };
  const saveNewCoffee = () => {
    return axios.post("http://localhost:5000/coffees", coffeeData).then(() => {
      addCoffee(coffeeData);
      setCoffeeData(initialCoffeeData);
    });
  };
  const updateCoffee = (newCoffee) => {
    setCoffees(
      coffees.map((coffee) =>
        coffee._id == coffeeData._id ? newCoffee : coffee
      )
    );
  };

  const updateExistingCoffee = () => {
    axios
      .put(`http://localhost:5000/coffees/${coffeeData._id}`, coffeeData)
      .then((res) => updateCoffee(res.data))
      .catch((error) => console.log(error));
    props.history.push("/admin");
  };
  const cancelEditing = () => {
    setCoffeeData(initialCoffeeData);
    props.history.push("/admin");
  };

  // const validateForm = () => {
  //   if(coffeeData.name.length < 3) {
  //     setError('Coffee name must be longer than 2 characters')
  //   }
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    // validateForm();
    if (isEditing) {
      updateExistingCoffee();
    } else {
      saveNewCoffee().then(() => {
        props.history.push("/admin");
      });
    }
  };

  return (
    <div>
      <Row>
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
                placeholder="coffee name"
                value={coffeeData.name}
                onChange={handleInputChange}
                required
              ></Input>
              {/* {errors.name && errors.name.type === 'required' && (<p>Name is required</p>)} */}
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input
                name="description"
                placeholder="description"
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
