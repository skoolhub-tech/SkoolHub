import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import { useUserData } from '../data-providers/UserDataProvider';
import AssignmentsRow from './AssignmentsRow';

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'MM/dd/yy');
};

function AssignmentsTable({ assignments }) {
  return (
    <table className="assignments_table_student">
      <thead>
        <tr>
          <th>Assignment</th>
          <th>Due Date</th>
        </tr>
      </thead>
      <tbody>
        {assignments.map((assignment) => (
          <AssignmentsRow
            key={assignment.id}
            dueDate={formatDate(assignment.due_date)}
            assignment={assignment}
          />
        ))}
      </tbody>
    </table>
  );
}

AssignmentsTable.propTypes = {
  assignments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AssignmentsTable;
