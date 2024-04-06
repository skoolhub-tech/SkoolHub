import React, { useState, useEffect } from 'react';
import './editForm.css';

function EditTask({ task, closeEditTask }) {
  const [editedTask, setEditedTask] = useState({
    ...task,
    start: task.start.toISOString().substring(0, 16),
    end: task.end.toISOString().substring(0, 16),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(editedTask);
  };

  return (
    <div className="modal">
      {/* Modal */}
      <div className="modal-content">
        <button type="button" className="exit-button" onClick={closeEditTask}>Exit</button>
        <form className="floating-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            disabled={false} // Enable editing
          />

          <label htmlFor="start">Start:</label>
          <input
            className="start-input"
            type="datetime-local"
            id="start"
            name="start"
            value={editedTask.start}
            onChange={handleChange}
            disabled={false}
          />

          <label htmlFor="end">End:</label>
          <input
            className="end-input"
            type="datetime-local"
            id="end"
            name="end"
            value={editedTask.end}
            onChange={handleChange}
            disabled={false}
          />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
