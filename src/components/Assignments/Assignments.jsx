import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';
import ClassesDropDownMenu from './ClassesDropDownMenu';
import AssignmentsRowStudent from './AssignmentsRowStudent';

function AssignmentsPage() {
  const { userData: { email, role } } = useUserData();
  const [data, setData] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);

  const getClassesAndAssignmentsForStudent = useCallback(async () => {
    try {
      const response = await axios.get(`http://${process.env.SERVER_IP}:${process.env.PORT}/skoolhub/classesAndAssignments/students?email=${email}`);
      setData(response.data);
    } catch (error) {
      console.log(`Error fetching classes and assignments for student: ${error}`);
    }
  }, []);

  useEffect(() => {
    getClassesAndAssignmentsForStudent();
  }, [email, getClassesAndAssignmentsForStudent]);

  return data ? (
    <div>
      <h1>Assignments</h1>
      <ClassesDropDownMenu
        classes={data}
        setSelectedClass={setSelectedClass}
      />
      <div>
        {selectedClass ? (
          <div>
            <h2>{selectedClass}</h2>
            <table>
              <tr>
                <th>Assignment</th>
                <th>Due Date</th>
                <th>Submitted On</th>
              </tr>
              {data
                .find((classObj) => classObj.name === selectedClass)
                .assignments.map((assignment) => (
                  role === 3 ? (
                    <AssignmentsRowStudent
                      key={assignment.id}
                      assignment={assignment}
                      getClassesAndAssignmentsForStudent={getClassesAndAssignmentsForStudent}
                    />
                  ) : null
                ))}
            </table>
          </div>
        ) : (
          <div>Select a class to see assignments</div>
        )}
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default AssignmentsPage;
