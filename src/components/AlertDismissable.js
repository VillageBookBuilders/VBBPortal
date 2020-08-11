import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'

function AlertDismissible(props) {
    const [show, setShow] = useState(true);
    console.log("message outside of alert", props);
    if (show && props.message) {
      console.log("message in alert", props.message);
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Error:</Alert.Heading>
          <p>
            {props.message}
          </p>
        </Alert>
      );
    }
    return <div/>
  }
  
export default AlertDismissible;