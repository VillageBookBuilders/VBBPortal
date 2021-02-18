import React from "react";
import { NavLink } from "react-router-dom";
function Step4(props) {
  if (props.state.currentStep !== 4) {
    return null;
  }
  return (
    <div className='step-4-container'>
      <div style={{textAlign:"center"}}>
      <h1>100% OF YOUR DONTAION</h1>
      <h4>GOES TO BRINGING HOPE THROUGH EDUCATION</h4>
      <p>All online donations cover the mentor program and other in-country projects like libraries, solar panels, bathrooms, books, and computers. </p>
      
      <iframe width="800px" height="450px" 
      src="https://www.youtube.com/embed/saahzNO1-aU?controls=0&autoplay=1" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      
      <NavLink className='donateButton btn' to="/donate/" 
          onClick={(event) => {event.preventDefault(); window.open(window.location.pathname.replace('register','donate'));}}>
          <h1>Donate</h1>
      </NavLink>

      
      </div>
    </div>
  );
}

export default Step4;
