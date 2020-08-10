import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error.message,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const gAuth = (googleToken) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/api/googlelogin/", {
        access_token: googleToken,
      })
      .then((res) => {
        const token = res.data.key;
        checkSignIn(token, dispatch);
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

const checkSignIn = (token, dispatch) => {
  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`,
  };
  axios
    .get("http://127.0.0.1:8000/api/checksignin/")
    .then((res) => {
      if(res.data.success==="true"){
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
      }
      else {
        dispatch(authFail(res.data));
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};

export const authSignup = (first_name, last_name, time_zone, personal_email, vbb_email, phone_number, occupation, organization, contact_source, involvement) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/api/creatementorprofile/", {
        first_name: first_name,
        last_name: last_name,
        time_zone: time_zone,
        personal_email: personal_email,
        vbb_email: vbb_email,
        phone_number: phone_number,
        occupation: occupation,
        organization: organization,
        contact_source: contact_source,
        involvement: involvement,
      })
      .then((res) => {
        dispatch(checkAuthTimeout(3600));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
