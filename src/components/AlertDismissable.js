import React from "react";
import Alert from "react-bootstrap/Alert";

function AlertDismissible(props) {
  console.log("message outside of alert", props);
  if (props.message) {
    console.log("message in alert", props.message);
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
