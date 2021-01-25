import React from "react";
import { Row, Col, Table } from "reactstrap";

const CoffeesView = (props) => {
  const { coffees, deleteCoffee } = props;

  const handleClick = (index) => {
    deleteCoffee(index);
    console.log(props);
    props.setReload(true);
  };

  return (
    <div className="mt-4">
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {coffees.map((coffee, index) => (
                <tr key={index}>
                  <td>{coffee.name}</td>
                  <td>{coffee.description}</td>
                  <td>
                    <button onClick={() => handleClick(coffee._id)}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default CoffeesView;
