import {React, useState} from "react";
import { Container, Row, Col, Input, Button, Form } from 'reactstrap';
import { useForm } from "react-hook-form";
import NewAdminCafe from "./AdminAddCafe"
import NewAdminCoffee from "./AdminAddCoffee"


const AdminDashboardView = (props) => {

const [exampleCafes, setExampleCafe] = useState([])
const [exampleCoffees, setExampleCoffee] = useState([])

const addCafe = (cafe) => {
    setExampleCafe([...exampleCafes, {cafe: cafe} ])
}

const addCoffee = (coffee) => {
    setExampleCoffee([...exampleCoffees, {coffee: coffee} ])
}

    return (
        <Container>

        <NewAdminCafe addCafe={addCafe}>
            
        </NewAdminCafe>


        <NewAdminCoffee addCoffee={addCoffee}>


        </NewAdminCoffee>


            


            <Row className="justify-content-center margin-add-top">
                <h1>Admin</h1>
            </Row>
            <Row className="justify-content-center">
                <h1>Dashboard</h1>
            </Row>

            <Row>
                <Col sm={{size: 6}} className="text-center margin-add-top">
                    <h3>All Cafes</h3>
                </Col>
                <Col sm={{size: 6}} className="text-center margin-add-top">
                    <h3>All Coffees</h3>
                </Col>
            </Row>

            <Row className="text-center">
                <Col className="Admin-Dashboard-Center">
                
                <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="search Cafes"
                    style={{width: "200px"}}
                    
                />
                </Col>

                <Col className="Admin-Dashboard-Center">
                <Input
                    type="search"
                    name="search"
                    id="exampleSearch"
                    placeholder="search Cafes"
                    style={{width: "200px"}}
                />
                </Col>
            </Row>

                    {/* <ul>
                        {exampleCafes.map(cafe => {
                            return (<li >{cafe.cafe}</li>)
                        })}
                        
                    </ul> */}
            <Row className="margin-add-top">

                <Col className="Admin-Dashboard-Center align-self-center" sm={{size: 6}} >

                    <ul>

                        {exampleCafes.map(cafe => {
                           return ( <li className="Remove-Dot"> {cafe.cafe} 
                            <Button color="primary" size="sm" className="Admin-Button-Margin">Edit</Button>
                            <Button color="primary" size="sm" className="Admin-Button-Margin">Delete</Button>   
                           </li>)
                           
                        })}

                    </ul>



                </Col >
                

                <Col className="Admin-Dashboard-Center align-self-center" sm={{size: 3}}>
                <ul>

                    {exampleCoffees.map(coffee => {
                    return ( <li className="Remove-Dot"> {coffee.coffee} 
                        <Button color="primary" size="sm" className="Admin-Button-Margin">Edit</Button>
                        <Button color="primary" size="sm" className="Admin-Button-Margin">Delete</Button>   
                    </li>)
                    
                    })}

                </ul>
                </Col>
                
            </Row>

        </Container>
    )
}





export default AdminDashboardView 