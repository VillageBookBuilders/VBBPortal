import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import moment from 'moment';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';

class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      currentStep: 1, 
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      vbbemail: '',
      newsletter: '',
      age: '',
      occupation: '',
      affiliation: '',
      opportunity: '',
      language: '',
      availability: '',
      termsCond: '',
      molestation: '',
      mentor4Months: '',
      acceptCommitment: '',
      moreInvolved: '',
      city: '',
      vbb_chapter: '',
      isLoggedIn: false,
      contactSource: '',
      timeZone: moment.tz.guess(),
      status: '',
      

      
    }
  }

  hasProblems =() => {
    var base = "Please fix the following fields before submitting your application:\n"
    var problems = ""
      if (this.state.firstname === "") problems += " - first name\n" 
      if (this.state.lastname === "") problems += " - last name\n"
      if (this.state.email === "") problems+= " - email\n";
      if (this.state.phone === "") problems+= " - phone\n";
      if (this.state.newsletter === "") problems+= " - newsletter\n";
      if (this.state.age === "") problems+= " - age\n";
      if (this.state.occupation === "") problems+= " - occupation\n";
      if (this.state.opportunity === "") problems+= " - opportunity\n";
      if (this.state.language === "") problems+= " - language\n";
      if (this.state.timeZone === "") problems+= " - time zone\n";
      if (this.state.availability === "") problems+= " - availability\n";
      if (this.state.termsCond === "") problems+= " - Terms and Conditions\n";
      if (this.state.molestation === "") problems+= " - arrested\n";
      if (this.state.mentor4Months === "" || this.state.mentor4Months ==="No") problems+= " - mentor for 4 months\n";
      if (this.state.acceptCommitment === "") problems+= " - initials\n";
      if (this.state.moreInvolved === "") problems+= " - get more involved?\n";
      if (this.state.city === "") problems+= " - city\n";
      if (problems === "") return false
      return base + problems 
  }

  handleChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    }, ()=> {console.log(this.state)})
  }

  handleSubmit = event => {
    event.preventDefault()
    
    
    this.props.onAuth(
      this.state.firstname,
      this.state.lastname,
      this.state.timeZone, 
      this.state.email, 
      this.state.vbbemail,
      this.state.phone,
      this.state.newsletter,
      this.state.status,
      this.state.affiliation,
      this.state.contactSource,
      this.state.howInvolved
    )
  }

  _next = () => {
    window.scrollTo(0, 0)
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 4 ? 5 : currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }

  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button" onClick={this._prev}>
          Previous
        </button>
      )
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 5 ) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button" onClick={this._next}>
          Next
        </button>
      )
    }
    return null;
  }

  render() {
    return (

      <React.Fragment>
        <h5>Mentor Registration: Step {this.state.currentStep} of 5</h5>
        <form onSubmit={this.handleSubmit}>
          <Step1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            setState={this.setState}
            state={this.state}
          />

          <Step2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            setState={this.setState}
            state={this.state}
          />

          <Step3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            state={this.state}
          />

          <Step4
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            state={this.state}
          />

          <Step5
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            state={this.state}
            hasProblems={this.hasProblems}
          />  

          {this.previousButton()}
          {this.nextButton()}
        </form>
      </React.Fragment>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (firstname, lastname, timeZone, email, phone, status, affiliation, contact, howInvolved) => 
            dispatch(actions.authSignup(firstname, lastname, timeZone, email, phone, status, affiliation, contact, howInvolved)) 
  }
}


ReactDOM.render(<MasterForm />, document.getElementById('root'))
export default connect(null, mapDispatchToProps)(MasterForm);
