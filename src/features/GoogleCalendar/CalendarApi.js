export const GoogleCalendarHeader = new Headers()

export const GoogleCalendarConfig = async accessToken => {
  GoogleCalendarHeader.append('Authorization', 'Bearer ' + accessToken)
}

/**
 * Get the list of the connected user's Calendar
 */
export const GetGoogleCalendarList = async () => {
  const res = await fetch(
    'https://www.googleapis.com/calendar/v3/users/me/calendarList',
    {
      method: 'GET',
      headers: GoogleCalendarHeader
    }
  )
  if (!res.ok) {
    console.log(res.statusText)
    throw Error(res.statusText)
  }
  const json = await res.json()
  return json.items
}

/**
 *
 * @param {String} summary
 * @param {String} description
 * @param {Date} end
 * @param {Date} start
 * @param {String} calendarId
 * @returns {Object}
 */
export const CreateEvent = async (
  summary,
  description = '',
  end,
  start,
  location = '',
  timeZone,
  calendarId
) => {
  GoogleCalendarHeader.append('Accept', 'application/json')
  GoogleCalendarHeader.append('Content-Type', 'application/json')
  console.log(GoogleCalendarHeader)
  const res = await fetch(
    'https://www.googleapis.com/calendar/v3/calendars/' +
      calendarId +
      '/events',
    {
      method: 'POST',
      headers: GoogleCalendarHeader,
      body: JSON.stringify({
        end: {
          dateTime: end,
          timeZone
        },
        start: {
          dateTime: start,
          timeZone
        },
        description: description,
        summary: summary,
        location: location
      })
    }
  )
  const json = await res.json()
  if (!res.ok) {
    console.log(res.statusText)
    throw Error(res.statusText)
  }
  return json
}
