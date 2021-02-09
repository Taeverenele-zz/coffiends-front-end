import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import StateContext from "../../utils/store";

const NewCoffeeForm = (props) => {
  const { action } = useParams();

  const { store, dispatch } = useContext(StateContext);
  const { loggedInUser, coffeeData } = store;

  if (action === "edit" && !coffeeData) {
    props.history.push("/home");
  };

  useEffect(() => {
    // if creating a new cafe, initial values are empty
    if (loggedInUser && action === "new") {
      dispatch({
        type: "setCoffeeData",
        data: { name: "", description: "" }
      });
    };
  }, [ action, dispatch, loggedInUser ]);
  
  // Save whatever is typed into inputs as coffeeData
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "setCoffeeData",
      data: { ...coffeeData, [name]: value }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if we are editing, send updated coffee data to database
    if (action === "edit") {
      axios.put(`${process.env.REACT_APP_BACK_END_URL}/coffees/${coffeeData._id}`, coffeeData)
        .then(() => props.history.push("/home"))
        .catch(() => dispatch({ type: "setFlashMessage", data: "Coffee did not save successfully" }));
    // if we are creating a new coffee, send a new coffee into the database
    } else {
      axios.post(`${process.env.REACT_APP_BACK_END_URL}/coffees`, coffeeData)
        .then(() => props.history.push("/home"))
        .catch(() => dispatch({ type: "setFlashMessage", data: "Coffee did not save successfully" }));
    };
  };

  return (
    <div className="background full-height text-center">
      {!coffeeData ? (<></>) : (
        <>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="text-center Admin-Dashboard-Center">
              <h2 className="admin-heading-colors">{action === "edit" ? "Edit" : "Add New"} Coffee</h2>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col sm="12" md={{ size: 6, offset: 3 }} className="Admin-Dashboard-Center">
              <Form onSubmit={handleSubmit} className="search-admin ">
                <FormGroup>
                  <Label className="admin-subheading-colors" for="name">Name:</Label>
                  <Input name="name" value={coffeeData.name} onChange={handleInputChange} required />
                </FormGroup>
                <FormGroup>
                  <Label className="admin-subheading-colors" for="description">Description:</Label>
                  <Input name="description" value={coffeeData.description} onChange={handleInputChange} required />
                </FormGroup>
                <Button className="Admin-Button-Margin button-color">Submit</Button>
                <Link to="/home"><Button className="Admin-Button-Margin button-color">Cancel</Button></Link>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default NewCoffeeForm;
