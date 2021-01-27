import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";

const EditCafeForm = (props) => {
  const { currentCafe, updateUser } = props;
  const [cafe, setCafe] = useState(currentCafe);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCafe({ ...cafe, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (cafe.name && cafe.address) updateUser(cafe);
  };

  return (
    <div>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>Edit Cafe</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form>
            <FormGroup>
              <Label for="name">Name:</Label>
              <Input
                name="name"
                placeholder="cafe name"
                value={"cafe.name"}
                onChange={handleChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input
                name="address"
                placeholder="address"
                value={"cafe.address"}
                onChange={handleChange}
              ></Input>
            </FormGroup>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={() => props.setEditing(false)}>Cancel</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditCafeForm;
