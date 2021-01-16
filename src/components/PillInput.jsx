import React, { useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  makeStyles,
  IconButton,
  Icon,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";
import { loadCSS } from "fg-loadcss";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "5px",
  },
});
const PillInput = ({ onChangePill, onChangeDosage, pill, index, add, del }) => {
  useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);
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
      <Grid item xs={4}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="pills">Pill</InputLabel>
          <OutlinedInput
            id="pills"
            label="Pill"
            value={pill.name}
            onChange={(input) => onChangePill(input.target.value, index)}
            labelWidth={60}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="dosage">Dosage</InputLabel>
          <OutlinedInput
            id="dosage"
            label="Dosage"
            value={pill.dosage}
            onChange={(input) => onChangeDosage(input.target.value, index)}
            labelWidth={60}
          />
        </FormControl>
      </Grid>
      <Grid item xs={2}>
        {index === 0 ? (
          <IconButton onClick={() => add()}>
            <Icon
              className="fa fa-plus-circle"
              style={{ fontSize: 40, color: green[500] }}
            />
          </IconButton>
        ) : (
          <IconButton onClick={() => del(index)}>
            <Icon
              className="fa fa-minus-circle"
              style={{ fontSize: 40, color: "#00BAC5" }}
            />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
};

export default PillInput;
