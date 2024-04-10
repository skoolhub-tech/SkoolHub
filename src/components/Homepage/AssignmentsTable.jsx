import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import { useUserData } from '../data-providers/UserDataProvider';
import AssignmentsRow from './AssignmentsRow';

const formatDate = (dateString) => {
  const date = parseISO(dateString);
  return format(date, 'MM/dd/yy');
};

function AssignmentsTable({ assignments, classes, filter }) {
  const { userData } = useUserData();

  return (
    <div className="homepage-assignments-table">
      <select
        className="homepage-class-select"
        value=""
        onChange={(e) => filter(e)}
      >
        <option value="">All Classes</option>
        {classes.map((classObj) => (
          <option key={classObj.id} value={classObj.id}>
            {classObj.name}
          </option>
        ))}
      </select>
      <table className="HP-assignments-table">
        <thead>
          <tr>
            <th className="left-table">Assignment</th>
            <th className="left-table">Due</th>
            {userData.role === 3 ? <th className="right-table">Completed</th> : null}
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
    </div>
  );
}

AssignmentsTable.propTypes = {
  assignments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      class_id: PropTypes.number.isRequired,
      due_date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  filter: PropTypes.func.isRequired,
};

export default AssignmentsTable;
