import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import EditTask from './EditTask';
import './calendar.css';

function TaskCalendar() {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Task 1',
      start: new Date(2024, 3, 7, 10, 0),
      end: new Date(2024, 3, 7, 12, 0),
    },
    {
      id: 2,
      title: 'Task 2',
      start: new Date(2024, 3, 15, 10, 0),
      end: new Date(2024, 3, 15, 12, 0),
    },
  ]);

  const [editTask, setEditTask] = useState(false);

  const [selectedTask, setSelectedTask] = useState({});

  const handleSelectEvent = (event) => {
    setSelectedTask(event);
    setEditTask(true);
  };

  const closeEditTask = () => {
    setEditTask(false);
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        onSelectEvent={handleSelectEvent}
      />
      {editTask && <EditTask task={selectedTask} closeEditTask={closeEditTask} />}
    </div>
  );
}

export default TaskCalendar;
