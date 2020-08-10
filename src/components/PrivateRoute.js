import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

const PrivateRoute = ({
  component: Component,
  token,
  loading,
  isLoading,
  isAuthenticated,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (loading) {
        return (
          <Spinner
            animation="border"
            variant="dark"
            className="loading-spinner"
          />
        );
      } else if (token === null) {
        return <Redirect to="/signin" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state) => ({
  token: state.token,
  loading: state.loading,
});

export default connect(mapStateToProps)(PrivateRoute);
