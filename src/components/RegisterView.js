import React from "react"
import { Button, Form, FormGroup, Label, Input,Container, Row, Col } from 'reactstrap';
import { Link } from "react-router-dom";



const RegisterView = (props) => { 

    return (
<Container>

        <Row className="justify-content-center margin-add-top">
            <h1>Register</h1>
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
            <Row>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
                    <Label for="exampleName" className="mr-sm-2">Name:</Label>
                    <Input type="name" name="name" id="exampleName" placeholder="Name:" />
                </FormGroup>
            </Row>
            <Row>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0 login-form-margin">
                    <Label for="exampleNumber" className="mr-sm-2">Number:</Label>
                    <Input type="mobileNumber" name="number" id="numberExample" placeholder="Number:" />
                </FormGroup>
            </Row>
            <Row className="justify-content-center">
                <Button className="login-form-margin-top">Register</Button>
            </Row>
        </Form>
    </Row>

</Container>


    )

}

export default RegisterView;