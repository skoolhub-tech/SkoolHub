import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useUserData } from '../data-providers/UserDataProvider';
import EditTask from './EditTask';
import AddFromSelect from './AddFromSelect';
import AddTask from './AddTask';
import './calendar.css';

function TaskCalendar({ defaultView, views }) {
  const localizer = momentLocalizer(moment);

  const { userData } = useUserData();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get(`/skoolhub/calendar/${userData.role}/${userData.id}`)
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData.role, userData.id]);

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
    console.log(events);
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
