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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td><button type="button">ADD</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AddStudent;
