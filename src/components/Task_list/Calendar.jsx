/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
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

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get(`/skoolhub/calendar/${userData.role}/${userData.id}`)
      .then((response) => {
        const reformattedRes = response.data.map((event) => {
          event.start = new Date(event.start);
          event.end = new Date(event.end);
          return event;
        });
        setEvents(reformattedRes);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userData.role, userData.id, refresh]);

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
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          defaultView={defaultView}
          views={views}
          eventPropGetter={(event) => {
            const eventStyle = {
              style: {
                backgroundColor: '#858D6F',
                border: '1px solid #875D3B',
                color: '#fff',
                opacity: event.completed === true ? 0.50 : 1,
              },
            };
            return eventStyle;
          }}
        />
        {editTask && (
        <EditTask
          task={selectedTask}
          closeEditTask={closeEditTask}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        )}
        {addTaskFromSelect && (
          <AddFromSelect
            task={selectedTask}
            closeAddTaskFromSelect={closeAddTaskFromSelect}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
        {addTask && (
          <AddTask
            task={selectedTask}
            closeAddTask={closeAddTask}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}
      </div>
    </div>
  );
}

export default TaskCalendar;
