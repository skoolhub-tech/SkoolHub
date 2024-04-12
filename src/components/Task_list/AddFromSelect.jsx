/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './editForm.css';
import moment from 'moment';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';

function AddFromSelect({
  task, closeAddTaskFromSelect, refresh, setRefresh, showNotificationTimer
}) {
  const { userData } = useUserData();

  const currentHour = moment().startOf('hour');
  const nextHour = moment().startOf('hour').add(1, 'hour');

  const updatedStart = moment(task.start).startOf('day').hour(currentHour.hour());
  const updatedEnd = moment(task.start).startOf('day').hour(nextHour.hour());

  const [newTask, setNewTask] = useState({
    id: userData.id,
    ...task,
    start: updatedStart.utc().local().format(),
    end: updatedEnd.utc().local().format(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!newTask.title) {
      return;
    }
    axios.post('/skoolhub/submittask', {
      role: userData.role,
      data: newTask,
    })
      .then(() => {
        showNotificationTimer();
        setRefresh(!refresh);
        closeAddTaskFromSelect();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal">
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
      >
        <button type="button" className="exit-button" onClick={closeAddTaskFromSelect}>Cancel</button>
        <h2 className="edit-task">Add Task</h2>
        <div className="floating-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="A title is required"
            required
            value={newTask.title}
            onChange={handleChange}
            disabled={false}
          />

          <label htmlFor="start">Start:</label>
          <input
            className="start-input"
            type="datetime-local"
            id="start"
            name="start"
            value={moment(newTask.start).format('YYYY-MM-DDTHH:mm')}
            onChange={handleChange}
            disabled={false}
          />

          <label htmlFor="end">End:</label>
          <input
            className="end-input"
            type="datetime-local"
            id="end"
            name="end"
            value={moment(newTask.end).format('YYYY-MM-DDTHH:mm')}
            onChange={handleChange}
            disabled={false}
          />

          <button type="button" onClick={handleSave}>Save</button>
        </div>
      </motion.div>
    </div>
  );
}

export default AddFromSelect;
