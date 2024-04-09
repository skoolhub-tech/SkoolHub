import React, { useState, useEffect } from 'react';
import './editForm.css';
import moment from 'moment';
import { useUserData } from '../data-providers/UserDataProvider';

function EditTask({ task, closeEditTask }) {
  const { userData } = useUserData();

  const [editedTask, setEditedTask] = useState({
    ...task,
    start: task.start,
    end: task.end,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Handle save action here
    // console.log(editedTask);
  };

  const handleDelete = () => {
    // Handle delete action here
    // console.log("Delete task");
  };

  return (
    <div className="modal">
      {/* Modal */}
      <div className="modal-content">
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

          <button type="button" onClick={handleSave}>Save</button>
          <button className="delete" type="button" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
