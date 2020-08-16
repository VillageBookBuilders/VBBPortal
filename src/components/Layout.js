import React from "react";
import AlertDismissable from "./AlertDismissable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";
import fullLogo from "../images/vbb-full-logo.png";
import miniLogo from "../images/vbb-picture-logo.png";

class Layout extends React.Component {
  render() {
    return (
      <div id="page-container">
        <nav
          className="navbar sticky-top  navbar-expand-lg navbar-light"
          id="vbb-full-bar"
        >
          <a
            id="full-logo"
            href="https://www.villagebookbuilders.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={fullLogo}
              alt="Logo"
              style={{ width: "200px", marginLeft: "30px" }}
            />
          </a>
          <a
            id="mini-logo"
            href="https://www.villagebookbuilders.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={miniLogo} alt="Logo" style={{ width: "45px" }} />
          </a>
          <a href="/" id="bar-header-link">
            <h1 id="bar-header" style={{ marginBottom: "-25px" }}>
              Vbb Portal
              <span className="badge badge-secondary">NEW</span>
            </h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            {this.props.isAuthenticated ? (
              <div className="btn-pair">
                <a
                  className="btn btn-light donate-btn"
                  type="button"
                  href="https://www.villagebookbuilders.org/donate/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginRight: "20px" }}
                >
                  DONATE
                </a>
                <a
                  className="btn btn-light signout-btn"
                  type="button"
                  href="/signin/"
                  onClick={this.props.logout}
                >
                  SIGN OUT
                </a>
              </div>
            ) : (
              <div className="btn-pair">
                <a
                  className="btn btn-light signup-btn"
                  type="button"
                  href="/signup/"
                  style={{ marginRight: "20px" }}
                >
                  REGISTER
                </a>
                <a
                  className="btn btn-light signin-btn"
                  type="button"
                  href="/signin/"
                >
                  SIGN IN
                </a>
              </div>
            )}
          </div>
        </nav>

        <div className="content">
          <AlertDismissable close={this.props.logout} {...this.props} />

          {this.props.children}
        </div>

        <footer>&copy; Village Book Builders | All Rights Reserved</footer>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Layout));
