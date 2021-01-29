import React from "react";
import { Button, Form, FormGroup, Label, Input,Container, Row } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from "axios";

const LoginView = (props) => { 
  const { user, setUser, setLoggedInUser } = props

  const handleChange = (e) => {
    console.log(e.target.name);
    setUser({...user, [e.target.name]: e.target.value});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/users/login", user, { credentials: "include" })
      .then((res) => {
        console.log(res)
        setLoggedInUser(res.data);
        setUser({
          username: "",
          password: "",
          user_name: "",
          role: "user",
          phone: ""
        });
        props.history.push("/")
      })
      .catch((error) => alert(error));
    
  };

  return (
    <Container>
      <Row className="justify-content-center margin-add-top underline-text">
        <h1>Log In</h1>
      </Row>

      <Row className="justify-content-center">
        <Form onSubmit={handleLogin}>
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
      <Row className="login-form-margin-top justify-content-center">
        <p></p>
      </Row>
      <Row className="login-form-margin-top justify-content-center">
        <button><Link to="/register">SIGN UP</Link></button>
      </Row>



</Container>


    )

}



export default LoginView;