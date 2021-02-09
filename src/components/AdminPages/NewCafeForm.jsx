import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import StateContext from "../../utils/store";
import validatePhone from "../../utils/validatePhone";

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

  // cafeData is true if we are editing
  let cafeUserId
  cafeData ? cafeUserId = cafeData.owner : cafeUserId = null

  if (action === "edit" && !cafeData) {
    props.history.push("/home");
  };

  useEffect(() => {
    // check for logged in user
    if (loggedInUser) {
      // check if we are editing
      if (cafeUserId && action === "edit") {
        axios.get(`${process.env.REACT_APP_BACK_END_URL}/users/${cafeUserId}`)
          .then((res) => setUserData(res.data))
          .catch(() => dispatch({ type: "setFlashMessage", data: "Could not retrieve cafe data" }));
      // if not editing set CafeData and setUserData
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
      };
    };
  }, [ action, loggedInUser, dispatch, cafeUserId ]);

  // Fields that are linked to cafe, change cafeData
  const handleCafeInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "setCafeData",
      data: { ...cafeData, [name]: value },
    });
  };

  // Fields that are linked to user, change userData
  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // you have to save a new user before you can create a new cafe, to be able to link user as a cafe owner
  const saveNewUser = () => {
    return axios.post(`${process.env.REACT_APP_BACK_END_URL}/users/register`, userData)
      .then((res) => {
        const cafeId = res.data._id;
        const newCafeData = { ...cafeData, owner: cafeId };
        if (res.data._id) {
          return newCafeData;
        } else {
          return false;
        };
      })
      .catch(() => dispatch({ type: "setFlashMessage", data: "User did not save successfully" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validatePhone(userData.phone)) {
      // if editing a cafe we send the edited used data and cafe data
      if (action === "edit") {
        axios.patch(`${process.env.REACT_APP_BACK_END_URL}/users/${userData._id}`, userData)
          .catch(() => dispatch({ type: "setFlashMessage", data: "User did not update successfully" }));
        
        axios.put(`${process.env.REACT_APP_BACK_END_URL}/cafes/${cafeData._id}`, cafeData)
          .catch(() => dispatch({ type: "setFlashMessage", data: "Cafe did not save successfully" }));
        // and redirect back to admin/home
        props.history.push("/home");
      // if not editing (creating a new user and cafe), we save the new user first and then saving the cafe
      } else {
        saveNewUser()
          .then((newCafeData) => {
            axios.post(`${process.env.REACT_APP_BACK_END_URL}/cafes`, newCafeData)
              .then(() => props.history.push("/home"))
              .catch(() => dispatch({ type: "setFlashMessage", data: "Cafe did not save successfully" }));
          })
          .catch(() => dispatch({ type: "setFlashMessage", data: "User did not save successfully" }));
      };
    } else {
      dispatch({ type: "setFlashMessage", data: "Phone number format invalid"})
    };
  };

  return (
    <div className="background full-height text-center">
      {!cafeData ? (<></>) : (
        <>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center">
              <h2 className="admin-heading-colors ">{action === "edit" ? "Edit" : "Add New"} Cafe</h2>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="Admin-Dashboard-Center">
              <Form onSubmit={handleSubmit} className="search-admin ">
                <FormGroup>
                  <Label className="admin-subheading-colors" for="cafe_name">Cafe name:</Label>
                  <Input
                    type="text"
                    name="cafe_name"
                    value={cafeData.cafe_name || ""}            
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
                    required
                  ></Input>
                </FormGroup>
                {!cafeUserId ? (
                  <>
                    <FormGroup>
                      <Label className="admin-subheading-colors" for="password">Password:</Label>
                      <Input
                        type="password"
                        name="password"
                        value={userData.password || ""}
                        onChange={handleUserInputChange}
                        required
                      ></Input>
                    </FormGroup>
                  </>
                ) : (<></>)}
                <FormGroup>
                  <Label className="admin-subheading-colors" for="phone">Phone:</Label>
                  <Input
                    type="text"
                    name="phone"
                    minLength="8"
                    maxLength="12"
                    value={userData.phone || ""}
                    onChange={handleUserInputChange}
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
                    required
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label className="admin-subheading-colors" for="opening">Opening time:</Label>
                  <Input
                    type="text"
                    name="operating_hours[0]"
                    placeholder="e.g. 0730"
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
                  <Label className="admin-subheading-colors" for="closing">Closing time:</Label>
                  <Input
                    type="text"
                    name="operating_hours[1]"
                    required
                    placeholder="e.g. 1845"
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
                  <Label className="admin-subheading-colors" for="latitude">Latitude:</Label>
                  <Input
                    type="number"
                    name="location[0]"
                    required
                    value={cafeData.location[0] || ""}
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
                    type="number"
                    name="location[1]"
                    required
                    value={cafeData.location[1] || ""}
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
                <Link to="/home">
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
