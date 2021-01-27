import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const NewCafeForm = (props) => {
  const { addCafe, setCafeData, cafeData, initialState } = props;

  const handleInputChange = (e) => {
    setCafeData({ ...cafeData, [e.target.name]: e.target.value });
  };

  const handleOpeningChange = (e) => {
    setCafeData({ ...cafeData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    if (cafeData.name && cafeData.address) {
      console.log(cafeData);
      axios.post("http://localhost:5000/cafes", cafeData).then((res) => {
        addCafe(res.data);
      });
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
                value={cafeData.name}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input
                name="address"
                value={cafeData.address}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="opening">Opening time:</Label>
              <Input
                name="operating_hours[0]"
                value={cafeData.operating_hours[0] || ""}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "operating_hours",
                      value: [e.target.value, cafeData.operating_hours[1]],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="closing">Closing time:</Label>
              <Input
                name="operating_hours[1]"
                value={cafeData.operating_hours[1] || ""}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "operating_hours",
                      value: [cafeData.operating_hours[0], e.target.value],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Latitude:</Label>
              <Input
                name="location[0]"
                value={cafeData.location[0] || ""}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "location",
                      value: [e.target.value, cafeData.location[1]],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="longitude">Longitude:</Label>
              <Input
                name="location[1]"
                value={cafeData.location[1] || ""}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "location",
                      value: [cafeData.location[0], e.target.value],
                    },
                  })
                }
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
