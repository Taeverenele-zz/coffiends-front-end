import React from "react";
import { Row, Col, Table } from "reactstrap";
import NewCafeForm from "./NewCafeForm";

const CafeView = (props) => {
  const { cafes, deleteCafe, updateCafeArray } = props;

  const handleClick = (index) => {
    deleteCafe(index);
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
              {cafes.map((cafe, index) => (
                <tr key={index}>
                  <td>{cafe.name}</td>
                  <td>{cafe.address}</td>
                  <td>
                    <button onClick={() => handleClick(cafe._id)}>x</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <NewCafeForm updateCafeArray={updateCafeArray} />
    </div>
  );
};

export default CafeView;
