import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, FormGroup, Input, Label, Row, Col, Button, Container } from "reactstrap";
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
    if (response.status === 200) {
      dispatch({ type: "setFlashMessage", data: "Password changed successfully" });
      props.history.push("/user/edit")
    } else if (response.status === 409) {
      alert("Something went wrong, try again");
    };
  };

  return (
    <Container fluid="true" className="background full-height">
      {!formData ? (<></>) : (
        <>
          {/* <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
              {flashMessage}
            </Col>
          </Row> */}
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
                  <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="fill-boxes"
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="new_password" className="border-color">New Password:</Label>
                  <Input
                    type="password"
                    name="new_password"
                    value={formData.new_password}
                    onChange={handleInputChange}
                    className="fill-boxes"
                    required
                  ></Input>
                </FormGroup>
                <Button className="button-color">Submit</Button>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ChangePassword;
