import React from "react";
import { Button, Form, FormGroup, Label, Input,Container, Row } from 'reactstrap';
import { Link } from "react-router-dom";

const LoginView = (props) => { 
  const { user, setUser, setLoggedInUser } = props

  const handleChange = (e) => {
    console.log(e.target.name);
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(data => data.json())
      .then(json => {
        setLoggedInUser(json);
        setUser({
          username: "",
          password: "",
          user_name: "",
          role: "user",
          phone: ""
        });
        props.history.push("/");
      })
      .catch((error) => alert(error));
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
              <Label for="exampleEmail" className="mr-sm-2">Email:</Label>
              <Input type="email" name="username" id="exampleEmail" onChange={handleChange} value={user.username} placeholder="Email:" />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="examplePassword" className="mr-sm-2">Password:</Label>
              <Input type="password" name="password" id="examplePassword" onChange={handleChange} value={user.password} placeholder="Password:" />
            </FormGroup>
          </Row>
          <Row className="justify-content-center">
            <Button className="login-form-margin-top">LOG IN</Button>
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
