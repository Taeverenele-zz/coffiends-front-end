import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardDeck,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import coffeeImg from "../../assets/coffee.svg";

const HomeView = (props) => {
  const { coffees, setCoffees, setUserCoffee } = props;

  useEffect(() => {
    axios
      .get("http://localhost:5000/coffees/", coffees)
      .then((res) => setCoffees(res.data))
      .catch((err) => console.log(err));
  }, []);

  function addUserCoffee(id, name) {
    setUserCoffee({ id, name });
  }

  return (
    <div style={{ backgroundColor: "#6E5E5E", overflowX: "hidden" }}>
      <div>
        <Container fluid="true">
          <Row className="justify-content-center">
            {coffees.map((coffee, index) => (
              <CardDeck key={index} style={{ margin: "30px" }}>
                <Card key={coffee._id}>
                  <CardImg
                    top
                    width="100%"
                    src={coffeeImg}
                    alt="Card image cap"
                  />
                  <CardBody style={{ width: "230px" }}>
                    <CardTitle tag="h5">{coffee.name}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">
                      {coffee.description}
                    </CardSubtitle>
                    <Link
                      to={`/map/${coffee.name}`}
                      onClick={() => addUserCoffee(coffee._id, coffee.name)}
                    >
                      <Button color="primary" size="sm">
                        SEARCH
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </CardDeck>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default HomeView;
