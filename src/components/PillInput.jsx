import React from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "5px",
  },
});
const PillInput = ({ setPills, pills, index }) => {
  const styles = useStyles();
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
      className={styles.root}
    >
      <Grid item xs={9}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={pills[index].name}
            onChange={(input) =>
              setPills((old) => [...old, input.target.value])
            }
            labelWidth={60}
          />
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={pills[index].name}
            onChange={(input) =>
              setPills((old) => [...old, {input.target.value]})
            }
            labelWidth={60}
          />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default PillInput;
