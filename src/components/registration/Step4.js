import React from "react";
import { NavLink } from "react-router-dom";
import './registrationStyles.css'
function Step4(props) {
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const ytVidWidth = vw > 540 ? '800px' : '267px'
  const ytVidHeigth = vw > 540 ? '450px' : '150px'
  if (props.state.currentStep !== 4) {
    return null;
  }
  return (
    <div className='step-4-container'>
      <div style={{textAlign:"center"}}>
      <h1>YOUR DONATIONS</h1>
      <h4>GO TO BRINGING HOPE THROUGH EDUCATION</h4>
      <p>All online donations cover the mentor program and other in-country projects like libraries, solar panels, books, and computers. </p>
      
      <iframe width={ytVidWidth} height={ytVidHeigth}
      src="https://www.youtube.com/embed/saahzNO1-aU?controls=0&autoplay=1" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      
      <NavLink 
        className='donateButton btn' 
        to="/donate/" 
        onClick={(event) => {event.preventDefault(); window.open(window.location.pathname.replace('register','donate'));}}
        style={{marginTop: '2rem', marginBottom:'2rem'}}
        >
          <h1 style={{fontSize:'2rem'}}>Donate</h1>
      </NavLink>

      
      </div>
    </div>
  );
}

export default Step4;
