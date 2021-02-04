import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input, Container, Row } from "reactstrap";
import StateContext from "../utils/store";

const LoginView = (props) => {
  const [ loginDetails, setLoginDetails ] = useState({ username: "", password: "" });
  const { dispatch } = useContext(StateContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch(`${process.env.REACT_APP_BACK_END_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(loginDetails),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.status === 400) {
      alert("Invalid login details");
    } else {
      const userDetails = await response.json();
      await dispatch({
        type: "setLoggedInUser",
        data: userDetails
      });

      setLoginDetails({
        username: "",
        password: "",
        user_name: "",
        role: "user",
        phone: "",
      });

      props.history.push("/");
    };
  };

  return (
    <Container>
      <Row className="justify-content-center margin-add-top">
        <h1>Log In</h1>
      </Row>
      <Row className="justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin ">
              <Label for="exampleEmail" className="mr-sm-2">
                Email:
              </Label>
              <Input
                type="email"
                name="username"
                id="exampleEmail"
                onChange={handleChange}
                value={loginDetails.username}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="examplePassword" className="mr-sm-2">
                Password:
              </Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                onChange={handleChange}
                value={loginDetails.password}
              />
            </FormGroup>
          </Row>
          <Row className="justify-content-center">
            <Button className="login-form-margin-top" color="success">
              LOG IN
            </Button>
          </Row>
        </Form>
      </Row>
      <br />
      <Row className="login-form-margin-top justify-content-center">
        Not signed up yet?
      </Row>
      <Row className="login-form-margin-top justify-content-center">
        <Link to="/register">Sign Up Now!</Link>
      </Row>
    </Container>
  );
};

export default LoginView;
