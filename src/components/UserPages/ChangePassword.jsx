import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Col,
  Button,
  InputGroupAddon,
} from "reactstrap";
import axios from "axios";

const ChangePassword = (props) => {
  const {
    loggedInUser,
    flashMessage,
    setFlashMessage,
    visible,
    setVisible,
  } = props;

  const initialFormState = {
    user_id: "",
    password: "",
    new_password: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (!loggedInUser) {
      props.history.push("/user/edit");
    } else {
      setFormData({ ...formData, user_id: loggedInUser._id });
    }
  }, []);
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
      setFlashMessage("Password successfully changed");
      setVisible(true);
      setFormData(initialFormState);
      props.history.push("/");
    } else {
      setFlashMessage("Incorrect current password");
      setVisible(true);
    }
  };
  const togglePasswordView = (e) => {
    const inputs = document.querySelectorAll(".input");
    inputs.forEach((input) => {
      if (e.target.id === "current_password_btn") {
        if (input.name === "password" && input.type === "password") {
          input.type = "text";
        } else {
          input.type = "password";
        }
      } else {
        if (input.name === "new_password" && input.type === "password") {
          input.type = "text";
        } else {
          input.type = "password";
        }
      }
    });
  };

  return (
    <>
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
              <InputGroupAddon addonType="append">
                <Input
                  className="input"
                  type="password"
                  name="password"
                  value={formData.current_password}
                  onChange={handleInputChange}
                  required
                ></Input>
                <Button id="current_password_btn" onClick={togglePasswordView}>
                  View
                </Button>
              </InputGroupAddon>
            </FormGroup>
            <FormGroup>
              <Label for="new_password">New Password:</Label>
              <InputGroupAddon addonType="append">
                <Input
                  className="input"
                  type="text"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                  required
                ></Input>
                <Button id="new_password_btn" onClick={togglePasswordView}>
                  View
                </Button>
              </InputGroupAddon>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
