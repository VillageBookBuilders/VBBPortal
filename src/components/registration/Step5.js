import React from "react";

function Step5(props) {
  if (props.state.currentStep !== 5) {
    return null;
  }
  return (
    <React.Fragment>
      <div className="form-group step-form">
        <div>
          <h5>One last thing: How you can get more involved</h5>
          <label>
            Our organization is built by volunteers like you, and we need your
            help to spread hope through books.
          </label>
        </div>

        <div>
          <label>Would you like to get more involved?</label>
          <select
            name="more_involved"
            id="more_involved"
            value={props.state.more_involved}
            onChange={props.handleChange}
          >
            <option value="">-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {props.state.more_involved === "Yes" && (
          <div>
            <label>
              How would you like to get more involved (Select all that apply)?
            </label>
            <select
              name="desired_involvement"
              id="desired_involvement"
              value={props.state.desired_involvement}
              onChange={props.handleChange}
            >
              <option value="">--</option>
              <option value="Fundraiser"> Run or help with a fundraiser</option>
              <option value="Ambassador">
                {" "}
                Be a social media advocate or an ambassador
              </option>
              <option value="StartChapter">
                {" "}
                Start/join a VBB Village Mentors Chapter at your school or
                company (a club of fellow mentors)
              </option>
              <option value="JoinClub"> Start/Join a Book Club</option>
              <option value="Research"> Research</option>
              <option value="Other"> Other</option>
            </select>
            <br />
            <br />
            <br />
          </div>
        )}

        <label htmlFor="city">
          What city and state/province do you live in?
        </label>
        <input
          className="form-control"
          id="city"
          name="city"
          required
          type="text"
          placeholder="ie 'Philadelphia, PA'"
          value={props.state.city}
          onChange={props.handleChange}
        />
      </div>

      <div style={{ "whiteSpace": "pre-wrap", color: "red" }}>
        {props.hasProblems() && props.hasProblems()}
      </div>

      <button
        className="btn btn-success btn-block"
        disabled={props.hasProblems()}
        style={{ marginBottom: "20px", marginTop: "20px" }}
      >
        SIGN UP
      </button>
    </React.Fragment>
  );
}

export default Step5;
