import React from "react";
import { Link } from "react-router-dom";
import { Card, Button, CardImg, CardTitle, CardText, CardDeck, CardSubtitle, CardBody } from 'reactstrap';
import { Container, Row, Col } from 'reactstrap';
import logo from '../assets/Logo.png';
import coffee from '../assets/coffee.svg';

const HomeView = (props) => {
  const { coffees, setCoffee } = props;

  function addUserCoffee(name, id) {
    setCoffee({ name, id });
  };

  return (
    <div style={{backgroundColor: "#6E5E5E", overflowX: "hidden"}}>

      <Container style={{padding: "0", margin:"0"}} fluid="true">
        <Row className="align-items-center">
          <Col sm={{ size: 4 }} xs={{size: 4}}>
              <a href="/"><img src={logo} alt="Logo" style={{height: "125px"}}></img></a>
          </Col>

          <Col sm={{ size: 4}} xs={{size: 4}} className="justify-content-center text-center">
              <input type="search" id="" name="" placeholder="Search Coffee?"></input>
          </Col>

          <Col sm={{ size: 4}} xs={{size: 3}} style={{textAlign: "end"}}>
            <Button color="primary" size="sm" style={{margin: "10px"}}>Log In</Button>
            <Button color="primary" size="sm">Register</Button>
          </Col>
        </Row>
      </Container>
  
      <Container style={{marginTop:"40px"}}>
          <Row className="justify-content-center" style={{height: "100px"}}> 
            <div >
              <h1>Coffiends</h1>
            </div>
          </Row>

          <Row className="justify-content-center" style={{height: "150px", border:"2px solid black", marginBottom: "10px"}}>
              <div>
                <h4>About Coffiends</h4>
              </div>
          </Row>   
      </Container>

      <div>
        {coffees.map((coffee) => (
          <p key={coffee._id} onClick={() => addUserCoffee(coffee.name, coffee._id)}>{coffee.name} - <Link to="/map">SEARCH</Link></p>
        ))}
      </div>

      <div>
        <CardDeck style={{margin: "10px" }}>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
              <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </CardDeck>
      </div>
      <div style={{marginTop:"20px"}}>
        <CardDeck style={{margin: "10px" }}>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
              <CardText>This card has supporting text below as a natural lead-in to additional content.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
          <Card>
            <CardImg top width="100%" src={coffee} alt="Card image cap" />
            <CardBody>
              <CardTitle tag="h5">Card title</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>
        </CardDeck>
      </div>

    </div>
  );
};

export default HomeView;
