/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';
import './createAssignmentModal.css';

function CreateAssignmentModal({ classObj, closeModal, getClassesAndAssignments }) {
  const [assignmentName, setAssignmentName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [instructions, setInstructions] = useState('');
  const { userData: { id, role } } = useUserData();

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
    axios.post('/skoolhub/assignments', {
      assignment: {
        classId: classObj.id,
        name: assignmentName,
        dueDate: new Date(dueDate),
        instructions,
        teacherId: id,
      },
      role,
    })
      .then(() => {
        getClassesAndAssignments();
      })
      .catch((error) => {
        console.log(`Error creating assignment: ${error}`);
      })
      .finally(() => {
        closeModal();
      });
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div className="create-assignment-modal-background" onClick={() => closeModal()}>
      <div className="create_assignment_modal">
        <h1>Create Assignment</h1>
        <form className="create_assignment_form" onSubmit={handleSubmit}>
          <label className="create-assignment-label" htmlFor="assignmentName">
            Assignment Name:
            <input
              type="text"
              id="assignmentName"
              placeholder="Enter Assignment Name"
              onChange={handleAssignmentNameChange}
            />
          </label>
          <label className="create-assignment-label" htmlFor="dueDate">
            Due Date:
            <input
              type="date"
              id="dueDate"
              placeholder="YYYY-MM-DD"
              onChange={handleDueDateChange}
            />
          </label>
          <label className="create-assignment-label" htmlFor="instructions">
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
    </div>
  );
}

export default CreateAssignmentModal;

CreateAssignmentModal.propTypes = {
  classObj: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
  getClassesAndAssignments: PropTypes.func.isRequired,
};
