import React, { useState } from 'react'
import {CardElement, Elements, PaymentRequestButtonElement} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_8EURQq6ARdRXnNH6AiQh0gXQ');



function Donation() {
  const [freq, setFreq] = useState(true)
  const handleCheckOutDonations = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: 'price_1II0XgDskGpJFQkEQxzaxI93', // Replace with the ID of your price
        quantity: 1,
      }],
      mode: 'payment',
      successUrl: 'http://localhost:3000/register',
      cancelUrl: 'http://localhost:3000/register',
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return(
    <>
    <Elements stripe={stripePromise}>
    <div className='donation-form-container'>
      <div className='donation-form'>
        <div className='freq-buttons'>
          <div onClick={()=>setFreq(true)} className={freq?'freqbtn selected':'freqbtn'}><h5>MONTHLY</h5></div>
          <div onClick={()=>setFreq(false)} className={!freq?'freqbtn selected':'freqbtn'}><h5>GIVE ONCE</h5></div>
        </div>
        <div className='amount-options'>
          <div className='tier1'></div>
          <div className='tier2'></div>
          <div className='tier3'></div>
        </div>
        <div className='custom-and-submit'>
            <button role="link" onClick={handleCheckOutDonations}>
                  Check out dontaion prices
                </button>
        </div>
      </div>
    </div>
    </Elements>
    </>
  );
}

export default Donation;