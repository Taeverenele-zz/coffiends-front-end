import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
  CardSubtitle,
  CardBody,
} from "reactstrap";
import logo from "../assets/Logo.png";
import coffeeImg from "../assets/coffee.svg";

const HomeView = (props) => {
  const { coffees, setCoffees, setUserCoffee } = props;

  useEffect(() => {
    getAllCoffees();
  }, []);

  const getAllCoffees = async () => {
    const response = await axios.get("http://localhost:5000/coffees/", coffees);
    const allCoffees = await response.data;
    await setCoffees(allCoffees);
  };

  function addUserCoffee(id, name) {
    setUserCoffee({ id, name });
  };

  return (
    <div style={{ backgroundColor: "#6E5E5E", overflowX: "hidden" }}>
      {/* <Container style={{ padding: "0", margin: "0" }} fluid="true">
        <Row className="align-items-center">
          <Col sm={{ size: 4 }} xs={{ size: 4 }}>
            <a href="/">
              <img src={logo} alt="Logo" style={{ height: "125px" }}></img>
            </a>
          </Col>

          <Col
            sm={{ size: 4 }}
            xs={{ size: 4 }}
            className="justify-content-center text-center"
          >
            <input
              type="search"
              id=""
              name=""
              placeholder="Search Coffee?"
            ></input>
          </Col>

          <Col sm={{ size: 4 }} xs={{ size: 3 }} style={{ textAlign: "end" }}>
            <Link to="/login">
              <Button color="primary" size="sm" style={{ margin: "10px" }}>
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button color="primary" size="sm">
                Sign Up
              </Button>
            </Link>
          </Col>
        </Row>
      </Container> */}

      <Container style={{ marginTop: "40px" }}>
        <Row className="justify-content-center" style={{ height: "100px" }}>
          <div>
            <h1>Coffiends</h1>
          </div>
        </Row>

        <Row
          className="justify-content-center"
          style={{
            height: "150px",
            border: "2px solid black",
            marginBottom: "10px",
          }}
        >
          <div>
            click your favourite brew below to find cafes near you!
          </div>
        </Row>
      </Container>

      <div>
        <Container>
          <Row className="justify-content-center">
            {coffees.map((coffee) => (
              <CardDeck style={{ margin: "50px" }}>
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
                    {/* <p
                      key={coffee._id}
                      onClick={() => addUserCoffee(coffee.name, coffee._id)}
                    > */}
                      {/* {coffee.name} -{" "} */}
                      <Link to="/map" onClick={() => addUserCoffee(coffee._id, coffee.name)}>
                        <Button color="primary" size="sm">
                          SEARCH
                        </Button>
                      </Link>
                    {/* </p> */}
                  </CardBody>
                </Card>
              </CardDeck>
            ))}
          </Row>
        </Container>
      </div>

      {/* <div>
        <CardDeck style={{margin: "10px" }}>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle>
              <CardText>
                This card has supporting text below as a natural lead-in to
                additional content.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </CardDeck>
      </div>
      <div style={{ marginTop: "20px" }}>
        <CardDeck style={{ margin: "10px" }}>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle>
              <CardText>
                This card has supporting text below as a natural lead-in to
                additional content.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                Card subtitle
              </CardSubtitle>
              <CardText>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </CardDeck>
      </div> */}
    </div>
  );
};

export default HomeView;
