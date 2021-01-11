import { GoogleLogout } from "react-google-login";
import React from "react";
import { useDispatch } from "react-redux";
import { toggleAuthFalse } from "./authenticationSlice";
import { clearUserInfo } from "./GoogleAuthSlices";

import "./GoogleButton.css";

const GoogleClientID =
  "418441773673-rlitdccc7t7bkvtl0mbompuvsb2hqrsg.apps.googleusercontent.com";

const GoogleLogoutButton = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    dispatch(toggleAuthFalse());
    dispatch(clearUserInfo());
    console.log(response);
  };

  return (
    <GoogleLogout
      clientId={GoogleClientID}
      onLogoutSuccess={responseGoogle}
      style={{ borderRadius: 30 }}
      icon={false}
      className="button-container"
    >
      <div className="button">
        <img
          src="assets/Google__G__Logo.svg"
          height="20px"
          className="icon"
          alt="Google Icon"
        ></img>
        <span className="button-logout-text">Logout of Google</span>
      </div>
    </GoogleLogout>
  );
};

export default GoogleLogoutButton;
