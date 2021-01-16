import React from "react";
import { useDispatch } from "react-redux";
import GoogleSignIn from "react-google-login";

import { toggleAuthTrue } from "./authenticationSlice";
import { addUserInfo, saveUserToken } from "./GoogleAuthSlices";

import "./GoogleButton.css";

const GoogleClientID =
  "418441773673-rlitdccc7t7bkvtl0mbompuvsb2hqrsg.apps.googleusercontent.com";

const GoogleButton = () => {
  const dispatch = useDispatch();

  const responseGoogle = (response) => {
    dispatch(addUserInfo(response));
    refreshTokenSetup(response).then(dispatch(toggleAuthTrue()));
  };

  const refreshTokenSetup = async (res) => {
    let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;
    const refreshToken = async () => {
      const newAuthRes = await res.reloadAuthResponse();
      refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
      console.log("newAuthRes", newAuthRes);
      dispatch(saveUserToken(newAuthRes.accessToken));
      setTimeout(refreshToken, refreshTiming);
    };
    setTimeout(refreshToken, refreshTiming);
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
