import React from "react";
// import MentorProfile from "./MentorProfile";
import axios from "axios";
import { connect } from "react-redux";

class Dashboard extends React.Component {
  state = {
    sessionslots: [],
  };

  fetchSessionSlotData = () => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .get("http://127.0.0.1:8000/api/mysessionslots/")
      .then((res) => {
        this.setState({
          sessionslots: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("There was an error in retrieving your mentoring sessions", err);
      });
  };

  componentDidMount() {
    this.fetchSessionSlotData();
  }

  render() {
    return (
      <div className="twocol-container" id="dashboard">
        <div className="column col-card" id="mentoring-session-box">
          <h1 className="vbb-header">My Weekly Mentoring Session</h1>

          {this.state.sessionslots && this.state.sessionslots.length > 0 ? (
            <h3 style={{ color: "#6AC66B", textIndent: "25px" }}>
              {this.state.sessionslots.map((apt) => {
                return (
                  <li key={apt.event_id} value={apt.event_id}>
                    {apt.display}
                    <br />
                  </li>
                );
              })}
            </h3>
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
                <b>Uh oh!</b> You don't have any mentoring sessions booked yet.
              </h4>
              <h4
                style={{
                  textIndent: "0px",
                  fontStyle: "italic",
                  color: "#6ac66b",
                }}
              >
                Press the green button below to make your first booking!
              </h4>
            </>
          )}

          <div className="btns">
            <a
              href="/booking/"
              className="btn btn-light book-btn dashboard-btn"
              style={{ marginTop: "20px", fontSize: "20px" }}
            >
              + Book Mentoring Session
            </a>
            <br />
            <p>
              Click the button below to view your google calendar. 
              In order to access your villagementors.org calendar, 
              you'll have to click the icon in the top right corner 
              and switch to your villagementors.org account
            </p>
            <a
              className="btn btn-light gcal-btn dashboard-btn"
              href="https://calendar.google.com/calendar/r"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: "5px", marginBottom: "30px" }}
            >
              View My Sessions Calendar 
            </a>
          </div>
          {/* <MentorProfile /> */}
        </div>
        <div className="column col-card" id="mentoring-resources-box">
          <h1 className="vbb-header">Mentoring Resources</h1>
          <div className="twocol-container" id="mentoring-resources-fields">
            <a
              className="btn btn-light dashboard-btn l1-btn"
              href="https://360.articulate.com/review/content/73bf3afe-47f9-4f9f-aa4d-70bf27fbe8d5/review"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentor Training Module
            </a>
            <a
              className="btn btn-light dashboard-btn l5-btn"
              href="mailto:mentor@villagebookbuilders.org"
            >
              Contact your Mentor Advisor
            </a>
            {/*bold the contact*/}
            <a
              className="btn btn-light dashboard-btn l3-btn"
              href="https://docs.google.com/document/d/e/2PACX-1vR5-WnzhSJ88pfh2yctr7JuRXglAD55q8eluMPnLA1fTIyeKxxrGvL4r7D7wZh8mvd6WTL9GJJ1tkdD/pub"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mentoring Guide
            </a>
            <a
              className="btn btn-light dashboard-btn l6-btn"
              href="https://idroo.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Whiteboard
            </a>
            <a
              className="btn btn-light dashboard-btn l2-btn"
              href="https://www.khanacademy.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Khan Academy
            </a>
            <a
              className="btn btn-light dashboard-btn l4-btn"
              href="https://classroom.google.com/u/0/h"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Classroom
            </a>
            <a
              className="btn btn-light dashboard-btn l3-btn"
              href="https://www.facebook.com/groups/villagementors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Village Mentors FB Group
            </a>
            <a
              className="btn btn-light dashboard-btn l6-btn"
              href="https://apps.google.com/meet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Meets
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
          <p
            style={{ padding: "20px", paddingLeft: "40px", maxWidth: "900px" }}
          >
            <b>If you would like to change a mentoring session, have questions about mentoring, or ANY QUESTIONS, 
            please
            <a href="mailto:mentor@villagebookbuilders.org">
              {" "}
              contact your mentor advisor{" "}
            </a>
            at mentor@villagebookbuilders.org! <br></br>
            </b>
          </p>        </div>
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
