import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const NewCafeForm = (props) => {
  const { updateCafeArray, currentId, setCurrentId } = props;
  const initialState = {
    name: "",
    address: "",
  };
  const [eachEntry, setEachEntry] = useState(initialState);
  const { name, address } = eachEntry;

  const handleInputChange = (e) => {
    setEachEntry({ ...eachEntry, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    updateCafeArray(eachEntry);
    axios
      .post("http://localhost:5000/cafes", eachEntry)
      .then((res) => console.log(res.data));
    setEachEntry(initialState);
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
