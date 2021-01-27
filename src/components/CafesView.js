import React, { useState } from "react";
import { Row, Col, Table } from "reactstrap";
import NewCafeForm from "./NewCafeForm";
import EditCafeForm from "./EditCafeForm";

const CafeView = (props) => {
  const { cafes, deleteCafe, addCafe, updateCafe } = props;
  const [currentCafe, setCurrentCafe] = useState(null);

  const handleClickDelete = (index) => {
    deleteCafe(index);
    props.setReload(true);
  };
  const handleClickEdit = (cafe) => {
    setCurrentCafe(cafe);
    updateCafe(cafe._id);
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
                    <button onClick={() => handleClickDelete(cafe._id)}>
                      x
                    </button>
                    <button onClick={() => handleClickEdit(cafe)}>edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <NewCafeForm addCafe={addCafe} currentCafe={currentCafe} />
      <EditCafeForm currentCafe={currentCafe} />
    </div>
  );
};

export default CafeView;
