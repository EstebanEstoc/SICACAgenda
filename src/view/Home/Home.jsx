import React from "react";
import { useSelector } from "react-redux";
import { Grid, Container } from "@material-ui/core";

import "./Home.css";

const Home = () => {
  const user = useSelector((state) => state.GoogleUser.profileObj);

  return (
    <Container maxWidth="sm">
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
          <p className="name">Welcome {user.name && user.name}</p>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
