import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddStudent({ closeModal, studentsInClass, selectedClass, fetchStudentsInClass }) {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);

  const fetchStudents = () => {
    axios.get('/skoolhub/students')
      .then((response) => {
        // console.log(response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (student) => !studentsInClass.some((studentInClass) => studentInClass.id === student.id)
      && student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const AddStudentToClass = (classId, studentId) => {
    axios.post('/skoolhub/classes/students', { classId, studentId })
      .then((response) => {
        console.log(response);
        fetchStudentsInClass(classId);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
      });

  };

  const handleAddClick = (studentId) => {
    AddStudentToClass(selectedClass, studentId);
  };

  return (
    <div className="modal-backdrop">

      <div className="modal-content admin-modal">
        <button type="button" onClick={closeModal}>X</button>
        <h2>Students</h2>

        <label htmlFor="searchBar">
          Search:
          <input
            type="text"
            id="searchBar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>

        <table className="admin-add-student-table">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                {/* <td>{student.id}</td> */}
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td><button type="button" onClick={() => handleAddClick(student.id)}>ADD</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AddStudent;
