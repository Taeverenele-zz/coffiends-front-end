import React from "react";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";

const ChangePassword = (props) => {
  const { loggedInUser } = props;

  const handleInputChange = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>Change Password</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="user_name">Old Password:</Label>
              <Input
                type="text"
                name="user_name"
                value={loggedInUser.user_name}
                onChange={handleInputChange}
                required
              ></Input>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
