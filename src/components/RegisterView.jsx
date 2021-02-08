import React, { useContext, useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Container, Row } from "reactstrap";
import StateContext from "../utils/store";

const RegisterView = (props) => {
  const { dispatch } = useContext(StateContext);
  const [ loginDetails, setLoginDetails ] = useState({
    username: "",
    password: "",
    user_name: "",
    role: "user",
    phone: ""
  });

  useEffect(() => {
    dispatch({ type: "setButtonToggle", data: "signup" });
  }, [ dispatch ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/users/register`, {
      method: "POST",
      body: JSON.stringify(loginDetails),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const userDetails = await response.json();
    
    if (userDetails.message) {
      dispatch({ type: "setFlashMessage", data: `${userDetails.message}` });
    } else if (userDetails._id) {
      await dispatch({
        type: "setLoggedInUser",
        data: userDetails
      });

      dispatch({ type: "setFlashMessage", data: `Signup successful! Welcome ${userDetails.user_name}` });
      
      setLoginDetails({
        username: "",
        password: "",
        user_name: "",
        role: "user",
        phone: "",
      });

      props.history.push("/home");
    }
  };

  return (
    <Container fluid="true" className="background full-height">
      <Row className="justify-content-center margin-add-top">
        <h1 className="heading-colors" >Register</h1>
      </Row>
      <Row className="justify-content-center text-center">
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin ">
              <Label for="username" className="mr-sm-2 border-color">
                Email:
              </Label>
              <Input
                type="email"
                name="username"
                onChange={handleChange}
                value={loginDetails.username}
                required
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="password" className="mr-sm-2 border-color">
                Password:
              </Label>
              <Input
                type="password"
                name="password"
                onChange={handleChange}
                value={loginDetails.password}
                required
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="user_name" className="mr-sm-2 border-color">
                Name:
              </Label>
              <Input
                type="name"
                name="user_name"
                onChange={handleChange}
                value={loginDetails.user_name}
                required
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="phone" className="mr-sm-2 border-color">
                Phone:
              </Label>
              <Input
                type="mobileNumber"
                name="phone"
                onChange={handleChange}
                value={loginDetails.phone}
                required
              />
            </FormGroup>
          </Row>
          <Row className="justify-content-center">
            <Button data-testid="register-btn" className="login-form-margin-top button-color">Register</Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default RegisterView;
