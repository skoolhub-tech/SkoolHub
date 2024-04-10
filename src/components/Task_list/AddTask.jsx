/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import './editForm.css';
import moment from 'moment';
import { useUserData } from '../data-providers/UserDataProvider';
import axios from 'axios';

function AddTask({
  task, closeAddTask, refresh, setRefresh,
}) {
  const { userData } = useUserData();

  const [newTask, setNewTask] = useState({
    ...task,
    id: userData.id,
    start: moment.utc(task.start).local().format(),
    end: moment.utc(task.end).local().format(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios.post('/skoolhub/submittask', {
      role: userData.role,
      data: newTask,
    })
      .then(() => {
        setRefresh(!refresh);
        closeAddTask();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal">
      {/* Modal */}
      <div className="modal-content">
        <button type="button" className="exit-button" onClick={closeAddTask}>Cancel</button>
        <h2 className="edit-task">Add Task</h2>
        <div className="floating-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
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
      </div>
    </div>
  );
}

export default AddTask;
