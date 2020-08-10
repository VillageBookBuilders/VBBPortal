import React, { useState } from "react";
import Alert from 'react-bootstrap/Alert'

function AlertDismissible(props) {
    const [show, setShow] = useState(true);
  
    if (show) {
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