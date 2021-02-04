import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Form, FormGroup, Input, Label, Row, Col, Button } from "reactstrap";
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
    <>
      {!formData ? (<></>) : (
        <>
          {/* <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
              {flashMessage}
            </Col>
          </Row> */}
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
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="new_password">New Password:</Label>
                  <Input
                    type="password"
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
      )}
    </>
  );
};

export default ChangePassword;
