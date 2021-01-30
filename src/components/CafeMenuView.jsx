import { Link } from "react-router-dom";
import { Row, Col, Table } from "reactstrap";

const CafeMenuView = (props) => {
  const { menu, userCafe } = props;

  return (
    <>
      <h2>{userCafe.cafe_name}</h2>
      <Link to="/dashboard"><button>BACK</button></Link>
      <div className="mt-4">
        <Row>
          <Col>
            <Table hover>
              <thead>
                <tr>
                  <th>Coffee</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {menu ? (menu.map((item) => (
                  <tr key={item._id}>
                    <td>{item.coffee.name}</td>
                    <td>{item.coffee.description}</td>
                    <td>${item.price.toFixed(2)}</td>
                  </tr>
                ))) : <></>}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CafeMenuView;
