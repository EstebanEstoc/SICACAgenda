import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid, Container, LinearProgress } from "@material-ui/core";
import GoogleLogoutButton from "../../features/GoogleAuth/GoogleLogoutButton";
import FormCalendar from "../../components/FormCalendar";
import "./Home.css";

const Home = () => {
  const [calendarList, setCalendarList] = useState([]);
  const [load, setload] = useState(false);
  const user = useSelector((state) => state.GoogleUser.profileObj);

  useEffect(() => {}, []);

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
