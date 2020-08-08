import React from "react";
import MentorProfile from "./MentorProfile";
import axios from "axios";
import { connect } from "react-redux";

class Dashboard extends React.Component {
  state = {
    appointments: [],
  };

  fetchAppointmentData = () => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios.get("http://127.0.0.1:8000/api/myappointments/")
    .then(res => {
      this.setState({
        appointments: res.data
      });
    })
    .catch(err => {
      console.log(err);
      alert("There was an error in retrieving your appointments", err);
    });
  }

  componentDidMount() {
    this.fetchAppointmentData();
  }

  render() {
    return (
      <div>
        <h2 style={{ color: "#4C4C49" }}>My Weekly Mentoring Session:</h2>
        <h3 style={{ color: "#6AC66B", textIndent: "25px" }}>
        {this.state.appointments && this.state.appointments.length > 0 &&
          this.state.appointments.map(apt => {
            return <li key={apt.event_id} value={apt.event_id}>{apt.display}<br/></li>;
        })}
        </h3>
        <br />
        <a 
          href="/booking/" 
          className="btn btn-light signin-button">
          + Book a new appointment
        </a>
        <br />
        <a
          className="btn btn-light donate-button"
          href="https://calendar.google.com/calendar/r"
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: "relative", top: "5px", bottom: "5px"}}
        >
          View My Google Calendar
        </a>
        <br />
        <br />
        <p style={{textIndent: "-40px" }}>
          If you would like to change an appointment or have another question, please
          <a href="mailto:mentor@villagebookbuilders.org"> contact your mentor advisor </a>
           at mentor@villagebookbuilders.org
        </p>
        <hr />
        <h2 style={{ color: "#4C4C49" }}>Mentoring Resources:</h2>
        <div style={{ paddingLeft: "50px", fontSize: "18px" }}>
          <a href="https://360.articulate.com/review/content/73bf3afe-47f9-4f9f-aa4d-70bf27fbe8d5/review"
            target="_blank"
            rel="noopener noreferrer"
            >
            Mentor Training
          </a>
          <br />
          <a href="https://classroom.google.com/u/0/h"
            target="_blank"
            rel="noopener noreferrer"
            >
            Google Classroom
          </a>
          <br />
          <a href="https://apps.google.com/meet/"
            target="_blank"
            rel="noopener noreferrer"
            >
            Google Meets
          </a>
          <br/>
          <a href="https://www.khanacademy.org/"
            target="_blank"
            rel="noopener noreferrer"
            >
            Khan Academy
          </a>
          <br/>
          <a href="mailto:mentor@villagebookbuilders.org">Contact your Mentor Advisor</a>
          <br />
          <a href="https://www.facebook.com/groups/villagementors"
            target="_blank"
            rel="noopener noreferrer"
            >
            Village Mentors Facebook Group
          </a>
          <br/>
          <a href="https://www.facebook.com/VillageBookBuilders"
            target="_blank"
            rel="noopener noreferrer"
            >
            VBB Facebook Page
          </a>
          <br/>
          <a href="https://www.villagebookbuilders.org/"
            target="_blank"
            rel="noopener noreferrer"
            >
            VBB Home Website
          </a>
          <br/>
          <br/>
        </div>
        <MentorProfile/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(Dashboard);