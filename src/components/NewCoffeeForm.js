import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const NewCoffeeForm = (props) => {
  const { updateCoffeeArray } = props;
  const initialState = {
    name: "",
    description: "",
  };
  const [eachEntry, setEachEntry] = useState(initialState);
  const { name, description } = eachEntry;

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    updateCoffeeArray(eachEntry);
    axios
      .post("http://localhost:5000/coffees", eachEntry)
      .then((res) => console.log(res.data));
    setEachEntry(initialState);
  };

  return (
    <div>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>Add New Coffee</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleFinalSubmit}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                name="name"
                placeholder="coffee name"
                value={name}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="description">Description:</Label>
              <Input
                name="description"
                placeholder="description"
                value={description}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default NewCoffeeForm;
