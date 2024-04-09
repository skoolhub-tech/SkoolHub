/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { useUserData } from '../data-providers/UserDataProvider';

function AssignmentsRow({ assignment, dueDate }) {
  const { name } = assignment;
  return (
    <tr>
      <td>{name}</td>
      <td>{dueDate}</td>
    </tr>
  );
}

AssignmentsRow.propTypes = {
  assignment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    due_date: PropTypes.string.isRequired,
  }).isRequired,
  dueDate: PropTypes.string.isRequired,
};

export default AssignmentsRow;
