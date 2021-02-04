import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Card, Button, CardImg, CardTitle, CardDeck, CardSubtitle, CardBody } from "reactstrap";
import StateContext from "../../utils/store";

const HomeView = () => {
  const { store, dispatch } = useContext(StateContext);
  const { allCoffees } = store;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_END_URL}/coffees/`)
      .then((res) => { dispatch({ type: "getAllCoffees", data: res.data }) })
      .catch((err) => console.log(err));
  }, [ dispatch ])

  return (
    <>
      {!allCoffees ? (<></>) : (
        <div style={{ backgroundColor: "#6E5E5E", overflowX: "hidden" }}>
          <div>
            <Container fluid="true">
              <Row className="justify-content-center">
                {allCoffees.map((coffee, index) => (
                  <CardDeck key={index} style={{ margin: "30px" }}>
                    <Card key={coffee._id}>
                      <CardImg top width="100%" src="coffee.svg" alt="Card image cap" />
                      <CardBody style={{ width: "230px" }}>
                        <CardTitle tag="h5">{coffee.name}</CardTitle>
                        <CardSubtitle tag="h6" className="mb-2 text-muted">
                          {coffee.description}
                        </CardSubtitle>
                        <Link to={`/map/${coffee.name}`} onClick={() => dispatch({ type: "setUserCoffee", data: { id: coffee._id, name: coffee.name, price: 0 }})} >
                          <Button color="primary" size="sm">SEARCH</Button>
                        </Link>
                      </CardBody>
                    </Card>
                  </CardDeck>
                ))}
              </Row>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeView;
