import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Container, LinearProgress, IconButton } from "@material-ui/core";
import GoogleLogoutButton from "../../features/GoogleAuth/GoogleLogoutButton";
import FormCalendar from "../../components/FormCalendar";
import * as GoogleCalendarApi from "../../features/GoogleCalendar/CalendarRepository";
import { clearUserInfo } from "../../features/GoogleAuth/GoogleAuthSlices";
import { toggleAuthFalse } from "../../features/GoogleAuth/authenticationSlice";
import { GoogleCalendarConfig } from "../../features/GoogleCalendar/CalendarApi";
import "./Home.css";

const Home = () => {
  const [calendarList, setCalendarList] = useState([]);
  const [load, setload] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.GoogleUser.profileObj);
  const tokenTimeOut = useSelector(
    (state) => state.GoogleUser.tokenObj.expires_at
  );
  const accessToken = useSelector((state) => state.GoogleUser.accessToken);

  useEffect(() => {
    if (tokenTimeOut > Date.now() && accessToken) {
      GoogleCalendarConfig(accessToken).then(
        GoogleCalendarApi.GetCalendarsNameList()
          .then((calendarList) => {
            setCalendarList(calendarList);
          })
          .then(setload(false))
      );
    } else {
      dispatch(clearUserInfo());
      dispatch(toggleAuthFalse());
    }
  }, [accessToken, dispatch, tokenTimeOut]);

  return (
    <Container>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item className="inline">
            <img
              height="100px"
              src="assets/logo_inline.png"
              alt="Sicac Logo"
            ></img>
          </Grid>
          <Grid item>
            <p className="text-logo">Agenda</p>
          </Grid>
        </Grid>

        {load ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item className="linear">
              <LinearProgress />
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item>
              <p className="name">Welcome {user.name && user.name}</p>
            </Grid>
            <Grid item>
              <GoogleLogoutButton />
            </Grid>
            <Grid item>
              <a
                href="https://calendar.google.com/calendar"
                target="_blank"
                rel="noreferrer"
              >
                <IconButton>
                  <img
                    height="30px"
                    src="assets/Google_Calendar_icon_(2020).svg"
                    alt="calendarLogo"
                  ></img>
                </IconButton>
              </a>
            </Grid>
          </Grid>
        )}
        {load ? null : (
          <Grid item className="linear">
            <FormCalendar calendarList={calendarList}></FormCalendar>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
