import {React, useState} from "react";
import { Container, Row, Col, Input, Button, Form, Table } from 'reactstrap';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import { BsDashSquareFill } from 'react-icons/bs';

const showOrders = () => {
    var orderElement = document.getElementById("Past-Orders");
    orderElement.classList.remove("Dashboard-Hide")
    orderElement.classList.add("Dashboard-Show");
  }
  
  const hideOrders = () => {
    var orderElement = document.getElementById("Past-Orders");
    orderElement.classList.remove("Dashboard-Show")
    orderElement.classList.add("Dashboard-Hide");
  }



const CafeDashboardView = (props) => {
    return (
        <Container> 
            <Row className="justify-content-center margin-add-top">
                <h1> Past Orders</h1>
            </Row>
            <Row className="margin-add-top">
            <Table responsive>
      <thead>
        <tr>
          <th>Coffee</th>
          <th>Milk</th>
          <th>Sugar</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Time</th>
          <th>Done</th>

        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Flat White</th>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <th scope="row">Long Black</th>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <th scope="row">Espresso</th>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
      </tbody>
    </Table>
            </Row>


    <Row className="justify-content-center margin-add-top">
        <h1>Past Orders</h1>
        <BsFillPlusSquareFill onClick={showOrders} className="align-self-center Dashboard-Margin-Left" / > 
    </Row>

    <Row className="Dashboard-Hide justify-content-center" id="Past-Orders">

        <BsDashSquareFill className="Admin-Button-Margin justify-content-center" onClick={hideOrders} />

        <Table responsive>
        <thead>
            <tr>
            <th>Coffee</th>
            <th>Milk</th>
            <th>Sugar</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Time</th>
            <th>Done</th>

            </tr>
        </thead>
        <tbody>
            <tr>
            <th scope="row">Flat White</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            </tr>
            <tr>
            <th scope="row">Hot Chocolate</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            </tr>
            <tr>
            <th scope="row">Green Tea</th>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            <td>Table cell</td>
            </tr>
        </tbody>
        </Table>
    </Row>



        </Container>
    )
};

export default CafeDashboardView