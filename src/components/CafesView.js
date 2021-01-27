import React, { useState } from "react";
import { Row, Col, Table } from "reactstrap";
import NewCafeForm from "./NewCafeForm";

const CafeView = (props) => {
  const { cafes, deleteCafe, updateCafeArray } = props;
  const [currentId, setCurrentId] = useState(null);

  // console.log(currentId);
  const handleClickDelete = (index) => {
    deleteCafe(index);
    props.setReload(true);
  };
  const handleClickEdit = (index) => {
    deleteCafe(index);
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
                    <button onClick={() => handleClickEdit(cafe._id)}>
                      edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <NewCafeForm
        updateCafeArray={updateCafeArray}
        setCurrentId={setCurrentId}
        currentId={currentId}
      />
    </div>
  );
};

export default CafeView;
