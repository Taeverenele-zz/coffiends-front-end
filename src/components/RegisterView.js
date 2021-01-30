import React from "react";
import { Button, Form, FormGroup, Label, Input,Container, Row } from 'reactstrap';

const RegisterView = (props) => {
  const { user, setUser, setLoggedInUser } = props;

  const handleChange = (e) => {
    console.log(e.target.name);
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/users/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(data => data.json())
      .then(json => {
        if (json.id) {
          setLoggedInUser(json);
          setUser({
            username: "",
            password: "",
            user_name: "",
            role: "user",
            phone: ""
          });
          props.history.push("/");
        } else {
          alert(json.message);
        };
      });
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
              <Input type="email" name="username" id="exampleEmail" onChange={handleChange} value={user.username} placeholder="Email:" />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="examplePassword" className="mr-sm-2">Password:</Label>
              <Input type="password" name="password" id="examplePassword" onChange={handleChange} value={user.password} placeholder="Password:" />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="exampleName" className="mr-sm-2">Name:</Label>
              <Input type="name" name="user_name" id="exampleName" onChange={handleChange} value={user.user_name} placeholder="Name:" />
            </FormGroup>
          </Row>
          <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
              <Label for="exampleNumber" className="mr-sm-2">Phone:</Label>
              <Input type="mobileNumber" name="phone" id="numberExample" onChange={handleChange} value={user.phone} placeholder="Number:" />
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
