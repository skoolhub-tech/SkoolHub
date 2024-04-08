import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import EditTask from './EditTask';
import AddFromSelect from './AddFromSelect';
import AddTask from './AddTask';
import './calendar.css';

function TaskCalendar({ defaultView, views }) {
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

  const [addTaskFromSelect, setAddTaskFromSelect] = useState(false);

  const [addTask, setAddTask] = useState(false);

  const [selectedTask, setSelectedTask] = useState({});

  const handleSelectEvent = (event) => {
    setSelectedTask(event);
    setEditTask(true);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedTask({ title: '', start: slotInfo.start, end: slotInfo.end });
    setAddTaskFromSelect(true);
  };

  const handleAddTask = () => {
    setSelectedTask({ title: '', start: new Date(), end: new Date() });
    setAddTask(true);
  };

  const closeEditTask = () => {
    setEditTask(false);
  };

  const closeAddTaskFromSelect = () => {
    setAddTaskFromSelect(false);
  };

  const closeAddTask = () => {
    setAddTask(false);
  };

  return (
    <div>
      {defaultView === 'month' && <button className="add-task" type="submit" onClick={handleAddTask}>Add Task</button>}
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        selectable={true}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        defaultView={defaultView}
        views={views}
      />
      {editTask && <EditTask task={selectedTask} closeEditTask={closeEditTask} />}
      {addTaskFromSelect && <AddFromSelect task={selectedTask} closeAddTaskFromSelect={closeAddTaskFromSelect} />}
      {addTask && <AddTask task={selectedTask} closeAddTask={closeAddTask} />}
    </div>
    </div>
  );
}

export default TaskCalendar;
