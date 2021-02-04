import React from "react";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import axios from "axios";

const EditUser = (props) => {
  const { loggedInUser, setLoggedInUser } = props;
  const updateExistingUser = () => {
    axios
      .patch(
        `${process.env.REACT_APP_BACK_END_URL}/users/${loggedInUser._id}`,
        loggedInUser
      )
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
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
              <h2>Edit Profile</h2>
              <Button
                onClick={() => {
                  props.history.push("/user/change_password");
                }}
              >
                Change Password
              </Button>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="user_name">User Name:</Label>
                  <Input
                    type="text"
                    name="user_name"
                    value={loggedInUser.user_name}
                    onChange={handleInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="username">Email:</Label>
                  <Input
                    type="email"
                    name="username"
                    value={loggedInUser.username}
                    onChange={handleInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="phone">Phone:</Label>
                  <Input
                    type="phone"
                    name="phone"
                    value={loggedInUser.phone}
                    onChange={handleInputChange}
                    required
                  ></Input>
                </FormGroup>
                <Button>Submit</Button>
              </Form>
            </Col>
          </Row>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default EditUser;
