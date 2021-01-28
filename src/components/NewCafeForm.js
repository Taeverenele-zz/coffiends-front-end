import React, { useState } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const NewCafeForm = (props) => {
  const { addCafe, setCafeData, cafeData, initialState } = props;

  const initialUserState = {
    user_name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  };
  const [userData, setUserData] = useState(initialUserState);

  const handleInputChange = (e) => {
    setCafeData({ ...cafeData, [e.target.name]: e.target.value });
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    // if (cafeData.cafe_name && cafeData.address) { // add validation that all fields must be entered
    // console.log(cafeData);
    axios.post("http://localhost:5000/users", userData).then((res) => {
      const cafeOwner = res.data._id;
      axios.post("http://localhost:5000/cafes", cafeData).then((res) => {
        console.log(cafeOwner);
        cafeData.owner = cafeOwner;
        addCafe(cafeData);
      });
    });
    setCafeData(initialState);
    setUserData(initialUserState);
    // } else {
    //   alert("Cannot leave fields empty!");
    // }
  };

  return (
    <div>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>Add New Cafe</h2>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleFinalSubmit}>
            <FormGroup>
              <Label for="cafe_name">Cafe name:</Label>
              <Input
                name="cafe_name"
                value={cafeData.cafe_name}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="user_name">Owner:</Label>
              <Input
                name="user_name"
                value={userData.user_name}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                name="email"
                value={userData.email}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role:</Label>
              <Input
                name="role"
                value={userData.role}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone:</Label>
              <Input
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input
                name="address"
                value={cafeData.address}
                onChange={handleInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="opening">Opening time:</Label>
              <Input
                name="operating_hours[0]"
                value={cafeData.operating_hours[0] || ""}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "operating_hours",
                      value: [e.target.value, cafeData.operating_hours[1]],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="closing">Closing time:</Label>
              <Input
                name="operating_hours[1]"
                value={cafeData.operating_hours[1] || ""}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "operating_hours",
                      value: [cafeData.operating_hours[0], e.target.value],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="latitude">Latitude:</Label>
              <Input
                name="location[0]"
                value={cafeData.location[0] || ""}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "location",
                      value: [e.target.value, cafeData.location[1]],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="longitude">Longitude:</Label>
              <Input
                name="location[1]"
                value={cafeData.location[1] || ""}
                onChange={(e) =>
                  handleInputChange({
                    target: {
                      name: "location",
                      value: [cafeData.location[0], e.target.value],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default NewCafeForm;
