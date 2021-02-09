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
      .catch(() => dispatch({ type: "setFlashMessage", data: "Could not retrieve coffee data" }));
  }, [ dispatch ])



  return (
    <>
      {!allCoffees ? (<></>) : (
        
        <div className="background full-height">
            <div>
            <Container fluid="true" className="card-margin-add">
              <Row className="justify-content-center Admin-Dashboard-Center">
                {allCoffees.map((coffee, index) => (
                  <CardDeck key={index} style={{ margin: "30px" }} className="flip-card">
                    <Card key={coffee._id} className="flip-card-inner card-rm-background" style={{height: "200px", width: "200px"}}>
                      <div className="flip-card-front">
                        <CardImg top width="100%" src={`${process.env.REACT_APP_BACK_END_URL}/images/coffee.svg`} alt="Card image cap" style={{marginBottom: "45px"}} />
                        <CardTitle tag="h5" className="card-text-color">{coffee.name}</CardTitle>
                      </div>
                        <CardBody className="flip-card-back">
                        <CardSubtitle tag="h6" className="mb-2 card-desc text-center" style={{marginTop:"40px"}}>
                          {coffee.description}
                        </CardSubtitle>
                        <Link to={`/map/${coffee.name}`} onClick={() => dispatch({ type: "setUserCoffee", data: { id: coffee._id, name: coffee.name, price: 0 }})} >
                          <div className="text-center" style={{marginTop: "10px"}}>
                           <Button  size="sm" >SEARCH</Button>
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
      )}
    </>
  );
};

export default HomeView;
