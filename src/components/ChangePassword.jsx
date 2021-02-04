import React from "react";
import { Form, FormGroup, Input, Label, Row, Col, Button, Container } from "reactstrap";

const ChangePassword = (props) => {
  const { loggedInUser } = props;

  const handleInputChange = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
    <Container fluid="true" className="background full-height Admin-Dashboard-Center ">
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2 className="heading-colors margin-add-top">Change Password</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="edit-form-form  ">
            <FormGroup>
              <div className="text-center">
               <Label for="user_name" className="border-color">Old Password:</Label>
              </div>
              <Input
                type="text"
                name="user_name"
                value={loggedInUser.user_name}
                onChange={handleInputChange}
                className="fill-boxes"
                required
              ></Input>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ChangePassword;
