import * as GoogleCalendarApi from './CalendarApi'

export const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

export const CreatePillEvent = async (pills, start, end, calendarId) => {
  try {
    const res = await GoogleCalendarApi.CreateEvent(
      'Pills',
      JSON.stringify({ Pills: pills }),
      end,
      start,
      '',
      TIMEZONE,
      calendarId
    )
    return res.htmlLink
  } catch (error) {
    throw new Error('Impossible to create Pills Event, try again later')
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
      TIMEZONE,
      calendarId
    )
    return res.htmlLink
  } catch (error) {
    throw new Error('Impossible to create Walk Event, try again later')
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
      TIMEZONE,
      calendarId
    )
    return res.htmlLink
  } catch (error) {
    throw new Error('Impossible to create Pills Event, try again later')
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
      TIMEZONE,
      calendarId
    )
    return res.htmlLink
  } catch (error) {
    throw new Error('Impossible to create Pills Event, try again later')
  }
}

export const GetCalendarsNameList = async () => {
  try {
    const calendars = await GoogleCalendarApi.GetGoogleCalendarList()
    const calendarList = []
    calendars.forEach(calendar => {
      calendarList.push({
        id: calendar.id,
        name: calendar.summary
      })
    })
    return calendarList
  } catch (error) {
    console.log(error)
  }
}
