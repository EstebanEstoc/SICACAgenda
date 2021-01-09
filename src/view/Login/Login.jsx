import React from "react";
import { Grid, Container } from "@material-ui/core";

import "./Login.css";

import GoogleButton from "../../features/GoogleAuth/GoogleButton";

const Login = () => {
  return (
    <Container maxWidth="sm" className="container">
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

        <Grid item>
          <GoogleButton />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
