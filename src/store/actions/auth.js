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
    error: error,
    message: error.message,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
    message: null,
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

export const authSignup = (first_name, last_name, 
  personal_email, vbb_email, phone, adult, occupation, 
  vbb_chapter, affiliation, referral_source, languages, 
  time_zone, charged, initials, desired_involvement, city) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post("http://127.0.0.1:8000/api/signup/", {
        first_name: first_name,
        last_name: last_name,
        personal_email: personal_email,
        vbb_email: vbb_email,
        phone: phone,
        adult: adult,
        occupation: occupation,
        vbb_chapter: vbb_chapter,
        affiliation: affiliation,
        referral_source: referral_source,
        languages: languages,
        time_zone: time_zone,
        charged: charged,
        initials: initials,
        desired_involvement: desired_involvement,
        city: city,
      })
      .then((res) => {
        console.log("success")
        if(res.success){
          dispatch(checkAuthTimeout(3600));
          alert("Success! Check your email for further instructions.");
        } 
        else {
          dispatch(authFail(res.data))
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err)
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
