import React from "react";
import moment from "moment";

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <div className="form-group step-form">
      <div>
        <label>Are you 18 years or older?</label>
        <select
          name="adult"
          id="adult"
          value={props.state.adult}
          onChange={props.handleChange}
        >
          <option value="No choice">-</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <div>
        <label>Which of the following best describes you?</label>
        <select
          name="occupation"
          id="occupation"
          onChange={props.handleChange}
          value={props.state.occupation}
        >
          <option value="No choice">-</option>
          <option value="Homemaker">Homemaker</option>
          <option value="Retired">Retired</option>
          <option value="Working Professional">Working Professional</option>
          <option value="College_Student">College Student</option>
          <option value="HS_Student">High School Student</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {props.state.occupation === "College_Student" && (
        <div>
          <label>Are you part of VBB Village Mentors Chapter/Club</label>
          <select
            name="vbb_chapter"
            id="vbb_chapter"
            value={props.state.vbb_chapter}
            onChange={props.handleChange}
          >
            <option value="No choice">-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
            <option value="Interested">No, but I'm interested!</option>
          </select>
        </div>
      )}
      <label htmlFor="affiliation">
        What organization or school are you affiliated with?
      </label>
      <input
        className="form-control"
        id="affiliation"
        name="affiliation"
        type="affiliation"
        placeholder="ie 'NYU' - If none, leave blank"
        value={props.state.affiliation}
        onChange={props.handleChange}
      />
      <label htmlFor="referral_source">
        How did you hear about this opportunity?
      </label>
      <select
        name="referral_source"
        id="referral_source"
        type="referral_source"
        value={props.state.referral_source}
        onChange={props.handleChange}
      >
        <option value="No choice">-</option>
        <option value="Friend">Friend</option>
        <option value="Google">Google</option>
        <option value="FaceBook">FaceBook</option>
        <option value="Instagram">Instagram</option>
        <option value="LinkedIn">LinkedIn</option>
        <option value="JustServe">JustServe</option>
        <option value="VolunteerMatch">VolunteerMatch</option>
        <option value="Through my organization/school">
          Through my organization/school
        </option>
        <option value="Other">Other</option>
      </select>

      <label htmlFor="languague">
        What languages can you speak comfortably?
      </label>
      <input
        className="form-control"
        id="languages"
        name="languages"
        type="languages"
        placeholder="ie 'Spanish, English, Some Portuguese'"
        value={props.state.languages}
        onChange={props.handleChange}
      />

      <div>
        <label htmlFor="time_zone">What timezone are you in?</label>&nbsp;
        <select
          name="time_zone"
          id="time_zone"
          onChange={props.handleChange}
          value={props.state.time_zone}
        >
          {moment.tz.names().map((tz) => {
            if(tz.includes("Etc/GMT")) return null;
            return (
              <option key={tz} value={tz}>
                {tz}
              </option>
            );
          })}
        </select>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Step2;
