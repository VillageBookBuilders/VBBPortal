import React from 'react';
import {Elements, loadStripe, CardElement, injectStripe, StripeProvider} from '@stripe/react-stripe-js';
import { Alert, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class CheckoutForm extends React.Component {
  state = {
    data: null,
    loading: false,
    error: null,
    success: false,
  };

  handleSelectChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };
  submit = ev => {
    ev.preventDefault();
    var checkoutURL = "api/checkout/"
    this.setState({ loading: true });
    if (this.props.stripe) {
      this.props.stripe.createToken().then(result => {
        if (result.error) {
          this.setState({ error: result.error.message, loading: false });
        } else {
          this.setState({ error: null });
          axios //authAxios
            .post(checkoutURL, {
              stripeToken: result.token.id,
            })
            .then(res => {
              this.setState({ loading: false, success: true });
            })
            .catch(err => {
              this.setState({ loading: false, error: err });
            });
        }
      });
    } else {
      console.log("Stripe is not loaded");
    }
  };

  render() {
    const {
      data,
      error,
      loading,
      success,
    } = this.state;

    return (
      <div>
        {error && (
          <Alert
            error
            header="There was some errors with your submission"
            content={JSON.stringify(error)}
          />
        )}
        {loading && (
          <div>
            <Spinner/>
          </div>
        )}
        <React.Fragment>
          <h2>Would you like to complete the purchase?</h2>
          <CardElement />
          {success && (
            <Alert>
              <h3>Your payment was successful</h3>
            </Alert>
          )}
          <button
            loading={loading}
            disabled={loading}
            primary
            onClick={this.submit}
            style={{ marginTop: "10px" }}
          >
            Submit
          </button>
        </React.Fragment>
      </div>
    );
  }
};

const WrappedForm = () => (
  <React.Fragment text>
    <StripeProvider apiKey="">
      <div>
        <h1>Complete your order</h1>
        <Elements>
          {injectStripe(CheckoutForm)}
        </Elements>
      </div>
    </StripeProvider>
  </React.Fragment>
);

export default WrappedForm;