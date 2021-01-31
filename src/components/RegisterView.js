import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input,Container, Row } from 'reactstrap';

const RegisterView = (props) => {
  const { setLoggedInUser } = props;
  const [ loginDetails, setLoginDetails ] = useState({
    username: "",
    password: "",
    user_name: "",
    role: "user",
    phone: ""
  });

  const handleChange = (e) => {
    setLoginDetails({...loginDetails, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:5000/users/register", {
      method: "POST",
      body: JSON.stringify(loginDetails),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const userDetails = await response.json();
    if (userDetails.message) {
      alert(userDetails.message)
    } else if (userDetails._id) {
      await setLoggedInUser(userDetails);
      setLoginDetails({
        username: "",
        password: "",
        user_name: "",
        role: "user",
        phone: ""
      });
      props.history.push("/");
    };
  };

  return (
    <Container>
      <Row className="justify-content-center margin-add-top">
        <h1>Register</h1>
      </Row>
      <Row className="justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin ">
              <Label for="exampleEmail" className="mr-sm-2">Email:</Label>
              <Input type="email" name="username" id="exampleEmail" onChange={handleChange} value={loginDetails.username} placeholder="Email:" />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="examplePassword" className="mr-sm-2">Password:</Label>
              <Input type="password" name="password" id="examplePassword" onChange={handleChange} value={loginDetails.password} placeholder="Password:" />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="exampleName" className="mr-sm-2">Name:</Label>
              <Input type="name" name="user_name" id="exampleName" onChange={handleChange} value={loginDetails.user_name} placeholder="Name:" />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="exampleNumber" className="mr-sm-2">Phone:</Label>
              <Input type="mobileNumber" name="phone" id="numberExample" onChange={handleChange} value={loginDetails.phone} placeholder="Number:" />
            </FormGroup>
          </Row>
          <Row className="justify-content-center">
            <Button className="login-form-margin-top">Register</Button>
          </Row>
        </Form>
      </Row>
    </Container>
  );
};

export default RegisterView;
