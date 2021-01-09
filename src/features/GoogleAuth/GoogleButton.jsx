import React from "react";
import { useDispatch } from "react-redux";
import GoogleSignIn from "react-google-login";

import { toggleAuthTrue } from "./authenticationSlice";
import { addUserInfo } from "./GoogleAuthSlices";

import "./GoogleButton.css";

const GoogleClientID =
  "418441773673-rlitdccc7t7bkvtl0mbompuvsb2hqrsg.apps.googleusercontent.com";

const GoogleButton = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    dispatch(addUserInfo(response));
    dispatch(toggleAuthTrue());
    console.log(response);
  };

  return (
    <GoogleSignIn
      clientId={GoogleClientID}
      onSuccess={responseGoogle}
      isSignedIn={true}
      style={{ borderRadius: 30 }}
      icon={false}
      className="button-container"
    >
      <div className="button">
        <img
          src="assets/Google__G__Logo.svg"
          height="30px"
          className="icon"
          alt="Google Icon"
        ></img>
        <span className="button-text">Login with Google</span>
      </div>
    </GoogleSignIn>
  );
};

export default GoogleButton;
