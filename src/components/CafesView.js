import React, { useState } from "react";
import { Row, Col, Table } from "reactstrap";
import NewCafeForm from "./NewCafeForm";
import EditCafeForm from "./EditCafeForm";

const CafeView = (props) => {
  const {
    cafes,
    setReload,
    setCafes,
    deleteCafe,
    addCafe,
    updateCafeDb,
  } = props;
  const [currentCafe, setCurrentCafe] = useState(null);
  const initialState = {
    name: "",
    address: "",
  };
  const [cafeData, setCafeData] = useState(initialState);
  const [editing, setEditing] = useState(false);

  const handleClickDelete = (index) => {
    deleteCafe(index);
    setReload(true);
  };

  const editCafe = (cafe) => {
    setEditing(true);
    setCurrentCafe(cafe);
  };

  const updateCafe = (newCafe) => {
    setCafes(
      cafes.map((cafe) => (cafe._id == currentCafe._id ? newCafe : cafe))
    );
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
                    <button onClick={() => editCafe(cafe)}>edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {editing ? (
        <EditCafeForm
          currentCafe={currentCafe}
          editCafe={editCafe}
          updateCafe={updateCafe}
          updateCafeDb={updateCafeDb}
          setEditing={setEditing}
          cafes={cafes}
        />
      ) : (
        <NewCafeForm
          addCafe={addCafe}
          initialState={initialState}
          cafeData={cafeData}
          setCafeData={setCafeData}
        />
      )}
    </div>
  );
};

export default CafeView;
