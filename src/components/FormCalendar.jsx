import React, { useState, useEffect } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Button,
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import { trackPromise } from "react-promise-tracker";

import * as GoogleCalendarApi from "../features/GoogleCalendar/CalendarRepository";
import PillInput from "./PillInput";
import PromiseLoader from "./PromiseLoader";

const EVENT_TYPE = [
  "Have to walk",
  "Have to take pills",
  "Have an appointment",
  "Answer a form",
];

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    borderRadius: "4px",
    padding: "5px",
    zIndex: 1,
  },
  button: {
    marginTop: "10px",
    zIndex: 1,
  },
});

const FormCalendar = ({ calendarList }) => {
  const [calendar, setcalendar] = useState("");
  const [eventType, seteventType] = useState("");
  const [pills, setpills] = useState([
    {
      name: "",
      dosage: "",
    },
  ]);
  const [end, setend] = useState(new Date());
  const [start, setstart] = useState(new Date());
  const [location, setlocation] = useState("");
  const [name, setname] = useState("");
  const [open, setopen] = useState(false);
  const [openSuccess, setopenSuccess] = useState(false);
  const [openError, setopenError] = useState(false);
  const [error, setError] = useState("");
  const [link, setlink] = useState("");
  //const [formId, setformId] = useState("");

  useEffect(() => {
    console.log(pills);
  }, [pills]);

  const styles = useStyles();

  const displayCalendarList = () => {
    return calendarList.map((calendar) => (
      <MenuItem value={calendar.id} key={calendar.id}>
        {calendar.name}
      </MenuItem>
    ));
  };

  const displayEventTypeList = () => {
    return EVENT_TYPE.map((event, index) => (
      <MenuItem value={event} key={index}>
        {event}
      </MenuItem>
    ));
  };

  const handleClose = () => {
    setopen(false);
  };
  const handleCloseError = () => {
    setopenError(false);
  };
  const handleCloseSuccess = () => {
    setopenSuccess(false);
  };

  const displayPills = () => {
    return pills.map((pill, index) => {
      return (
        <PillInput
          onChangeDosage={onChangeDosage}
          onChangePill={onChangePill}
          pill={pill}
          key={index}
          add={addPillLine}
          del={deletePillLine}
          index={index}
        ></PillInput>
      );
    });
  };

  const displayAppointement = () => {
    return (
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className={styles.root}
      >
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="location">Where ?</InputLabel>
            <OutlinedInput
              id="location"
              label="Where ?"
              value={location}
              onChange={(input) => setlocation(input.target.value)}
              labelWidth={60}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="name">Who ?</InputLabel>
            <OutlinedInput
              id="name"
              label="Who ?"
              value={name}
              onChange={(input) => setname(input.target.value)}
              labelWidth={60}
            />
          </FormControl>
        </Grid>
      </Grid>
    );
  };

  const onChangeDosage = (dosage, index) => {
    setpills((old) => {
      const newDosages = [...old];
      newDosages[index].dosage = dosage;
      return newDosages;
    });
  };
  const onChangePill = (pill, index) => {
    setpills((old) => {
      const newPills = [...old];
      newPills[index].name = pill;
      return newPills;
    });
  };

  const addPillLine = () => {
    setpills((old) => {
      const newPills = [...old];
      newPills.push({ name: "", dosage: "" });
      return newPills;
    });
  };
  const deletePillLine = (index) => {
    setpills((old) => {
      const newPills = [...old];
      newPills.splice(index, 1);
      return newPills;
    });
  };

  const displayEventParam = () => {
    switch (eventType) {
      case EVENT_TYPE[0]:
        return null;
      case EVENT_TYPE[1]:
        return displayPills();
      case EVENT_TYPE[2]:
        return displayAppointement();
      case EVENT_TYPE[3]:
        return null;
      default:
        return null;
    }
  };

  const addEvent = () => {
    if (start && end && calendar) {
      switch (eventType) {
        case EVENT_TYPE[0]:
          trackPromise(
            GoogleCalendarApi.CreateWalkEvent(start, end, calendar),
            "form_area"
          )
            .then((response) => {
              setlink(response);
              setopenSuccess(true);
            })
            .catch((error) => {
              setError(error.message);
              setopenError(true);
            });

          break;
        case EVENT_TYPE[1]:
          trackPromise(
            GoogleCalendarApi.CreatePillEvent(pills, start, end, calendar),
            "form_area"
          )
            .then((response) => {
              setlink(response);
              setopenSuccess(true);
            })
            .catch((error) => {
              setError(error.message);
              setopenError(true);
            });
          break;
        case EVENT_TYPE[2]:
          trackPromise(
            GoogleCalendarApi.CreateAppointementEvent(
              start,
              end,
              calendar,
              location,
              name
            ),
            "form_area"
          )
            .then((response) => {
              setlink(response);
              setopenSuccess(true);
            })
            .catch((error) => {
              setError(error.message);
              setopenError(true);
            });
          break;
        case EVENT_TYPE[3]:
          break;
        default:
          break;
      }
    } else {
      setopen(true);
    }
  };

  return (
    <>
      <Dialog
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="success-dialog-title"
        aria-describedby="success-dialog-description"
      >
        <DialogTitle id="success-dialog-title">
          {"The event has been created"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="success-dialog-description">
            The event as been created. Click{" "}
            <a href={link} target="_blank" rel="noreferrer">
              here
            </a>{" "}
            to go to the event.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccess} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Some values are missing"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You need to give at least the Starting Date, the Ending Date and the
            calendar in which the event will be added.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="error-dialog-title"
        aria-describedby="error-dialog-description"
      >
        <DialogTitle id="error-dialog-title">
          {"An error occured while the event was being added to the calender"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="error-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseError} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className={styles.root}
      >
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="calendar">Calendar</InputLabel>
            <Select
              labelId="calendar"
              id="calendar-select"
              value={calendar}
              label="Calendar"
              onChange={(selected) => setcalendar(selected.target.value)}
            >
              {calendarList && displayCalendarList()}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="event">Event</InputLabel>
            <Select
              labelId="event"
              id="event-select"
              value={eventType}
              label="Event"
              onChange={(selected) => seteventType(selected.target.value)}
            >
              {displayEventTypeList()}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
        className={styles.root}
      >
        <Grid item xs={6}>
          <DateTimePicker
            label="Event Starting Date"
            inputVariant="outlined"
            value={start}
            onChange={setstart}
            disablePast={true}
            variant="inline"
            style={{ width: "100%" }}
            ampm={false}
            format="d MMMM yyyy HH:mm"
          />
        </Grid>
        <Grid item xs={6}>
          <DateTimePicker
            label="Event Ending Date"
            inputVariant="outlined"
            value={end}
            onChange={setend}
            disablePast={true}
            variant="inline"
            ampm={false}
            minDate={start}
            format="d MMMM yyyy HH:mm"
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      {displayEventParam()}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={styles.button}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#093E60",
            color: "white",
            borderRadius: "30px",
          }}
          onClick={() => addEvent()}
        >
          Create new event
        </Button>
      </Grid>
      <PromiseLoader
        area="form_area"
        style={{ zIndex: 999, color: "#fff" }}
      ></PromiseLoader>
    </>
  );
};

export default FormCalendar;
