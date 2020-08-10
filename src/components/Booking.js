import React from "react";
import axios from "axios";
import moment from "moment";
import "moment-timezone";
import { connect } from "react-redux";

class Booking extends React.Component {
  state = {
    libraries: [],
    languages: {},
    times: [],
    timezone: moment.tz.guess(),
    language: 1,
    weekday: 0,
    displayDay: "",
    library: 0,
    time: false,
    displayTime: "",
    isReturning: false,
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
          min_hsm: this.shift_time(parseInt(this.state.weekday), false),
          max_hsm: this.shift_time(parseInt(this.state.weekday), false) + 24,
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
    switch (day) {
      case 0:
        return "Monday";
      case 24:
        return "Tuesday";
      case 48:
        return "Wednesday";
      case 72:
        return "Thursday";
      case 96:
        return "Friday";
      case 120:
        return "Saturday";
      case 168:
        return "Sunday";
      default:
        return "--";
    }
  };

  display_time = (hsm) => {
    var tzhsm = this.shift_time(hsm, true);
    var time24 = tzhsm % 24;
    var time12 = tzhsm % 12;
    if (time24 === 0) return "12 am";
    if (time24 === 12) return "12 pm";
    if (time24 === time12) return time12 + " am";
    return time12 + " pm";
  };

  shift_time = (hsm, isEastern) => {
    var now = moment();
    now.tz(this.state.timezone);
    var localOffset = now.utcOffset();
    //eastern time zone is the server standard as of 8/1/2020
    now.tz("America/New_York");
    var easternOffset = now.utcOffset();
    var diffInMinutes = localOffset - easternOffset;
    var diffInHours = diffInMinutes / 60;
    //isEastern designates whether the given hsm is in Eastern or the local timezone
    if (isEastern) return (hsm + diffInHours + 168) % 168;
    return (hsm - diffInHours + 168) % 168;
  };

  handleMentorChange = () => {
    this.setState(
      {
        isReturning: !this.state.isReturning,
      },
      () => {
        if (!this.state.isReturning) {
          this.setState({
            library: 0,
          });
        }
      }
    );
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
    this.setState(newState, () => {
      this.fetchTimes();
    });
  };

  submitRequest = () => {
    this.handleCommitChange();
    this.postRequest();
  }

  postRequest = () => {
    alert("please wait while we submit your booking request");
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
          hsm: this.state.time,
        },
      })
      .then((res) => {
        console.log("Success: ", res.success);
        alert("Success:", res.success);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <h1 id="booking-header">Book Your Mentoring Appointment Below!</h1>
        <p>
          Select a day and time that you have available each week.
          <br />
          We'll match you with a child who needs you as their mentor.
        </p>
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
          <label htmlFor="timezone">Your Timezone:</label>&nbsp;
          <select
            name="timezone"
            id="timezone"
            onChange={this.handleDropDownChange}
            value={this.state.timezone}
          >
            {this.state.languages &&
              this.state.languages.length > 0 &&
              moment.tz.names().map((tz) => {
                return (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                );
              })}
          </select>
          <br />
          <br />
          <input
            type="checkbox"
            id="mentor"
            name="mentor"
            onChange={this.handleMentorChange}
          />
          <label htmlFor="mentor">Are you a returning mentor?</label>
          <p style={{ fontSize: "medium" }}>
            (Check to rebook an existing appointment)
          </p>
          {this.state.isReturning && (
            <div>
              <label htmlFor="library" style={{ paddingLeft: "50px" }}>
                If you would like to continue with the same library, select it
                here:&nbsp;
              </label>
              <select
                name="library"
                id="library"
                onChange={this.handleDropDownChange}
              >
                <option value="0">Any</option>
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
              <br />
              <br />
            </div>
          )}
          <label htmlFor="weekday">Day of the Week:&nbsp;</label>
          <select
            name="weekday"
            id="weekday"
            onChange={this.handleDropDownChange}
          >
            <option value={0}>Monday</option>
            <option value={24}>Tuesday</option>
            <option value={48}>Wednesday</option>
            <option value={72}>Thursday</option>
            <option value={96}>Friday</option>
            <option value={120}>Saturday</option>
            <option value={144}>Sunday</option>
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
                  <option key={time.hsm} value={time.hsm}>
                    {this.display_time(time.hsm)}
                  </option>
                );
              })}
          </select>
          <br />
          <br />
          {this.state.time && (
            <div>
              <input
                type="checkbox"
                id="commitment"
                name="commitment"
                checked={this.state.isCommitted}
                onChange={this.handleCommitChange}
              ></input>
              <label htmlFor="commitment">
                Can you commit to mentor weekly (every{" "}
                {this.display_day(this.state.weekday)} at{" "}
                {this.display_time(parseInt(this.state.time))}) for at least 4
                months?
              </label>
              <br />
              <br />
            </div>
          )}
        </div>
        <a href="/" type="button" className="btn btn-secondary goback-btn">
          Go Back
        </a>
        <button
          className="btn btn-light requestappt-btn"
          disabled={!this.state.isCommitted || this.state.time === false}
          onClick={this.submitRequest}
        >
          Submit Appointment Request!
        </button>
        <br />
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
