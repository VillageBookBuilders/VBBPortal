import React, { useState, useEffect } from 'react'
import {loadStripe} from '@stripe/stripe-js';
import {ReactComponent as Circle} from './circle.svg'
import {ReactComponent as Tick} from './tick.svg'


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUB_KEY || 'pk_test_8EURQq6ARdRXnNH6AiQh0gXQ');
const port = 3000
const successUrl = process.env.SUCCESS_URL || `http://localhost:${port}/thankyou`
const cancelUrl = process.env.CANCEL_URL || `http://localhost:${port}/tryagain`
console.log(successUrl, cancelUrl);
const dynamicContent = {
  monthly: {
    t1: {
      priceDisplay: '$11.33',
      priceId: 'price_1IRk3IDskGpJFQkEbQ2iSjWl',
      description: `$11.33 allows a child to be mentored for 1 month (includes digital and physical infrastructure maintenance costs)`,
      className: 'tier1 tierBase tierSelected',
      name: 't1'
    },
    t2: {
      priceDisplay: '$30',
      priceId: 'price_1IRk3IDskGpJFQkEjWtRwWPU',
      description: `$30 Due to the small space and the multiple mentors sessions that we have these noise cancelling headphones
       help to provide a high quality session for both the mentor and mentee.`,
      className: 'tier2 tierBase',
      name: 't2'
    },
    t3: {
      priceDisplay: '$250',
      priceId: 'price_1IRk3IDskGpJFQkEMF9BfXwr',
      description: `$250 helps to provide a computer that will serve 30 mentees per week.`,
      className: 'tier3 tierBase',
      name: 't3'
    }
  },
  once: {
    t1: {
      priceDisplay: '$11.33',
      priceId: 'price_1IRk3IDskGpJFQkE5CgQmARD',
      description: `$11.33 allows a child to be mentored for 1 month (includes digital and physical infrastructure maintenance costs)`,
      className: 'tier1 tierBase tierSelected',
      name: 't1'
    },
    t2: {
      priceDisplay: '$30',
      priceId: 'price_1IRk3IDskGpJFQkE68ea0zWi',
      description: `$30 Due to the small space and the multiple mentors sessions
       that we have these noise cancelling headphones help to provide a high quality session for both the mentor and mentee.`,
      className: 'tier2 tierBase',
      name: 't2'
    },
    t3: {
      priceDisplay: '$250',
      priceId: 'price_1IRk3IDskGpJFQkEZJ9xBp3w',
      description: `$250 helps to provide a computer that will serve 30 mentees per week.`,
      className: 'tier3 tierBase',
      name: 't3'
    }
  },
}


function Donation({realDonation}) {
  const [freq, setFreq] = useState(true)
  const [tier, setTier] = useState(freq ? (dynamicContent.monthly) : (dynamicContent.once))
  const [selectedTier, setSelectedTier] = useState({name: 't2', priceId:'price_1IRk3IDskGpJFQkEjWtRwWPU'})
  const { t1, t2, t3 } = tier
  const handleCheckOutDonations = async () => {
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [{
        price: selectedTier.priceId, 
        quantity: 1,
      }],
      mode: freq ? 'subscription' : 'payment',
      successUrl: successUrl,
      cancelUrl: cancelUrl,
    })
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  const handleSelectTier = e => {
    const eventTierName = e.target.getAttribute('name')
    if (eventTierName !== null){
      setSelectedTier({ name: eventTierName, priceId: tier[eventTierName].priceId})
    }
    }

  const handleSelectFreq = e => {
    const newFreq = e.target.getAttribute('name')
    if (newFreq === 'monthly') {
      setFreq(true)
      setSelectedTier({name: "t2", priceId: "price_1IRk3IDskGpJFQkEjWtRwWPU"}) // 30 per month
    } else {
      setFreq(false)
      setSelectedTier({name: "t2", priceId: "price_1IRk3IDskGpJFQkE68ea0zWi"}) // 30 once
    }
  }
  useEffect(() => {
    setTier(freq ? (dynamicContent.monthly) : (dynamicContent.once))
  }, [freq])
  return(
    <div className='donation-form-container'>
      <div className='donation-form'>
        <div className='freq-buttons-container'>
          <div name='monthly' onClick={handleSelectFreq} className={freq?'freqbtn freqSelected':'freqbtn'}><h5 name='monthly' onClick={handleSelectFreq}>MONTHLY</h5></div>
          <div name='once' onClick={handleSelectFreq} className={!freq?'freqbtn freqSelected':'freqbtn'}><h5 name='once' onClick={handleSelectFreq}>GIVE ONCE</h5></div>
        </div>
        <div className='amount-options'>
          <div className={t1.className} >
            <div className='iconContainer' >
              {t1.name === selectedTier.name ? <Tick name='t1' onClick={handleSelectTier}/> 
              : <Circle name='t1' onClick={handleSelectTier}/>}
              </div>
            <h1>{t1.priceDisplay}</h1>
            <h6>{t1.description}</h6>
          </div>
          <div className={t2.className} >
            <div className='iconContainer'>
              {t2.name === selectedTier.name ? <Tick name='t2' onClick={handleSelectTier}/> 
              : <Circle name='t2' onClick={handleSelectTier}/>}
              </div>
            <h1>{t2.priceDisplay}</h1>
            <h6>{t2.description}</h6>
          </div>
          <div className={t3.className} >
            <div className='iconContainer'>
              {t3.name === selectedTier.name ? <Tick name='t3' onClick={handleSelectTier}/> 
              : <Circle name='t3' onClick={handleSelectTier}/>}
              </div>
            <h1>{t3.priceDisplay}</h1>
            <h6>{t3.description}</h6>
          </div>
        </div>
        <div className='custom-and-submit'>
          <div className='custom-and-submit-content-container'>
          <p>A monthly donation of $5 will allow your mentee to have regular access to a computer, 
            headphones, Wi-Fi connection, a safe learning environment, 
            and Khan Academy's award-winning educational programs.</p>
          <div className='donateButton btn' onClick={handleCheckOutDonations}>
            <h1>Donate!</h1>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donation;