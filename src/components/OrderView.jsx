import { useState } from "react";
import { Link } from "react-router-dom";

const OrderView = (props) => {
    const { coffee, cafe } = props

    const [ orderPrice, setOrderPrice ] = useState(coffee.price)
    const [ size, setSize ] = useState("Regular")
    const [ milk, setMilk ] = useState("")
    const [ sugar, setSugar ] = useState(0)
    const [ pickupTime, setPickupTime ] = useState(Date.now())

    const handleSize = (event) => {
        setSize(event.target.value)
        if (event.target.value === "Large") {
            setOrderPrice((coffee.price + 0.5))
        } else if (event.target.value === "Small") {
            setOrderPrice((coffee.price - 0.5))
        } else if (event.target.value === "Regular") {
            setOrderPrice((coffee.price))
        }
    }
    const handleMilk = (event) => {
        setMilk(event.target.value)
    }
    const handleSugar = (event) => {
        setSugar(event.target.value)
    }
    const handlePickupTime = (event) => {
        let time = new Date().getTime()
        if (event.target.value === "10") {
            time = time + 600000
        } else if (event.target.value === "20") {
            time = time + 1200000
        } else if (event.target.value === "30") {
            time = time + 1800000
        }
        let date = new Date(time)
        setPickupTime(date)
        console.log(date)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        alert(`${size} ${coffee.type} (${milk} milk | ${sugar} sugars) pickup at ${pickupTime} - $${orderPrice.toFixed(2)}`)
    }

    return (
        <>
            <p><Link to="/map">I don't want that! Take me back!</Link></p>
            <h3>Order for: {cafe}</h3>
            <h4>{coffee.type}</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Size: </label>
                    <select value={size} onChange={handleSize}>
                        <option value="Regular">Regular</option>
                        {coffee.type === "espresso" ?
                            (<></>)
                            : (
                                <>
                                <option value="Small">Small -$0.50</option>
                                <option value="Large">Large +$0.50</option>
                                </>
                            )}
                    </select>
                </div>
                {coffee.type === "espresso" || coffee.type === "long black" ?
                    (<div></div>)
                    : (
                        <div>
                            <label>Milk:</label>
                            <select value={milk} onChange={handleMilk}>
                                <option value="Regular">Full Cream</option>
                                <option value="Skim">Skim</option>
                                <option value="Soy">Soy</option>
                                <option value="Almond">Almond</option>
                            </select>
                        </div>
                    )}
                <div>
                    <label>Sugar:</label>
                    <select value={sugar} onChange={handleSugar}>
                        <option value="0">No Sugar (I'm sweet enough already thanks)</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </div>
                <div>
                    <label>Pickup Time:</label>
                    <select onChange={handlePickupTime}>
                        <option value="0">ASAP!</option>
                        <option value="10">10 mins</option>
                        <option value="20">20 mins</option>
                        <option value="30">30 mins</option>
                    </select>
                </div>
                <button>${orderPrice.toFixed(2)} - BUY NOW</button>
            </form>
        </>
    )
}

export default OrderView