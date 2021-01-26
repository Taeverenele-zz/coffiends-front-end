import { Link } from "react-router-dom"

const OrderView = (props) => {
    const { coffee, cafe } = props
    return (
        <>
            <div></div>
            <p><Link to="/map">I don't want that! Take me back!</Link></p>
            <h3>Order for: {cafe}</h3>
            <h4>{coffee.type}</h4>
            <p>Size:</p>
            <p>Milk:</p>
            <p>Sugar:</p>
            <p>Price: {coffee.price}</p>
            <button>PLACE ORDER</button>
        </>
    )
}

export default OrderView