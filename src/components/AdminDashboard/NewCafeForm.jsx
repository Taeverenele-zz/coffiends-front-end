import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import StateContext from "../../utils/store";

const NewCafeForm = (props) => {
  const { action } = useParams();

  const [userData, setUserData] = useState({
    username: "",
    password: "",
    user_name: "",
    role: "cafe",
    phone: "",
  });

  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser, cafeData } = store;

  useEffect(() => {
    if (!loggedInUser) {
      props.history.push("/");
    }
    if (cafeData && action === "edit") {
      axios
        .get(`${process.env.REACT_APP_BACK_END_URL}/users/${cafeData.owner}`)
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
          location: [],
        },
      });
      setUserData({
        username: "",
        password: "",
        user_name: "",
        role: "cafe",
        phone: "",
      });
    }
  }, [action]);

  const handleCafeInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "setCafeData",
      data: { ...cafeData, [name]: value },
    });
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const saveNewUser = () => {
    return axios
      .post(`${process.env.REACT_APP_BACK_END_URL}/users/register`, userData)
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
      axios
        .patch(
          `${process.env.REACT_APP_BACK_END_URL}/users/${userData._id}`,
          userData
        )
        .catch((error) => console.log(error));
      axios
        .put(
          `${process.env.REACT_APP_BACK_END_URL}/cafes/${cafeData._id}`,
          cafeData
        )
        .catch((error) => console.log(error));

      props.history.push("/");
    } else {
      saveNewUser()
        .then((newCafeData) => {
          axios
            .post(`${process.env.REACT_APP_BACK_END_URL}/cafes`, newCafeData)
            .then(() => props.history.push("/"))
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="background full-height text-center">
      {!cafeData ? (
        <></>
      ) : (
        <>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
              <h2 className="admin-heading-colors ">{action === "edit" ? "Edit" : "Add New"} Cafe</h2>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="Admin-Dashboard-Center">
              <Form onSubmit={handleFinalSubmit} className="search-admin ">
                <FormGroup>
                  <Label className="admin-subheading-colors" for="cafe_name">Cafe name:</Label>
                  <Input
                    type="text"
                    name="cafe_name"
                    value={cafeData.cafe_name || ""}
                    className="fill-boxes"            
                    onChange={handleCafeInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label className="admin-subheading-colors" for="user_name">Owner:</Label>
                  <Input
                    type="text"
                    name="user_name"
                    value={userData.user_name || ""}
                    className="fill-boxes"
                    onChange={handleUserInputChange}
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label className="admin-subheading-colors" for="username">Email:</Label>
                  <Input
                    type="email"
                    name="username"
                    value={userData.username || ""}
                    onChange={handleUserInputChange}
                    className="fill-boxes"
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label className="admin-subheading-colors" for="password">Password:</Label>
                  <Input
                    type="password"
                    name="password"
                    value={userData.password || ""}
                    onChange={handleUserInputChange}
                    className="fill-boxes"
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
                  <Label className="admin-subheading-colors" for="phone">Phone:</Label>
                  <Input
                    type="text"
                    name="phone"
                    value={userData.phone || ""}
                    onChange={handleUserInputChange}
                    className="fill-boxes"
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label className="admin-subheading-colors" for="address">Address:</Label>
                  <Input
                    type="text"
                    name="address"
                    value={cafeData.address || ""}
                    onChange={handleCafeInputChange}
                    className="fill-boxes"
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label className="admin-subheading-colors" for="opening">Opening time:</Label>
                  <Input
                    type="text"
                    name="operating_hours[0]"
                    required
                    value={cafeData.operating_hours[0] || ""}
                    className="fill-boxes"
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
                  <Label className="admin-subheading-colors" for="closing">Closing time:</Label>
                  <Input
                    type="text"
                    name="operating_hours[1]"
                    required
                    value={cafeData.operating_hours[1] || ""}
                    className="fill-boxes"
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
                  <Label className="admin-subheading-colors" for="latitude">Latitude:</Label>
                  <Input
                    type="text"
                    name="location[0]"
                    required
                    value={cafeData.location[0] || ""}
                    className="fill-boxes"
                    onChange={(e) =>
                      handleCafeInputChange({
                        target: {
                          name: "location",
                          value: [
                            parseFloat(e.target.value),
                            cafeData.location[1],
                          ],
                        },
                      })
                    }
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label className="admin-subheading-colors" for="longitude">Longitude:</Label>
                  <Input
                    type="text"
                    name="location[1]"
                    required
                    value={cafeData.location[1] || ""}
                    className="fill-boxes"
                    onChange={(e) =>
                      handleCafeInputChange({
                        target: {
                          name: "location",
                          value: [
                            cafeData.location[0],
                            parseFloat(e.target.value),
                          ],
                        },
                      })
                    }
                  ></Input>
                </FormGroup>
                <Button className="Admin-Button-Margin button-color">Submit</Button>
                <Link to="/">
                  <Button className="Admin-Button-Margin button-color">Cancel</Button>
                </Link>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default NewCafeForm;
