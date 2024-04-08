import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ViewAssignmentButton({ assignment }) {
  return (
    <button type="button">View Assignment</button>
  );
}

export default ViewAssignmentButton;

ViewAssignmentButton.propTypes = {
  assignment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
  }).isRequired,
};
