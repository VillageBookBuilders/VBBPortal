import React from 'react';

/*Step 1*/

function Step1(props) {

    if (props.currentStep !== 1) {
      return null
    }
    return (
      <div className="form-group">
    
        <label htmlFor="firstname">First Name</label>
        
        <input 
          className="form-control"
          id="firstname"
          name="firstname"
          required
          type="text"
          placeholder="Enter first name"
          value={props.state.firstname}
          onChange={props.handleChange}
        />
        
        <label htmlFor="lastname">Last Name</label>
        <input required
          className="form-control"
          id="lastname"
          name="lastname"
          type="text"
          placeholder="Enter last name"
          value={props.state.lastname}
          onChange={props.handleChange}
        />
  
        <label htmlFor="email">Email address</label>
        <input
          className="form-control"
          id="email"
          name="email"
          required
          type="mail"
          placeholder="Enter email"
          value={props.state.email}
          onChange={props.handleChange}
        />
  
        <label htmlFor="vbbemail">If you already have a VBB mentor email please add it here</label>
        <input
          className="form-control"
          id="vbbemail"
          name="vbbemail"
          required
          type="mail"
          placeholder="Enter VBB email"
          value={props.state.vbbemail}
          onChange={props.handleChange}
          
        />
  
        <label htmlFor="phone">Phone Number</label>
        <input
          className="form-control"
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter phone number"
          value={props.state.phone}
          onChange={props.handleChange}
          
          /> 
  
         <br/>
       
        <div>
          <label>Sign up for newsletter? &nbsp;</label>
          <select name="newsletter" id="newsletter" value={props.state.newsletter}
          onChange={props.handleChange}>
            <option value="No choice">-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
  
      </div>
    );
  }
   
  export default Step1;