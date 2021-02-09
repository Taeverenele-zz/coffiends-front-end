import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Row, Col, Button, Container, InputGroup, InputGroupAddon } from "reactstrap";
import StateContext from "../../utils/store";

const ChangePassword = (props) => {
  const [ formData, setFormData ] = useState();
  
  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser } = store;

  useEffect(() => {
    if (loggedInUser) {
      setFormData({
        user_id: loggedInUser._id,
        password: "",
        new_password: "",
      });
    };
  }, [ loggedInUser ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.patch(`${process.env.REACT_APP_BACK_END_URL}/users/${loggedInUser._id}/change_password`, formData );
    if (response.data === "Password or username is incorrect") {
    dispatch({ type: "setFlashMessage", data: "Current password is incorrect" });
    } else {
      dispatch({ type: "setFlashMessage", data: "Password changed successfully!" });
      props.history.push("/user/edit")
    };
  };

  const togglePasswordView = (inputName) => {
    const inputs = document.querySelectorAll('.input');
    inputs.forEach(input => {
      if(input.name === inputName) {
        input.type = input.type === 'text' ? 'password' : 'text';
      };
    });
  };

  return (
    <Container fluid="true" className="background full-height">
      {!formData ? (<></>) : (
        <>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center ">
              <h2 className="heading-colors">Change Password</h2>
            </Col>
          </Row>
          <Row className="mt-4 text-center ">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="Admin-Dashboard-Center">
              <Form onSubmit={handleSubmit} className="edit-form-form">
                <FormGroup>
                  <Label for="password" className="border-color">Current Password:</Label>
                  <InputGroup>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                    <InputGroupAddon addonType="append">
                      <Button id="current_password" onClick={() => togglePasswordView("password")} className="button-color">View</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label for="new_password" className="border-color">New Password:</Label>
                  <InputGroup>
                    <Input
                      type="password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleInputChange}
                      className="input"
                      required
                    />
                    <InputGroupAddon addonType="append">
                      <Button id="new_password" onClick={() => togglePasswordView("new_password")} className="button-color">View</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
                <Button className="button-color">Submit</Button>
                <Link to="/home">
                  <Button className="button-color ml-2">Cancel</Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ChangePassword;
