import React, { useState, useEffect } from 'react';
import './editForm.css';
import moment from 'moment';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';

function AddFromSelect({ task, closeAddTaskFromSelect, refresh, setRefresh }) {
  const { userData } = useUserData();

  const [newTask, setNewTask] = useState({
    id: userData.id,
    ...task,
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
    // Handle save action here
    console.log(newTask);
    axios.post('/skoolhub/submittask', {
      role: userData.role,
      data: newTask,
    })
      .then(() => {
        console.log('Task added');
        setRefresh(!refresh);
        closeAddTaskFromSelect();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button type="button" className="exit-button" onClick={closeAddTaskFromSelect}>Cancel</button>
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

export default AddFromSelect;
