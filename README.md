# Overview

Retrieves *today's* events from a link to an iCal file, and inserts them into your journal page based on a template. Useful to retrieve at the start of the day when planning the day's work.

_Why just today's events?_

As calendar events change quite dynamically, it doesn't make sense to me to take a 'sync' approach to the calendar events. Instead, what makes more sense (to me) is that the day's events are pulled as part of a morning ritual. Hence, only start/end *time* is retrieved and not the date itself.

# Usage

1. Create a block anywhere with your desired template. The available parameters can be found in the glossary below. E.g.

```
- **<%starttime%> - <%endtime%>** <%summary%>
```

2. After installing the plugin, enter the URL to your `.ics` file and the block reference that contains your template.
3. Activate it via a slash command in your journal page, using `/Retrieve today's events` and the blocks will be inserted. This can be done on any page, but recommended to use on a daily journal page.

## Template Glossary

| Template Param  | iCalendar Property | Description |
|-----------------|--------------------|-------------|
| <%attendees%>   | ATTENDEE           | List of event attendees with their email addresses |
| <%summary%>     | SUMMARY            | Subject of the event |
| <%description%> | DESCRIPTION        | Detailed description of the event |
| <%starttime%>   | DTSTART            | Start time of the event |
| <%endtime%>     | DTEND              | End time of the event |
| <%location%>    | LOCATION           | Physical location or address of the event |
| <%organizer%>   | ORGANIZER          | Email address of the event organizer |
| <%uid%>         | UID                | Unique identifier for the event |
| <%created%>     | CREATED            | Date and time the event was created in the calendar |
| <%lastmodified%>| LAST-MODIFIED      | Date and time the event was last modified |
| <%rrule%>       | RRULE              | Recurrence rule for repeating events |
| <%status%>      | STATUS             | Status of the event (e.g., CONFIRMED, TENTATIVE, CANCELLED) |

## Obtaining the iCal link

Google Calendar:

1. Open Google Calendar
2. Click the gear icon (Settings)
3. Select "Settings"
4. Click on the calendar you want to share under "Settings for my calendars"
5. Scroll to "Integrate calendar"
6. Copy the "Secret address in iCal format"

Outlook Web:

1. Log in to Outlook.com
2. Click the calendar icon
3. Click "Share" and then "Get a link"
4. Choose "Can view all details" from the dropdown
5. Click "Generate"
6. Copy the generated ICS link

# Installation

Recommend to install from the marketplace. If not, download a release and manually load it in Logseq.
