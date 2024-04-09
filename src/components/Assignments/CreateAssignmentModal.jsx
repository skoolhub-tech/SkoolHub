/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './createAssignmentModal.css';

function CreateAssignmentModal({ classObj, closeModal }) {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [instructions, setInstructions] = useState('');

  function handleAssignmentNameChange(event) {
    setAssignmentName(event.target.value);
  }

  function handleDueDateChange(event) {
    setDueDate(event.target.value);
  }

  function handleInstructionsChange(event) {
    setInstructions(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    closeModal();
    console.log('Class:', classObj.name);
    console.log('Assignment Name:', assignmentName);
    console.log('Due Date:', dueDate);
    console.log('Instructions:', instructions);
  }

  return (
    <div className="create_assignment_modal">
      <h1>Create Assignment</h1>
      <form className="create_assignment_form" onSubmit={handleSubmit}>
        <label htmlFor="assignmentName">
          Assignment Name:
          <input
            type="text"
            id="assignmentName"
            placeholder="Enter Assignment Name"
            onChange={handleAssignmentNameChange}
          />
        </label>
        <label htmlFor="dueDate">
          Due Date:
          <input
            type="date"
            id="dueDate"
            placeholder="YYYY-MM-DD"
            onChange={handleDueDateChange}
          />
        </label>
        <label htmlFor="instructions">
          Instructions:
          <textarea
            id="instructions"
            placeholder="Enter Assignment Instructions"
            onChange={handleInstructionsChange}
          />
        </label>
        <br />
        <button type="submit">Create Assignment</button>
      </form>
    </div>
  );
}

export default CreateAssignmentModal;

CreateAssignmentModal.propTypes = {
  classObj: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
};