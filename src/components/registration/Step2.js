import React from 'react';
import moment from 'moment';


function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    }
    return (
      <div className="form-group">
        <div>
          <label>Are you 18 years or older?</label>
          <select name="age" id="age" value={props.state.age}
            onChange={props.handleChange}>
            <option value="No choice">-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
        <div>
          <label>Which of the following best describes you?</label>
          <select name="occupation" id="occupation" onChange={props.handleChange}
            value={props.state.occupation}>
            <option value="No choice">-</option>
            <option value="Homemaker">Homemaker</option>
            <option value="Retired">Retired</option>
            <option value="Working Professional">Working Professional</option>
            <option value="College_Student">College Student</option>
            <option value="HS_Student">High School Student</option>
            <option value="Other">Other</option>
          </select>
        </div>
        {
          props.state.occupation === "College_Student" && 
          <div>
            <label>Are you part of VBB Village Mentors Chapter/Club</label>
            <select name="vbb_chapter" id="vbb_chapter" value={props.state.vbb_chapter}
            onChange={props.handleChange}>
              <option value="No choice">-</option>  
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        }
        <label htmlFor="affiliation">What organization or school are you affiliated with?</label>
        <input
          className="form-control"
          id="affiliation"
          name="affiliation"
          type="affiliation"
          placeholder="If none, leave blank"
          value={props.affiliation}
          onChange={props.handleChange}
        />
        <label htmlFor="opportunity">How did you hear about this opportunity?</label>  
        <select name="opportunity" id="opportunity" type="opportunity"
         value={props.opportunity}
          onChange={props.handleChange} >
          <option value="No choice">-</option>    
          <option value="Friend">Friend</option>
          <option value="Google">Google</option>
          <option value="FaceBook">FaceBook</option>
          <option value="Instagram">Instagram</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="JustServe">JustServe</option>
          <option value="VolunteerMatch">VolunteerMatch</option>
          <option value="Through my organization/school">Through my organization/school</option>
          <option value="Other">Other</option>
        </select>
  
        <label htmlFor="languague">What languages can you speak comfortably?</label>
        <input
          className="form-control"
          id="language"
          name="language"
          type="language"
          placeholder="English, Spanish, Portuguese, Italian, etc"
          value={props.language}
          onChange={props.handleChange}
        />     
  
        <div>
          <label htmlFor="timeZone">What Timezone are you in?</label>&nbsp;
          <select name="timeZone" id="timeZone" onChange={ props.handleChange } value={props.state.timeZone}>
          {
            moment.tz.names().map(tz => {
              return <option key={tz} value={tz}>{tz}</option>;
          })}
          </select>
        </div>
      </div>
    );
  }

  export default Step2;