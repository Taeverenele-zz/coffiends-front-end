import React from "react";
import { Form, FormGroup, Input, Label, Row, Col, Button, Container } from "reactstrap";
import axios from "axios";

const EditUser = (props) => {
  const { loggedInUser, setLoggedInUser } = props;
  const updateExistingUser = () => {
    axios
      .patch(`http://localhost:5000/users/${loggedInUser._id}`, loggedInUser)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoggedInUser({ ...loggedInUser, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateExistingUser();
    props.history.push("/");
  };
  return (
    <>
      {loggedInUser ? (
        <>
        <Container fluid="true" className="background full-height ">
          <Row className="mt-4 ">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center margin-add-top ">
              <h2 className="heading-colors">Edit Profile</h2>
              <Button
              className="button-color"
                onClick={() => {
                  props.history.push("/user/change_password");
                }}
              >
                Change Password
              </Button>
            </Col>
          </Row>
          <Row className="mt-4 justify-content-center">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form onSubmit={handleSubmit} className="edit-form-form">
                <FormGroup>
                  <div className="text-center">
                    <Label for="user_name" className="border-color justify-content-center">User Name:</Label>
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
                <FormGroup>
                <div className="text-center">
                  <Label for="username" className="border-color">Email:</Label>
                </div>
                  <Input
                    type="email"
                    name="username"
                    value={loggedInUser.username}
                    onChange={handleInputChange}
                    className="fill-boxes"
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                <div className="text-center">
                  <Label for="phone" className="border-color">Phone:</Label>
                </div>
                  <Input
                    type="phone"
                    name="phone"
                    value={loggedInUser.phone}
                    onChange={handleInputChange}
                    className="fill-boxes"
                    required
                  ></Input>
                </FormGroup>
                <div className="text-center">
                  <Button className="button-color">Submit</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditUser;
