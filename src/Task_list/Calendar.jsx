import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import './calendar.css';

function TaskCalendar() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Task 1',
      description: 'This is task 1 description',
      start: new Date(2024, 3, 7, 10, 0),
      end: new Date(2024, 3, 7, 12, 0),
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'This is task 2 description',
      start: new Date(2024, 3, 15, 10, 0),
      end: new Date(2024, 3, 15, 12, 0),
    },
  ]);

  const localizer = momentLocalizer(moment);

  //fix this later
  const Event = ({ event }) => {
    return (
      <div>
        <strong>{event.title}</strong>
        <div>{event.description}</div>
      </div>
    );
  };

  const handleSelectEvent = (event, e) => {
    console.log('Selected event:', event);
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        onSelectEvent={handleSelectEvent}
        components={{
          event: Event,
        }}
      />
    </div>
  );
}

export default TaskCalendar;
