import React, { useState } from "react";
import * as Yup from "yup";
import axios from "axios";

function Step1(props) {
  const defaultState = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    // countryCode: "", TODO, make it more appeliang to a user
  };

  const [formState, setformState] = useState(defaultState);
  const [errors, setErrors] = useState(defaultState);

  const formSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, "Can not be less than two letters.")
      .required("First name is required"),
    lastname: Yup.string()
      .min(2, "Can not be less than two letters.")
      .required("Last name is required"),
    email: Yup.string()
      .email("please type in a valid email address.")
      .required("Must include email address."),
    phone: Yup.string()
      .required("Please type in your phone number")
      .test("int", "Please enter only digits, no spaces", (val) => {
        return val.length >= 9 && /^\d+$/.test(val) && !/\s/.test(val);
      }),
    // TODO, make it more appeliang to a user
    // countryCode: Yup.string()
    //   .required("Please type in your country code")
    //   .test("int", "Please enter only digits, no spaces", (val) => {
    //     return val.length >= 1 && /^\d+$/.test(val) && !/\s/.test(val);
    //   }),
  });

  const inputChange = (e) => {
    validateInput(e);
    setformState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const validateInput = (e) => {
    e.persist();
    Yup.reach(formSchema, e.target.name)
      //we can then run validate using the value
      .validate(e.target.value)
      // if the validation is successful, we can clear the error message
      .then(() => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
        // change the values in the parent container
        props.handleChange(e);
      })
      /* if the validation is unsuccessful, we can set the error message to the message
        returned from yup (that we created in our schema) */
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });
  };

  const handleSubscription = (e) => {
    props.handleChange(e);
    if (e.target.value === "Yes") {
      subscriptionForNewsLettes(formState);
      console.log("after post request");
    }
  };

  const subscriptionForNewsLettes = (userData) => {
    axios
      .post("http://127.0.0.1:8000/api/signup/subscriptionForNewsletters/", {
        firstName: userData.firstname,
        lastName: userData.lastname,
        email: userData.email,
        phoneNumber: userData.phone,
        // countryCode: userData.countryCode, TODO, make it more appeliang to a user
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (props.state.currentStep !== 1) {
    return null;
  }
  return (
    <div className="form-group step-form">
      {/*delete this later*/}
      <p>
        This is a new portal. If you experience any problems, please contact us
        at mentor@villagebookbuilders.org
      </p>
      <label htmlFor="firstname">First Name</label>

      <input
        className="form-control"
        id="firstname"
        name="firstname"
        required
        type="text"
        placeholder="Enter first name - ie 'John'"
        value={formState.firstname}
        onChange={(event) => inputChange(event)}
      />

      {errors.firstname.length > 0 ? (
        <p className="error">{errors.firstname}</p>
      ) : null}

      <label htmlFor="lastname">Last Name</label>
      <input
        required
        className="form-control"
        id="lastname"
        name="lastname"
        type="text"
        placeholder="Enter last name - ie 'Doe'"
        value={formState.lastname}
        onChange={(event) => inputChange(event)}
      />
      {errors.lastname.length > 0 ? (
        <p className="error">{errors.lastname}</p>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        className="form-control"
        id="email"
        name="email"
        required
        type="mail"
        placeholder="Enter email (please triple-check spelling!) - ie 'johndoe@gmail.com'"
        value={formState.email}
        onChange={(event) => inputChange(event)}
      />
      {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}

      <label htmlFor="phone">Phone Number</label>
      <input
        className="form-control"
        id="phone"
        name="phone"
        type="tel"
        placeholder="Enter phone number (digits only) ie '1234567890'"
        value={formState.phone}
        onChange={(event) => inputChange(event)}
      />
      {errors.phone.length > 0 ? <p className="error">{errors.phone}</p> : null}

      {/* TODO, make it more appeliang to a user  */}
      {/* <label htmlFor="countryCode">Country code</label>
      <input
        className="form-control"
        id="countryCode"
        name="countryCode"
        type="tel"
        placeholder="Enter your country code (digits only) ie '1' - USA, '52' - Mexico"
        value={formState.countryCode}
        onChange={(event) => inputChange(event)}
      />
      {errors.countryCode.length > 0 ? (
        <p className="error">{errors.countryCode}</p>
      ) : null} */}

      <br />
      <div>
        <label>Are you currently using a VBB email account?</label>
        <select
          name="has_vemail"
          id="has_vemail"
          onChange={props.handleChange}
          value={props.state.has_vemail}
        >
          <option value="no">No</option>
          <option value="unsure">I am unsure.</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      {props.state.has_vemail === "yes" && (
        <div>
          <label htmlFor="vbbemail">
            @villagementors.org email (only if you already have one)
          </label>
          <input
            className="form-control"
            id="vbbemail"
            name="vbbemail"
            type="mail"
            placeholder="ie 'john.doe@villagementors.org' - please tripple check!"
            value={props.state.vbbemail}
            onChange={props.handleChange}
          />
          <br />
        </div>
      )}
      <br />
      {props.state.firstname &&
      props.state.lastname &&
      props.state.email &&
      props.state.phone.length >= 9 ? (
        // && formState.countryCode ?( Uncomment when fix conntry code input
        <div>
          <label>Sign up for newsletter? &nbsp;</label>
          <select
            name="newsletter"
            id="newsletter"
            value={props.state.newsletter}
            onChange={handleSubscription}
          >
            <option value="No choice">-</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      ) : null}
      <br />
      <br />
    </div>
  );
}

export default Step1;
