import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_live_nKWeX2hm4oX0Nz3JqpZyyvix');

function Step4(props) {
    if (props.currentStep !== 4) {
      return null
    }
    return (
  
      <div className="form-group">
        
        <div>
          <h1>Here is how you can
              support your mentee. Your donation covers more than you think.</h1>
          <p>A monthly donation of $5 will allow your mentee to have regular
          access to a computer, headphones, WIFI connection, a safe
          learning environment, and Khan Academy's award-winning
          educational programs.
              </p>
        </div>
        <Elements stripe={stripePromise}>
          <div>
            <label htmlFor="donation">Donation:</label>
            <input
              className="form-control"
              id="donation"
              name="donation"
              type="text"
              placeholder="5.00"
            />
    
          <label htmlFor="donation">Please confirm donation amount:</label>
          <input
            className="form-control"
            id="donation"
            name="donation"
            type="text"
            placeholder="5.00"
    
            />
    
          <div>
            <label htmlFor="monthlyDonation">Monthly Donation</label>
            <input type="checkbox" name="mmonthlyDonation" id="monthlyDonation">
            </input>
          </div>
    
          <label htmlFor="donation">Credit Card Number:</label>
          <input
            className="form-control"
            id="creditCard"
            name="creditCard"
            type="text"
            placeholder="XXXX-XXXX-XXXX-XXXX"
            />
            <label htmlFor="donation">Name on Credit Card:</label>
            <input
              className="form-control"
              id="cardName"
              name="cardName"
              type="text"
              placeholder="Homer Simpson"
            />  
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
        </Elements>

      </div>
  
    );
  }

  export default Step4;