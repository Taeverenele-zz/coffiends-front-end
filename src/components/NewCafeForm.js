import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const NewCafeForm = (props) => {
  const { addCafe, currentCafe } = props;
  const initialState = {
    name: "",
    address: "",
  };
  const [cafeData, setCafeData] = useState(initialState);
  const { name, address } = cafeData;

  const handleInputChange = (e) => {
    setCafeData({ ...cafeData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (name && address) {
      addCafe(cafeData);
      axios
        .post("http://localhost:5000/cafes", cafeData)
        .then((res) => console.log(res.data));
      setCafeData(initialState);
    } else {
      alert("Cannot leave fields empty!");
    }
  };

  return (
    <div>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>Add New Cafe</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleFinalSubmit}>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                name="name"
                placeholder="cafe name"
                value={name}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input
                name="address"
                placeholder="address"
                value={address}
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

export default NewCafeForm;
