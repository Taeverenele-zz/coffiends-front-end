import React, { useContext } from "react";
import StateContext from "../utils/store";
import axios from "axios";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";

const EditUser = (props) => {
  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser } = store

  const updateExistingUser = () => {
    axios
      .patch(`http://localhost:5000/users/${loggedInUser._id}`, loggedInUser)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "setLoggedInUser",
      data: { ...loggedInUser, [name]: value }
    });
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
