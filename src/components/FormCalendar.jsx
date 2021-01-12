import React, { useState } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

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
  },
});

const FormCalendar = ({ calendarList }) => {
  const [calendar, setcalendar] = useState("");
  const [eventType, seteventType] = useState("");
  const [pills, setpills] = useState([]);
  const [end, setend] = useState(new Date());
  const [start, setstart] = useState(new Date());
  const [location, setlocation] = useState("");
  const [name, setname] = useState("");
  const [formId, setformId] = useState("");

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

  const displayEventParam = () => {
    switch (eventType) {
      case EVENT_TYPE[0]:
        return null;
      case EVENT_TYPE[1]:
        return;
      case EVENT_TYPE[2]:
      case EVENT_TYPE[3]:
      default:
        return null;
    }
  };

  return (
    <>
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
            format="d MMMM yyyy HH:mm"
            style={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      {displayEventParam()}
    </>
  );
};

export default FormCalendar;
