import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Button } from "reactstrap";

// const stripePromise = loadStripe("pk_test_51Hgk6gIGs09UrnPWVrb4HCyxyNcSgdz98ayMvMtR9zXuUOOJJqyb60xsd6ZkuKXIvoiUaiLp64nO3mtpnI9VONwi006bYqT3jh");
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)

const ProductDisplay = ({ handleClick, orderPrice }) => (
    <Button color="info" onClick={handleClick}>${orderPrice.toFixed(2)} - CHECKOUT NOW</Button>
);

const StripeForm = (props) => {
  const { orderDetails } = props;

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await axios.post("http://localhost:5000/checkout", orderDetails);
    const session = await response.data;
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.log(result.error.message);
    };
  };

  return (
    <ProductDisplay handleClick={handleClick} orderPrice={orderDetails.total} />
  );
};

export default StripeForm;
