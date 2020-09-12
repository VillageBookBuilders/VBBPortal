import React from "react";
import axios from "axios";
import moment from "moment";
import "moment-timezone";
import { connect } from "react-redux";
import menteeComputer from "../images/vbb-mentee-computer.png";

class Booking extends React.Component {
  state = {
    libraries: [],
    languages: {},
    times: [],
    time_zone: moment.tz.guess(),
    language: 1,
    weekday: 0,
    displayDay: "",
    library: 0,
    time: false,
    displayTime: "",
    isReturning: "no",
    isCommitted: false,
  };

  fetchBookingData = () => {
    axios
      .get("http://127.0.0.1:8000/api/library/")
      .then((res) => {
        this.setState({
          libraries: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://127.0.0.1:8000/api/language/")
      .then((res) => {
        this.setState({
          languages: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    this.fetchTimes();
  };

  componentDidMount() {
    this.fetchBookingData();
  }

  fetchTimes = () => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .get("http://127.0.0.1:8000/api/available/", {
        params: {
          library: this.state.library,
          language: this.state.language,
          min_msm: this.shift_time(parseInt(this.state.weekday), false),
          max_msm: this.shift_time(parseInt(this.state.weekday), false) + 1440,
        },
      })
      .then((res) => {
        this.setState({
          times: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  display_day = (day) => {
    day = parseInt(day);
    switch (day) {
      case 0:
        return "Monday";
      case 1440:
        return "Tuesday";
      case 2880:
        return "Wednesday";
      case 4320:
        return "Thursday";
      case 5760:
        return "Friday";
      case 7200:
        return "Saturday";
      case 8640:
        return "Sunday";
      default:
        return "--";
    }
  };

  display_time = (msm) => {
    var tzmsm = this.shift_time(msm, true);
    let mins = ":" + (msm % 60);
    if (msm % 60 === 0) mins = "";
    else if (msm % 60 < 10) mins = ":0" + (msm % 60);
    var time24 = parseInt(tzmsm / 60) % 24;
    var time12 = parseInt(tzmsm / 60) % 12;
    if (time24 === 0) return "12" + mins + "am";
    if (time24 === 12) return "12" + mins + "pm";
    if (time24 === time12) return time12 + mins + "am";
    return time12 + mins + "pm";
  };

  shift_time = (msm, isEastern) => {
    var now = moment();
    now.tz(this.state.time_zone);
    var localOffset = now.utcOffset();
    //eastern time zone is the server standard as of 8/1/2020
    now.tz("US/Eastern");
    var easternOffset = now.utcOffset();
    var diffInMinutes = localOffset - easternOffset;
    //isEastern designates whether the given msm is in Eastern or the local time_zone
    if (isEastern) return (msm + diffInMinutes + 10080) % 10080;
    return (msm - diffInMinutes + 10080) % 10080;
  };

  handleCommitChange = (e) => {
    this.setState({
      isCommitted: !this.state.isCommitted,
    });
  };

  handleDropDownChange = (e) => {
    var newState = {};
    //newState["time"] = false; //FIXME make sure the time drop down is unselected so the user isn't confused.
    newState[e.target.name] = e.target.value;
    console.log(newState);
    this.setState(newState, () => {
      this.fetchTimes();
    });
  };

  submitRequest = () => {
    this.handleCommitChange();
    this.postRequest();
  };

  postRequest = () => {
    alert("Please wait while we submit your booking request, then refresh the page (this might take 10 or 20 seconds)");
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios
      .post("http://127.0.0.1:8000/api/book/", null, {
        params: {
          library: this.state.library,
          language: this.state.language,
          msm: this.state.time,
        },
      })
      .then((res) => {
        console.log("Success: ", res.success);
        alert("Success!");
        this.props.history.push("/");
        window.location.reload(false);
      })
      .catch((err) => {
        alert("We're sorry! Something went wrong while booking your appointment. Please contact your mentor advisor to find out more.");
        console.log(err);
      });
      this.props.history.push("/");
  };

  render() {
    return (
      <div className="twocol-container">
        <div id="booking-box">
          <h1 id="booking-header">Book Your Weekly Mentoring Session Below!</h1>
          <p>
            Select a day and time that you have available each week.
            <br />
            We'll match you with a child who needs you as their mentor.
          </p>
          <br />
          <div className="booking-fields">
            <label htmlFor="language">Mentoring Language:&nbsp;</label>
            <select
              name="language"
              id="language"
              onChange={this.handleDropDownChange}
            >
              {this.state.languages &&
                this.state.languages.length > 0 &&
                this.state.languages.map((lang) => {
                  return (
                    <option key={lang.id} value={lang.id}>
                      {lang.name}
                    </option>
                  );
                })}
            </select>
            <br />
            <br />
            <label htmlFor="time_zone">Your Timezone:</label>&nbsp;
            <select
              name="time_zone"
              id="time_zone"
              onChange={this.handleDropDownChange}
              value={this.state.time_zone}
            >
              {moment.tz.names().map((tz) => {
                return (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                );
              })}
            </select>
            <br />
            <br />
            <label htmlFor="mentor">Are you a current/returning mentor?</label>
            <select
              id="mentor"
              name="mentor"
              onChange={this.handleDropDownChange}
            >
              <option value="no">No</option>
              <option value="unsure">I'm not sure</option>
              <option value="yes">Yes</option>
            </select>
            <br />
            <br />

            {this.state.mentor==="yes" && (
              <div>
                <label htmlFor="library" > 
                {/* style={{ paddingLeft: "50px" }} */}
                  Your Library:&nbsp;
                </label>
                <select
                  name="library"
                  id="library"
                  onChange={this.handleDropDownChange}
                  style={{ marginTop: "0px" }}
                >
                  <option value="0">Any Library</option>
                  {this.state.libraries &&
                    this.state.libraries.length > 0 &&
                    this.state.libraries.map((lib) => {
                      return (
                        <option key={lib.id} value={lib.id}>
                          {lib.name}
                        </option>
                      );
                    })}
                </select>
                <br />
                <br />
              </div>
            )}
            {/* <br /> */}
            <label htmlFor="weekday">Day of the Week:&nbsp;</label>
            <select
              name="weekday"
              id="weekday"
              onChange={this.handleDropDownChange}
            >
              <option value={0}>Monday</option>
              <option value={1440}>Tuesday</option>
              <option value={2880}>Wednesday</option>
              <option value={4320}>Thursday</option>
              <option value={5760}>Friday</option>
              <option value={7200}>Saturday</option>
              <option value={8640}>Sunday</option>
            </select>
            <br />
            <br />
            <label htmlFor="time">Time of Day:&nbsp;</label>
            <select name="time" id="time" onChange={this.handleDropDownChange}>
              <option value={false}>Select from Avaliable Times:</option>
              {this.state.times &&
                this.state.times.length > 0 &&
                this.state.times.map((time) => {
                  return (
                    <option key={time.msm} value={time.msm}>
                      {this.display_time(time.msm)}
                    </option>
                  );
                })}
            </select>
            <br />
            <br />
            { this.state.time && (
              <div>
                <input
                  type="checkbox"
                  id="commitment"
                  name="commitment"
                  checked={this.state.isCommitted}
                  onChange={this.handleCommitChange}
                />
                <label htmlFor="commitment">
                  Please <b>check the box</b> to confirm that you can commit to mentor every{" "}
                  {this.display_day(this.state.weekday)} at{" "}
                  {this.display_time(parseInt(this.state.time))} for at least 4 months: 
                </label>
                <br />
                <br />
              </div>
            )}
          </div>
          {/* <p>
            If no avaliable times work with your weekly schedule,
            <br />
            <a href="mailto:mentor@villagebookbuilders.org">
              {" "}
              Contact the mentor advisors {" "}
            </a>
            at mentor@villagebookbuilders.org. <br />
            Please include potential times available in the email! 
          </p> */}
          <br />
          <br />
          <a href="/" type="button" className="btn goback-btn">
            GO BACK
          </a>
          <button
            className="btn btn-light"
            id="requestsession-btn"
            disabled={!this.state.isCommitted || this.state.time === false}
            onClick={this.submitRequest}
          >
            REQUEST SESSION
          </button>
        </div>
        <img
          src={menteeComputer}
          id="booking-picture"
          alt="Pic"
          style={{ width: "600px", margin: "5vw" }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

export default connect(mapStateToProps)(Booking);
