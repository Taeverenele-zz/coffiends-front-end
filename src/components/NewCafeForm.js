import React, { useState, useEffect } from "react";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import axios from "axios";

const initialUserState = {
  user_name: "",
  email: "",
  password: "",
  role: "",
  phone: "",
};

const NewCafeForm = (props) => {
  const {
    addCafe,
    setCafeData,
    cafeData,
    initialState,
    editing,
    setEditing,
    cafes,
    setCafes,
  } = props;

  const [userData, setUserData] = useState(initialUserState);
  useEffect(() => {
    if (editing) {
      axios.get(`http://localhost:5000/users/${cafeData.owner}`).then((res) => {
        console.log("test");
        setUserData(res.data);
      });
    }
  }, [cafeData.owner, editing]);

  const updateCafe = (newCafe) => {
    setCafes(cafes.map((cafe) => (cafe._id == cafeData._id ? newCafe : cafe)));
  };

  const handleCafeInputChange = (e) => {
    setCafeData({ ...cafeData, [e.target.name]: e.target.value });
  };

  const handleUserInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const updateExistingCafe = () => {
    axios
      .put(`http://localhost:5000/cafes/${cafeData._id}`, cafeData)
      .then((res) => updateCafe(res.data))
      .catch((error) => console.log(error));
    setEditing(false);
  };

  const updateExistingUser = () => {
    console.log(userData);
    axios
      .patch(`http://localhost:5000/users/${userData._id}`, userData)
      .then((res) => console.log(res.data));
  };

  const saveNewCafe = () => {
    axios.post("http://localhost:5000/users", userData).then((res) => {
      const cafeOwner = res.data._id;
      axios.post("http://localhost:5000/cafes", cafeData).then((res) => {
        res.data.owner = cafeOwner;
        addCafe(res.data);
        axios.put(`http://localhost:5000/cafes/${res.data._id}`, res.data);
      });
    });
  };
  const cancelEditing = () => {
    setEditing(false);
    setCafeData(initialState);
    setUserData(initialUserState);
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    // console.log(userData);
    // if (cafeData.cafe_name && cafeData.address) { // add validation that all fields must be entered
    // console.log(cafeData);
    if (editing) {
      // Save updated cafe here
      updateExistingUser();
      updateExistingCafe();
    } else {
      saveNewCafe();
    }

    setCafeData(initialState);
    setUserData(initialUserState);
  };

  return (
    <div>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
          <h2>{editing ? "Edit" : "Add New"} Cafe</h2>
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
                onChange={handleCafeInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="user_name">Owner:</Label>
              <Input
                name="user_name"
                value={userData.user_name}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input
                name="email"
                value={userData.email}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="password">Password:</Label>
              <Input
                name="password"
                value={userData.password}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="role">Role:</Label>
              <Input
                name="role"
                value={userData.role}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="phone">Phone:</Label>
              <Input
                name="phone"
                value={userData.phone}
                onChange={handleUserInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="address">Address:</Label>
              <Input
                name="address"
                value={cafeData.address}
                onChange={handleCafeInputChange}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label for="opening">Opening time:</Label>
              <Input
                name="operating_hours[0]"
                value={cafeData.operating_hours[0] || ""}
                onChange={(e) =>
                  handleCafeInputChange({
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
                  handleCafeInputChange({
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
                  handleCafeInputChange({
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
                  handleCafeInputChange({
                    target: {
                      name: "location",
                      value: [cafeData.location[0], e.target.value],
                    },
                  })
                }
              ></Input>
            </FormGroup>
            <Button>Submit</Button>
            <Button onClick={cancelEditing}>Cancel</Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default NewCafeForm;
