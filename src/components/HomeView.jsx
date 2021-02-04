import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Card, Button, CardImg, CardTitle, CardDeck, CardSubtitle, CardBody } from "reactstrap";
import StateContext from "../utils/store";

const HomeView = () => {
  const { store, dispatch } = useContext(StateContext);

  const addUserCoffee = (id, name) => {
    dispatch({
      type: "setUserCoffee",
      data: { id, name, price: 0 }
    });
  };

  return (
    <>
      <div style={{ backgroundColor: "#6E5E5E", overflowX: "hidden" }}>
        <div>
          <Container fluid="true">
            <Row className="justify-content-center">
              {store.allCoffees.map((coffee, index) => (
                <CardDeck key={index} style={{ margin: "30px" }}>
                  <Card key={coffee._id}>
                    <CardImg top width="100%" src="coffee.svg" alt="Card image cap" />
                    <CardBody style={{ width: "230px" }}>
                      <CardTitle tag="h5">{coffee.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        {coffee.description}
                      </CardSubtitle>
                      <Link to={`/map/${coffee.name}`} onClick={() => addUserCoffee(coffee._id, coffee.name)} >
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
    </>
  );
};

export default HomeView;
