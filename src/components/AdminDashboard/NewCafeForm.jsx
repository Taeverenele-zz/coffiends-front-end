import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import StateContext from "../../utils/store";

const NewCafeForm = (props) => {
  const { action } = useParams();
  
  const [ userData, setUserData ] = useState({
    username: "",
    password: "",
    user_name: "",
    role: "cafe",
    phone: ""
  });

  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser, cafeData } = store;

  useEffect(() => {
    if (!loggedInUser) {
      props.history.push("/");
    };
    if (cafeData && action === "edit") {
      axios.get(`http://localhost:5000/users/${cafeData.owner}`)
        .then((res) => {
          setUserData(res.data);
        })
        .catch((error) => console.log(error));
    } else {
      dispatch({
        type: "setCafeData",
        data: {
          cafe_name: "",
          address: "",
          operating_hours: [],
          location: []
        }
      });
      setUserData({
        username: "",
        password: "",
        user_name: "",
        role: "cafe",
        phone: ""
      });
    };
  }, [action]);

  const handleCafeInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "setCafeData",
      data: { ...cafeData, [name]: value }
    });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  
  const saveNewUser = () => {
    return axios.post("http://localhost:5000/users/register", userData)
      .then((res) => {
        const cafeId = res.data._id;
        const newCafeData = { ...cafeData, owner: cafeId };
        return newCafeData;
      })
      .catch((error) => console.log(error));
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();

    if (action === "edit") {
      axios.patch(`http://localhost:5000/users/${userData._id}`, userData)
        .catch((error) => console.log(error));  
      axios.put(`http://localhost:5000/cafes/${cafeData._id}`, cafeData)
        .catch((error) => console.log(error));
      
      props.history.push("/");
    } else {
      saveNewUser()
        .then((newCafeData) => {
          axios.post("http://localhost:5000/cafes", newCafeData)
            .then(() => props.history.push("/"))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    };
  };

  return (
    <div>
      {!cafeData ? (<></>) : (
        <>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
              <h2>{action === "edit" ? "Edit" : "Add New"} Cafe</h2>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form onSubmit={handleFinalSubmit}>
                <FormGroup>
                  <Label for="cafe_name">Cafe name:</Label>
                  <Input
                    type="text"
                    name="cafe_name"
                    value={cafeData.cafe_name}
                    onChange={handleCafeInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="user_name">Owner:</Label>
                  <Input
                    type="text"
                    name="user_name"
                    value={userData.user_name}
                    onChange={handleUserInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="username">Email:</Label>
                  <Input
                    type="email"
                    name="username"
                    value={userData.username}
                    onChange={handleUserInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password:</Label>
                  <Input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleUserInputChange}
                    required
                  ></Input>
                </FormGroup>
                {/* <FormGroup>
                  <Label for="role">Role:</Label>
                  <Input
                    type="text"
                    name="role"
                    value={userData.role}
                    onChange={handleUserInputChange}
                    required
                  ></Input>
                </FormGroup> */}
                <FormGroup>
                  <Label for="phone">Phone:</Label>
                  <Input
                    type="text"
                    name="phone"
                    value={userData.phone}
                    onChange={handleUserInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="address">Address:</Label>
                  <Input
                    type="text"
                    name="address"
                    value={cafeData.address}
                    onChange={handleCafeInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="opening">Opening time:</Label>
                  <Input
                    type="text"
                    name="operating_hours[0]"
                    required
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
                    type="text"
                    name="operating_hours[1]"
                    required
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
                    type="text"
                    name="location[0]"
                    required
                    value={cafeData.location[0] || ""}
                    onChange={(e) =>
                      handleCafeInputChange({
                        target: {
                          name: "location",
                          value: [parseFloat(e.target.value), cafeData.location[1]],
                        },
                      })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="longitude">Longitude:</Label>
                  <Input
                    type="text"
                    name="location[1]"
                    required
                    value={cafeData.location[1] || ""}
                    onChange={(e) =>
                      handleCafeInputChange({
                        target: {
                          name: "location",
                          value: [cafeData.location[0], parseFloat(e.target.value)],
                        },
                      })
                    }
                  ></Input>
                </FormGroup>
                <Button>Submit</Button>
                <Link to="/"><Button>Cancel</Button></Link>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default NewCafeForm;
