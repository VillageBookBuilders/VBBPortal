import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { getDateStr } from "../helpers";

class SessionDetails extends React.Component {
  state = {
    id: "",
    display: "",
    endDate: "",
    mentorNotes: "",
    unbookConfirmation: false,
    readyToApplyChanges: false,
    didCommunicate: "",
    proceedToUnbook: "",
  };

  fetchSessionSlotData = () => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    const sessionid = this.props.match.params.sessionid;
    axios
      .get(`http://127.0.0.1:8000/api/session/${sessionid}`)
      .then((res) => {
        console.log("res : ", res);
        console.log("rd: ", res.data.display);
        this.setState({
          //   sessionslot: res.data,
          id: res.data.id,
          display: res.data.display,
          endDate: res.data.end_date,
          mentorNotes: res.data.mentor_notes,
          mentor: res.data.mentor,
        });
      })
      .catch((err) => {
        console.log(err);
        alert("There was an error in retrieving your mentoring sessions", err);
      });
  };

  onUnbookFirstClick = () => {
    this.setState({
      unbookConfirmation: true,
    });
  };


  onApplyChanges = () => {    
    const sessionid = this.props.match.params.sessionid;
  //  const endDate = this.state.endDate;
    axios
      .patch(`http://127.0.0.1:8000/api/update/${sessionid}`, {
      
        end_date: this.state.endDate,
        mentor_notes: this.state.mentorNotes,
      
      })
      .then(res => {
        console.log('apply', res.data.display);
        alert("Your changes have successfully applied.\nYour session is now set for: " + res.data.display + ".");
        })
      .catch((err) => {
        console.log(err);
        alert("There was an error in applying changes.", err);
        });  
  };


  onUnbookRequest = () => {    
   const sessionid = this.props.match.params.sessionid;
   const mentor = this.state.mentor;
   console.log("Mentor", mentor);
   axios
      .patch(`http://127.0.0.1:8000/api/update/${sessionid}`, {

        end_date: getDateStr(0), 
        mentor: null,    
      })
      .then(res => {
        console.log("Success: ", res.success);
        alert("Success!");
        this.props.history.push("/");
        })
  };


  componentDidMount() {
    this.fetchSessionSlotData();
    console.log("token: ", this.props.token);
  }

  render() {
    return (
      <div className="cream-bg">
        <div
          className="session-details-card col-card mx-auto p-4"
          style={{ borderRadius: "30px" }}
        >
          {!this.state.unbookConfirmation ? (
            <>
              <div className="d-block px-4 mb-4">
                <h5>Adjust Mentoring Session #{this.state.id}:</h5>
                <h4 className="session-details-link session-details-location px-5">
                  {this.state.display}
                </h4>
              </div>
              <div className="d-block mb-2">
                <label className="ml-4">Adjust End Date:</label>
                <input
                  type="date"
                  className="mx-4"
                  value={this.state.endDate}
                  min={getDateStr(14)} // min is 2 weeks out
                  max={getDateStr(365)} // max is 1 year out
                  onChange={(event) => {
                    this.setState({
                      endDate: event.target.value,
                      readyToApplyChanges: true,
                    });
                   // console.log("newDate: ", this.state.endDate);
                  }}
                />
              </div>
              <div className="d-block w-100 mb-2 px-4">
                <label>
                  Add/Edit Notes: <br />
                  (Mentee name, mentee interests, session notes, etc.)
                </label>
                <textarea
                  className="w-100"
                  rows="3"
                  value={this.state.mentorNotes}
                  onChange={(event) =>
                    this.setState({
                      mentorNotes: event.target.value,
                      readyToApplyChanges: true,
                    })
                  }
                />
              </div>
              <div className="d-block my-2 w-100 p-3">
                <button
                  className="btn unbook-btn d-block mx-auto mt-2 mb-5 btn-light unbook-btn"
                  onClick={this.onUnbookFirstClick}
                >
                  UNBOOK THIS SLOT
                </button>
                <br />
                <a
                  href="/"
                  type="button"
                  className="btn px-4 goback-btn d-inline "
                >
                  GO BACK
                </a>
                <button
                  className="btn btn-light applychanges-btn"
                  disabled={!this.state.readyToApplyChanges}
                  onClick={this.onApplyChanges}
                // FIXME - Make call to end date and mentor notes updater api
                >
                  APPLY CHANGES
                </button>
                <br />
                <br />
              </div>
            </>
          ) : (
              <>
                <h5 style={{ paddingLeft: "20%" }}>Sure you want to unbook?</h5>
                <div className="d-block px-4 py-2 mb-4">
                  <label>
                    Have you communicated with your mentee and with your mentor
                    advisors about this unbooking at least one week in advance?
                </label>
                  <select
                    onChange={(event) => {
                      this.setState(
                        { didCommunicate: event.target.value },
                        console.log("dc: ", this.state.didCommunicate)
                      );
                    }}
                    value={this.state.didCommunicate}
                  >
                    <option value="" style={{ display: "none" }}></option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <br />
                <br />
                <div className="d-block px-4 mb-4">
                  <label>
                    Are you sure you wish to proceed with this unbooking?
                </label>
                  <select
                    onChange={(event) => {
                      this.setState(
                        { proceedToUnbook: event.target.value },
                        console.log("pu: ", this.state.proceedToUnbook)
                      );
                    }}
                    value={this.state.proceedToUnbook}
                  >
                    <option value="" style={{ display: "none" }}></option>

                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <br />
                <br />
                <div className="d-block my-2 w-100 p-3">
                  <a
                    href="/"
                    type="button"
                    className="btn px-4 goback-btn d-inline "
                  >
                    GO BACK
                </a>
                  <button
                    className="btn unbook-btn float-right"
                    disabled={
                      this.state.didCommunicate === "" ||
                      this.state.didCommunicate === "no" ||
                      this.state.proceedToUnbook === "" ||
                      this.state.proceedToUnbook === "no"
                    }
                   // onClick={this.submitUnbookRequest}
                    onClick={this.onUnbookRequest}
                  // FIXME - Make call to unbooking api
                  >
                    REQUEST UNBOOKING
                </button>
                  <br />
                  <br />
                </div>
              </>
            )}
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

export default connect(mapStateToProps)(SessionDetails);
