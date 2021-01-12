export const GoogleCalendarHeader = new Headers()

export const GoogleCalendarConfig = async accessToken => {
  GoogleCalendarHeader.append('Authorization', 'Bearer ' + accessToken)
}

/**
 * Get the list of the connected user's Calendar
 */
export const GetGoogleCalendarList = async () => {
  try {
    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/users/me/calendarList',
      {
        method: 'GET',
        headers: GoogleCalendarHeader
      }
    )
    const json = await res.json()
    return json.items
  } catch (error) {
    throw new Error(error)
  }
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
  calendarId
) => {
  try {
    GoogleCalendarHeader.append('Accept', 'application/json')
    GoogleCalendarHeader.append('Content-Type', 'application/json')
    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/' +
        calendarId +
        '/events',
      {
        method: 'POST',
        headers: GoogleCalendarHeader,
        body: JSON.stringify({
          end: {
            date: end
          },
          start: {
            date: start
          },
          description: description,
          summary: summary,
          location: location
        })
      }
    )
    const json = await res.json()
    return json
  } catch (error) {
    throw new Error(error)
  }
}
