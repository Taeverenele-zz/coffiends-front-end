import React from "react"
import { Button, Form, FormGroup, Label, Input,Container, Row } from 'reactstrap';
import { Link } from "react-router-dom";



const LoginView = (props) => { 

    return (
<Container>

        <Row className="justify-content-center margin-add-top underline-text">
            <h1>Log In</h1>
        </Row>

    <Row className="justify-content-center">
        <Form>
            <Row>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin ">
                <Label for="exampleEmail" className="mr-sm-2">Email:</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Email:" />
            </FormGroup>
            </Row>
            <Row>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
                    <Label for="examplePassword" className="mr-sm-2">Password:</Label>
                    <Input type="password" name="password" id="examplePassword" placeholder="Password:" />
                </FormGroup>
            </Row>
            <Row className="justify-content-center">
                <Button className="login-form-margin-top">Log-In</Button>
            </Row>
        </Form>
    </Row>


        <Row className="login-form-margin-top justify-content-center">
            <p>Not a member? click here to register. </p>
        </Row>
        <Row className="login-form-margin-top justify-content-center">
            <Link to="/register"> Register Now!</Link>
        </Row>



</Container>


    )

}



export default LoginView;