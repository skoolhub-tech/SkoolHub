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
      title: 'Task asfkljsa;djf;lasdjf;ladsjfl;dasjf',
      start: new Date(2024, 3, 7, 3, 0),
      end: new Date(2024, 3, 7, 3, 30),
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

  const handleSelectSlot = (slotInfo) => {
    // Using moment to handle the date more flexibly
    const startDate = moment(slotInfo.start).format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(slotInfo.end).format('YYYY-MM-DD HH:mm:ss');
    const dayOfWeek = moment(slotInfo.start).format('d'); // 'd' gives the day of the week (0 for Sunday, 6 for Saturday)

    console.log(`Slot selected: start=${startDate}, end=${endDate}, day of the week=${dayOfWeek}`);

    // Additional actions here
  };

  const closeEditTask = () => {
    setEditTask(false);
  };

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable={true}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectEvent}
      />
      {editTask && <EditTask task={selectedTask} closeEditTask={closeEditTask} />}
    </div>
  );
}

export default TaskCalendar;
