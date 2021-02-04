import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
import axios from "axios";

const ChangePassword = (props) => {
  const { loggedInUser } = props;
  const [flashMessage, setFlashMessage] = useState("");
  const userId = loggedInUser._id;
  let initialFormState = {
    user_id: userId,
    password: "",
    new_password: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.patch(
      `http://localhost:5000/users/${loggedInUser._id}/change_password`,
      formData
    );
    if (response.status === 200) {
      setFlashMessage("Password changed successfully");
    } else if (response.status === 409) {
      alert("Something went wrong, try again");
    }
  };

  return (
    <>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          {flashMessage}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>Change Password</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="password">Current Password:</Label>
              <Input
                type="text"
                name="password"
                value={formData.current_password}
                onChange={handleInputChange}
                required
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="new_password">New Password:</Label>
              <Input
                type="text"
                name="new_password"
                value={formData.new_password}
                onChange={handleInputChange}
                required
              ></Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
