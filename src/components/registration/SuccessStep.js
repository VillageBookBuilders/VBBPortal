import React from "react";

function SuccessStep(props) {
  if (props.state.currentStep !== 6) {
    return null;
  }
  return (
    <div className="form-group step-form">
      <p>
        Thanks for applying! Please check your email for further instructions
        (mail sent to {props.state.email}), or if you see an error message above, 
        please follow the instructions it gives or&nbsp;
        <a href="mailto:mentor@villagebookbuilders.org">
          contact our mentor advisors
        </a>
        &nbsp;for more assistance
      </p>
      <a
        className="btn btn-light signin-btn"
        type="button"
        href="/signin/"
      >
        SIGN IN
      </a>
    </div>
  );
}

export default SuccessStep;