import React, { Component } from "react";
import { connect } from "react-redux";
import { GoogleLogin } from "react-google-login";
import hope_books from "../vbb_in_action.png";
import * as actions from "../store/actions/auth";

export class HomeSignin extends Component {
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
      <div className="twocol-container" style={{}}>
        <div className="column leftcol" id="signin-box">
          <h1 id="welcome-header">Welcome to the new VBB Portal !</h1>
          <h4 id="portal-purpose">
            Now, giving hope through books is only a few clicks away.
          </h4>
          <br />
          <div id="google-box">
            <GoogleLogin
              clientId="711431548719-lpoc2lbr4bmruqo7d9emua5huvpsvqgk.apps.googleusercontent.com"
              buttonText="Sign in with VBB G Suite (@villagementors.org)"
              onSuccess={this.validateGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
              style={{ width: "100%" }}
            />
          </div>
          <br />
          <hr />
          <br />
          <div id="create-account-box">
            <p style={{ paddingLeft: "0px", fontSize: "20px" }}>
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
        <div className="column rightcol" id="signin-picture-box">
          <img
            src={hope_books}
            id="signin-picture"
            alt="Pic"
            style={{ width: "100%" }}
          />
        </div>
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
