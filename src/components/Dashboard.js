import React from "react";
// import MentorProfile from "./MentorProfile";
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
    axios
      .get("https://portal.villagebookbuilders.org/api/myappointments/")
      .then((res) => {
        this.setState({
          appointments: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("There was an error in retrieving your mentoring sessions", err);
      });
  };

  componentDidMount() {
    this.fetchAppointmentData();
  }

  render() {
    return (
      <div className="twocol-container" id="dashboard">
        <div className="column col-card" id="mentoring-session-box">
          <h1 className="vbb-header">My Weekly Mentoring Session</h1>
          <h3 style={{ color: "#6AC66B", textIndent: "25px" }}>
            {this.state.appointments && this.state.appointments.length > 0 ? (
              this.state.appointments.map((apt) => {
                return (
                  <li key={apt.event_id} value={apt.event_id}>
                    {apt.display}
                    <br />
                  </li>
                );
              })
            ) : (
              <>
                <h4
                  style={{
                    fontSize: "22px",
                    fontWeight: "400",
                    fontStyle: "italic",
                    textIndent: "0px",
                    color: "#ff914d",
                  }}
                >
                  Uh oh! You don't have any mentoring sessions booked yet.
                </h4>
                <h4 style={{ textIndent: "0px", fontStyle: "italic" }}>
                  Press the green button below to make your first booking!
                </h4>
              </>
            )}
          </h3>
          <div className="btns">
            <a
              href="/booking/"
              className="btn btn-light book-btn dashboard-btn"
              style={{ marginTop: "20px", fontSize: "20px" }}
            >
              + Book Mentoring Session
            </a>
            <br />
            <a
              className="btn btn-light gcal-btn dashboard-btn"
              href="https://calendar.google.com/calendar/r"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "5px", marginBottom: "30px" }}
            >
              View My Google Calendar
            </a>
          </div>
          <p
            style={{ padding: "20px", paddingLeft: "40px", maxWidth: "650px" }}
          >
            If you would like to change a mentoring session or have another
            question, please
            <a href="mailto:mentor@villagebookbuilders.org">
              {" "}
              contact your mentor advisor{" "}
            </a>
            at mentor@villagebookbuilders.org
          </p>
          {/* <MentorProfile /> */}
        </div>
        <div className="column col-card">
          <h1 className="vbb-header">Mentoring Resources</h1>
          <div className="twocol-container" id="mentoring-resources-box">
            <a
              className="btn btn-light dashboard-btn l1-btn"
              href="https://360.articulate.com/review/content/73bf3afe-47f9-4f9f-aa4d-70bf27fbe8d5/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentor Training
            </a>
            <a
              className="btn btn-light dashboard-btn l2-btn"
              href="https://classroom.google.com/u/0/h"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Classroom
            </a>
            <a
              className="btn btn-light dashboard-btn l3-btn"
              href="https://apps.google.com/meet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Meets
            </a>
            <a
              className="btn btn-light dashboard-btn l4-btn"
              href="https://www.khanacademy.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Khan Academy
            </a>
            <a
              className="btn btn-light dashboard-btn l5-btn"
              href="mailto:mentor@villagebookbuilders.org"
            >
              Contact your Mentor Advisor
            </a>
            <a
              className="btn btn-light dashboard-btn l6-btn"
              href="https://www.facebook.com/groups/villagementors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Village Mentors FB Group
            </a>
            <a
              className="btn btn-light dashboard-btn l7-btn"
              href="https://www.facebook.com/VillageBookBuilders"
              target="_blank"
              rel="noopener noreferrer"
            >
              VBB Facebook Page
            </a>
            <a
              className="btn btn-light dashboard-btn l8-btn"
              href="https://www.villagebookbuilders.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              VBB Home Website
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(Dashboard);
