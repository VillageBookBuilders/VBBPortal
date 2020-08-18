import React from "react";
import Alert from "react-bootstrap/Alert";

function AlertDismissible(props) {
  if (props.message) {
    return (
      <div className="alert-div-container">
        <div className="alert-div">
          <Alert variant="danger" onClose={() => props.close()} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            <p className="alert-msg">{props.message}</p>
          </Alert>
        </div>
      </div>
    );
  }
  return <div />;
}

export default AlertDismissible;
