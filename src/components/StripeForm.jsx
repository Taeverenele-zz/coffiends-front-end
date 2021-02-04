import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { Button } from "reactstrap";

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PROMISE}`);

const ProductDisplay = ({ handleClick, orderPrice }) => (
  <Button color="info" onClick={handleClick}>
    ${orderPrice.toFixed(2)} - CHECKOUT NOW
  </Button>
);

const StripeForm = (props) => {
  const { orderDetails } = props;

  const handleClick = async (event) => {
    const stripe = await stripePromise;
    const response = await axios.post(
      `${process.env.REACT_APP_BACK_END_URL}/checkout`,
      orderDetails
    );
    const session = await response.data;
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.log(result.error.message);
    }
  };

  return (
    <ProductDisplay handleClick={handleClick} orderPrice={orderDetails.total} />
  );
};

export default StripeForm;
