import React, { useState } from 'react'
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
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  return(
    <>
    <div className='donation-form-container'>
      <div className='donation-form'>
        <div className='freq-buttons'>
          <div onClick={()=>setFreq(true)} className={freq?'freqbtn freqSelected':'freqbtn'}><h5>MONTHLY</h5></div>
          <div onClick={()=>setFreq(false)} className={!freq?'freqbtn freqSelected':'freqbtn'}><h5>GIVE ONCE</h5></div>
        </div>
        <div className='amount-options'>
          <div className='tier1 tierSekected'></div>
          <div className='tier2'></div>
          <div className='tier3'></div>
        </div>
        <div className='custom-and-submit'>
          <div className='custom-and-submit-content-container'>
          <h1>Here's how you can support your mentee.
            Your donation covers more than you think</h1>
          <p>A monthly donation of $5 will allow your mentee to have regular access to a computer, 
            headphones, Wi-Fi connection, a safe learning environment, 
            and Khan Academy's award-winning educational programs.</p>
            <div className='Donate Button' onClick={handleCheckOutDonations}>
                  Donate!
                </div>
            </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Donation;