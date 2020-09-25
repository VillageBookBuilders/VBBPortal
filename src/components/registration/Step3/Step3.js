import React from "react";

import UserAgreement from "./UserAgreement";
import "./Step3.css";

function Step3(props) {
  if (props.state.currentStep !== 3) {
    return null;
  }
  return (
    <div className="Step3_container form-group step-form">
      <div className="Step3_item">
        <h5>Terms and Conditions</h5>
        <UserAgreement />
      </div>

      <div className="Step3_item">
        <label htmlFor="termsCond">
          Do you agree to the Terms and Conditions as explained here?
        </label>
        <select
          name="termsCond"
          id="termsCond"
          value={props.state.termsCond}
          onChange={props.handleChange}
        >
          <option value="No choice">-</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label htmlFor="charged">
          Have you ever been arrested, charged, or convicted of any crime?
        </label>
        <select
          name="was_charged"
          id="was_charged"
          value={props.state.was_charged}
          onChange={props.handleChange}
        >
          <option value="No choice">-</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      {props.state.was_charged === "Yes" && (
        <div>
          <label htmlFor="charged">
            If yes, please briefly explain each case below:
          </label>
          <textarea
            className="form-control"
            id="charged"
            name="charged"
            placeholder=""
            value={props.state.charged}
            onChange={props.handleChange}
          />
        </div>
      )}

      <div>
        <label htmlFor="commit">
          Can you commit to being a mentor for a minimum of 4 months?
        </label>
        <select
          name="commit"
          id="commit"
          value={props.state.commit}
          onChange={props.handleChange}
        >
          <option value="No choice">-</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <label htmlFor="initials">
        Do you agree to the above terms and conditions, and to 4-month
        commitment to your mentoring session?
      </label>
      {props.state.adult === "No" ? (
        <p>Please have a Parent or Guardian sign by typing their initials.</p>
      ) : (
        <p>Sign by typing your initials.</p>
      )}

      <input
        className="form-control"
        id="initials"
        name="initials"
        type="text"
        placeholder="Initials - ie 'JTD'"
        value={props.state.initials}
        onChange={props.handleChange}
      />
    </div>
  );
}

export default Step3;
