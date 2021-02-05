import React from 'react'
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';


const stripePromise = loadStripe('pk_live_nKWeX2hm4oX0Nz3JqpZyyvix');

function Donation() {
  return(
    <div className='donation-form-container'>
      <div className='donation-form'>
        <div className='freq-buttons'>
          <div className='freqbtn'><h5>MONTHLY</h5></div>
          <div className='freqbtn'><h5>GIVE ONCE</h5></div>
        </div>
        <div className='amount-options'></div>
        <div className='custom-and-submit'></div>
      </div>
    </div>
  );
}

export default Donation;