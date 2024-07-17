import axios from 'axios'
import { compareAsc, format, isToday } from 'date-fns'
// @ts-expect-error no types for ical.js
import ICAL from 'ical.js'

export interface VEvent {
  attendees: string[] | null
  color: string | null
  summary: string
  description: string | null
  startDate: ICAL.Time
  endDate: ICAL.Time
  location: string | null
  organizer: string | null
  uid: string
}

export interface TodayEvent {
  attendees: string[] | null
  color: string | null
  summary: string
  description: string | null
  starttime: ICAL.Time
  endtime: ICAL.Time
  location: string | null
  organizer: string | null
  uid: string
}

export type EventKeyUnion =
  | 'attendees'
  | 'color'
  | 'summary'
  | 'description'
  | 'starttime'
  | 'endtime'
  | 'location'
  | 'organizer'
  | 'uid'

export const getTodaysEvents = async (): Promise<TodayEvent[]> => {
  try {
    const response = await axios({
      method: 'get',
      url: logseq.settings!.icalTemplateUrl,
    })
    const jcalData = ICAL.parse(response.data)
    const component = new ICAL.Component(jcalData)
    const vevents: VEvent[] = component.getAllSubcomponents('vevent')

    const todayEvents = vevents
      .map((vevent) => new ICAL.Event(vevent))
      .filter((vevent) => {
        const eventDate = vevent.startDate.toJSDate()
        return isToday(eventDate)
      })
      .sort((a, b) =>
        compareAsc(a.startDate.toJSDate(), b.startDate.toJSDate()),
      )
      .map((vevent: VEvent) => {
        const {
          attendees,
          color,
          summary,
          description,
          startDate,
          endDate,
          location,
          organizer,
          uid,
        } = vevent
        return {
          attendees,
          color,
          summary,
          description,
          starttime: format(startDate.toJSDate(), 'HH:mm'),
          endtime: format(endDate.toJSDate(), 'HH:mm'),
          location,
          organizer,
          uid,
        }
      })
    return todayEvents
  } catch (error) {
    console.error(error)
    throw new Error('Error retrieving events')
  }
}
