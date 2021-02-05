import React, { useContext, useState } from "react";
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
      alert(userDetails.message);
    } else if (userDetails._id) {
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
              <Label for="exampleEmail" className="mr-sm-2 border-color">
                Email:
              </Label>
              <Input
                type="email"
                name="username"
                id="exampleEmail"
                onChange={handleChange}
                className="fill-boxes"
                value={loginDetails.username}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="examplePassword" className="mr-sm-2 border-color">
                Password:
              </Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                onChange={handleChange}
                className="fill-boxes"
                value={loginDetails.password}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="exampleName" className="mr-sm-2 border-color">
                Name:
              </Label>
              <Input
                type="name"
                name="user_name"
                id="exampleName"
                onChange={handleChange}
                className="fill-boxes"
                value={loginDetails.user_name}
              />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="exampleNumber" className="mr-sm-2 border-color">
                Phone:
              </Label>
              <Input
                type="mobileNumber"
                name="phone"
                id="numberExample"
                onChange={handleChange}
                className="fill-boxes"
                value={loginDetails.phone}
              />
            </FormGroup>
          </Row>
          <Row className="justify-content-center">
            <Button className="login-form-margin-top button-color">Register</Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default RegisterView;
