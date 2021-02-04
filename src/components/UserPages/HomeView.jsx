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
  const { coffees, setCoffees, setUserCoffee, loggedInUser } = props;

  useEffect(() => {
    getAllCoffees();
  }, []);

  const getAllCoffees = () => {
    axios
      .get("http://localhost:5000/coffees/", coffees)
      .then((res) => setCoffees(res.data))
      .catch((err) => console.log(err));
  };

  function addUserCoffee(id, name) {
    setUserCoffee({ id, name });
  }



  return (
    <div className="background full-height ">
      <div>
        <Container fluid="true" className="card-margin-add" >
          <Row className="justify-content-center  Admin-Dashboard-Center ">
            {coffees.map((coffee, index) => (
              <CardDeck key={index} style={{ margin: "30px" }} className=" flip-card ">
                <Card key={coffee._id} className="flip-card-inner card-rm-background" style={{height: "200px", width: "200px"}} >
                  <div className="flip-card-front">
                  <CardImg
                    top
                    width="100%"
                    src={coffeeImg}
                    alt="Card image cap"
                    style={{marginBottom: "45px"}}
                  />
                    <CardTitle tag="h5" className="card-text-color">{coffee.name}</CardTitle>
                  </div>
                  <CardBody  className="flip-card-back  ">
                    <CardSubtitle tag="h6" className="mb-2 card-desc text-center" style={{marginTop: "40px"}}>
                      {coffee.description}
                    </CardSubtitle>
                    <Link
                      to={`/map/${coffee.name}`}
                      onClick={() => addUserCoffee(coffee._id, coffee.name)}
                    >
                    <div className="text-center" style={{marginTop: "10px"}}>
                      <Button color="primary" size="sm">
                        SEARCH
                      </Button>
                    </div>
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
