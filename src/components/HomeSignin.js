import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import vbbInAction from "../images/vbb-in-action.png";
import * as actions from "../store/actions/auth";

export class HomeSignin extends Component {
  responseGoogle = (response) => {
    console.log("failure response", response);
    alert("Google authorization failed ", response);
  };
  validateGoogle = (response) => {
    this.props.onGauth(response.accessToken);
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="twocol-container">
        <div className="column" id="signin-box">
          <h1 id="welcome-header">Welcome to VBB Portal!</h1>
          <h4 id="portal-purpose">
            Let's give hope to children through mentoring.
          </h4>
          <br />
          <div id="google-box">
            <GoogleLogin
              clientId="711431548719-lpoc2lbr4bmruqo7d9emua5huvpsvqgk.apps.googleusercontent.com"
              buttonText="Click here to Validate and Continue to the Portal"
              onSuccess={this.validateGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
              style={{ width: "100%", paddingTop: "30px" }}
            />
          </div>
          <br />
          <hr id="sep-bar" />
          <br />
          <div id="create-account-box">
            <p
              style={{
                paddingLeft: "0px",
                fontSize: "20px",
                color: "#ff914d",
                fontWeight: "bolder",
              }}
            >
              Don't have an account with us yet?
            </p>
            <a
              className="btn btn-light signup-btn"
              type="button"
              href="/signup/"
            >
              REGISTER
            </a>
          </div>
        </div>
        <img
          src={vbbInAction}
          id="signin-picture"
          alt="Pic"
          style={{ width: "600px", margin: "5vw" }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGauth: (googleToken) => dispatch(actions.gAuth(googleToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeSignin);
