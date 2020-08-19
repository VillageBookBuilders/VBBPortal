import React from "react";
import Alert from "react-bootstrap/Alert";

function AlertDismissible(props) {
  if (props.message) {
    return (
      <div className="alert-div-container">
        <div className="alert-div">
          <Alert variant="danger" onClose={() => props.close()} dismissible>
            <Alert.Heading>Error</Alert.Heading>
            
            {
              props.message.includes("Sorry, you need to use a villagementors.org Gsuite account to log in to this website.") ?
              <p className="alert-msg">
                Sorry, you need to use a villagementors.org Gsuite account to log in to this website. 
                If you do not have a village mentors account, please&nbsp;
                <a
                  href="/signup/"
                >
                  sign up
                </a>
                &nbsp;for one using the register link above.<br/><br/>
                If you already signed up, please make sure you are logged in to your villagementors.org Gsuite account by&nbsp;
                <a
                  href="https://accounts.google.com/AddSession"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                 clicking here
                </a>
                , then try again. 
              </p>
              :
              <p className="alert-msg">{props.message}</p>
            }
          </Alert>
        </div>
      </div>
    );
  }
  return <div />;
}

export default AlertDismissible;
