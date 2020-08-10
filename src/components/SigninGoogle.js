import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import hope_books from "../vbb_in_action.png";
import * as actions from "../store/actions/auth";

export class SigninGoogle extends Component {
  responseGoogle = (response) => {
    console.log("failure response", response);
    alert("google authorization failed: ", response);
  };
  validateGoogle = (response) => {
    this.props.onGauth(response.accessToken);
    this.props.history.push("/");
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <br />
        <img
          src={hope_books}
          alt="Pic"
          style={{ width: "40%", float: "right", marginRight: "50px" }}
        />

        <div
          className="SigninBox"
          style={{ minWidth: "70%", paddingTop: "30px" }}
        >
          <h3>
            Please use your villagementors.org account
            <br />
            to sign in below:
          </h3>
          <br />
          <GoogleLogin
            style={{ width: "50%" }}
            clientId="711431548719-lpoc2lbr4bmruqo7d9emua5huvpsvqgk.apps.googleusercontent.com"
            buttonText="Sign in with a villagementors.org Gsuite account"
            onSuccess={this.validateGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <br />
          <br />
          <br />
          <p style={{ paddingLeft: "0px" }}>
            Don't have an account with us yet?
          </p>
          <h6>
            <a href="/signup/">Click here</a> to sign up to be a mentor!
          </h6>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    message: state.message
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGauth: (googleToken) => dispatch(actions.gAuth(googleToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SigninGoogle);
