import React, { useState } from 'react';
import backwardIcon from '../Images/backward.svg';
import IconButton from '@mui/material/IconButton';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

function Credit({ creditCardOption, setcreditCardOption, paypalOption, setpaypalOption }) {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
  const [clientSecret, setClientSecret] = useState(process.env.REACT_APP_STRIPE_SECRET_KEY);
  const [paymentError, setPaymentError] = useState(null);

  const stripe = useStripe();
  const elements = useElements();

  const handleBackClick = () => {
    setcreditCardOption(!creditCardOption);
    setpaypalOption(!paypalOption);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Create a PaymentIntent on the client-side
    const response = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Replace with your desired amount
    });

    const { clientSecret } = await response.json();
    setClientSecret(clientSecret);

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'https://your-website.com/success', // Replace with your success URL
      },
      redirect: 'if_required',
    });

    if (result.error) {
      setPaymentError(result.error.message);
    } else {
      // Payment successful
      console.log('Payment successful:', result.paymentIntent);
    }
  };

  return (
    <>
      <IconButton onClick={handleBackClick}>
        <img src={backwardIcon} alt="Back" style={{ width: '24px', height: '24px' }} />
      </IconButton>
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          {paymentError && <div>{paymentError}</div>}
          <button type="submit" disabled={!stripe || !clientSecret}>
            Submit
          </button>
        </form>
      </Elements>
    </>
  );
}

export default Credit;