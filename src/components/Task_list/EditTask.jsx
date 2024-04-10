/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import axios from 'axios';
import './editForm.css';
import moment from 'moment';
import { useUserData } from '../data-providers/UserDataProvider';

function EditTask({
  task, closeEditTask, refresh, setRefresh,
}) {
  const { userData } = useUserData();

  const [editedTask, setEditedTask] = useState({
    ...task,
    start: moment.utc(task.start).local().format(),
    end: moment.utc(task.end).local().format(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    axios.put('/skoolhub/edittask', {
      role: userData.role,
      data: editedTask,
    })
      .then(() => {
        setRefresh(!refresh);
        closeEditTask();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDelete = () => {
    axios.delete('/skoolhub/deletetask', {
      data: {
        role: userData.role,
        data: editedTask,
      },
    })
      .then(() => {
        setRefresh(!refresh);
        closeEditTask();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal">
      {/* Modal */}
      <div className="calendar-modal-content">
        <button type="button" className="exit-button" onClick={closeEditTask}>Cancel</button>
        <h2 className="edit-task">Edit Task</h2>
        <div className="floating-form">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            disabled={false}
          />

          <label htmlFor="start">Start:</label>
          <input
            className="start-input"
            type="datetime-local"
            id="start"
            name="start"
            value={moment(editedTask.start).format('YYYY-MM-DDTHH:mm')}
            onChange={handleChange}
            disabled={false}
          />

          <label htmlFor="end">End:</label>
          <input
            className="end-input"
            type="datetime-local"
            id="end"
            name="end"
            value={moment(editedTask.end).format('YYYY-MM-DDTHH:mm')}
            onChange={handleChange}
            disabled={false}
          />
          <label htmlFor="completed">Completed:</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={editedTask.completed}
            onChange={() => {
              setEditedTask((prevTask) => ({
                ...prevTask,
                completed: !prevTask.completed,
              }));
            }}
          />
          <button type="button" onClick={handleSave}>Save</button>
          <button className="delete" type="button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
