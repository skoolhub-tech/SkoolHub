import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddStudent({ closeModal, studentsInClass }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get('/skoolhub/students')
      .then((response) => {
        // console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        // console.error(error);
      });
  }, []);

  const filteredStudents = students.filter(
    (student) => !studentsInClass.some((studentInClass) => studentInClass.id === student.id),
  );

  return (
    <div>
      <button type="button" onClick={closeModal}>X</button>
      <h2>Students</h2>
      <ul>
        {filteredStudents.map((student) => (
          <li key={student.id}>
            {student.id}
            -
            {student.name}
            -
            {student.email}
            <button type="button">ADD</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddStudent;
