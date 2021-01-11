import * as GoogleCalendarApi from './CalendarApi'

export const CreatePillEvent = async (pills, start, end, calendarId) => {
  try {
    const res = await GoogleCalendarApi.CreateEvent(
      'Pills',
      JSON.stringify({ Pills: pills }),
      end,
      start,
      '',
      calendarId
    )
    return res.htmlLink
  } catch (error) {
    return 'Impossible to create Pills Event, try again later'
  }
}

export const CreateWalkEvent = async (start, end, calendarId) => {
  try {
    const res = await GoogleCalendarApi.CreateEvent(
      'Walk',
      '',
      end,
      start,
      '',
      calendarId
    )
    return res.htmlLink
  } catch (error) {
    return 'Impossible to create Walk Event, try again later'
  }
}

export const CreateAppointementEvent = async (
  start,
  end,
  calendarId,
  location,
  name
) => {
  try {
    const res = await GoogleCalendarApi.CreateEvent(
      'Appointment',
      JSON.stringify({ Name: name }),
      end,
      start,
      location,
      calendarId
    )
    return res.htmlLink
  } catch (error) {
    return 'Impossible to create Pills Event, try again later'
  }
}

export const CreateFormEvent = async (start, end, calendarId, formId) => {
  try {
    const res = await GoogleCalendarApi.CreateEvent(
      'Appointment',
      JSON.stringify({ FormID: formId }),
      end,
      start,
      '',
      calendarId
    )
    return res.htmlLink
  } catch (error) {
    return 'Impossible to create Pills Event, try again later'
  }
}
