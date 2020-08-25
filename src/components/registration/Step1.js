import React from "react";

function Step1(props) {
  if (props.state.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group step-form">
      {/*delete this later*/}
      <p>This is a new portal. If you experience any problems, please contact us at mentor@villagebookbuilders.org</p>
      <label htmlFor="firstname">First Name</label>

      <input
        className="form-control"
        id="firstname"
        name="firstname"
        required
        type="text"
        placeholder="Enter first name - ie 'John'"
        value={props.state.firstname}
        onChange={props.handleChange}
      />

      <label htmlFor="lastname">Last Name</label>
      <input
        required
        className="form-control"
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Enter last name - ie 'Doe'"
        value={props.state.lastname}
        onChange={props.handleChange}
      />

      <label htmlFor="email">Email Address</label>
      <input
        className="form-control"
        id="email"
        name="email"
        required
        type="mail"
        placeholder="Enter email (please triple-check spelling!) - ie 'johndoe@gmail.com'"
        value={props.state.email}
        onChange={props.handleChange}
      />

      <label htmlFor="vbbemail">
        @villagementors.org email (ONLY if you ALREADY have one)
      </label>
      <input
        className="form-control"
        id="vbbemail"
        name="vbbemail"
        required
        type="mail"
        placeholder="Enter your current/existing villagementors.org email - ie 'john.doe@villagementors.org'"
        value={props.state.vbbemail}
        onChange={props.handleChange}
      />

      <label htmlFor="phone">Phone Number</label>
      <input
        className="form-control"
        id="phone"
        name="phone"
        type="tel"
        placeholder="Enter phone number (digits only) ie '1234567890'"
        value={props.state.phone}
        onChange={props.handleChange}
      />

      <br />

      <div>
        <label>Sign up for newsletter? &nbsp;</label>
        <select
          name="newsletter"
          id="newsletter"
          value={props.state.newsletter}
          onChange={props.handleChange}
        >
          <option value="No choice">-</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
      <br />
      <br />
    </div>
  );
}

export default Step1;
