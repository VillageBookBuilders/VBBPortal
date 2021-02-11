import React from "react";
import { Link } from "react-router-dom";
import Donation from "../registration/Donation.js"
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
      </div>
        <Donation realDonation={false}/>
      
    </div>
  );
}

export default Step4;
