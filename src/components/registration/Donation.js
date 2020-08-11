import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_live_nKWeX2hm4oX0Nz3JqpZyyvix');

function Donation() {
  return(
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm/> 
      </Elements>
    </div>
  );
}

export default Donation;