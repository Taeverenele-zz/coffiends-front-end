import { Form, FormGroup, Input, Label, Row, Col, Button, Container } from "reactstrap";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import axios from "axios";
import StateContext from "../../utils/store";
import validatePhone from "../../utils/validatePhone";

const EditUser = (props) => {
  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser } = store;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "setLoggedInUser",
      data: { ...loggedInUser, [name]: value }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePhone(loggedInUser.phone)) {
      axios.patch(`${process.env.REACT_APP_BACK_END_URL}/users/${loggedInUser._id}`, loggedInUser)
        .then(() => props.history.push("/home"))
        .catch(() => dispatch({ type: "setFlashMessage", data: "User details did not save successfully" }));
    } else {
      dispatch({ type: "setFlashMessage", data: "Phone number format invalid"});
    };
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
                      required
                    ></Input>
                  </FormGroup>
                  <FormGroup>
                  <div className="text-center">
                    <Label for="phone" className="border-color">Phone:</Label>
                  </div>
                    <Input
                      type="text"
                      name="phone"
                      minLength="8"
                      maxLength="12"
                      value={loggedInUser.phone}
                      onChange={handleInputChange}
                      required
                    ></Input>
                  </FormGroup>
                  <div className="text-center">
                    <Button className="button-color mr-2">Submit</Button>
                    <Link to="/home">
                      <Button className="button-color ml-2">Cancel</Button>
                    </Link>
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
