import React from 'react';
import axios from 'axios';
import { useUserData } from '../data-providers/UserDataProvider';

const { useState, useEffect } = React;

function Homepage() {
  const { userData } = useUserData();
  const { email, id, role } = userData;

  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [tasks, setTasks] = useState([]);

  const getCurrentAssignments = (classId) => {
    let path = `/skoolhub/assignments/current/${role}/${id}`;
    if (classId) {
      path += `/?classId=${classId}`;
    }

    axios.get(path)
      .then((response) => {
        console.log(response.data);
        setAssignments(response.data);
      })
      .catch((error) => console.error({
        Message: 'Error retrieving assignments.',
        Error: error,
      }));
  };

  useEffect(() => {
    axios.get(`/skoolhub/classes/${email}`)
      .then((response) => setClasses(response.data))
      .catch((error) => console.error({
        Message: 'Error retrieving classes.',
        Error: error,
      }));

    axios.get(`/skoolhub/calendar/${role}/${id}`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error({
        Message: 'Error retrieving calendar.',
        Error: error,
      }));

    getCurrentAssignments();
  }, [userData]);

  const filterAssignments = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];

    if (selectedOption.value) {
      getCurrentAssignments(selectedOption.value);
    } else {
      getCurrentAssignments();
    }
  };

  return (
    <div>
      <h1>Homepage</h1>
      <select value="" onChange={(e) => filterAssignments(e)}>
        <option value="">Select a class</option>
        <option value="">All</option>
        {classes.map((classObj) => (
          <option key={classObj.id} value={classObj.id}>
            {classObj.name}
          </option>
        ))}
      </select>
      {assignments.length > 0 && (
        <div>
          <h2>Assignments</h2>
          <ul>
            {assignments.map((assignment) => (
              <li key={assignment.id}>{assignment.name}</li>
            ))}
          </ul>
        </div>
      )}
      {tasks.length > 0 && (
        <div>
          <h2>Today&apos;s Tasks</h2>
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>{task.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Homepage;
