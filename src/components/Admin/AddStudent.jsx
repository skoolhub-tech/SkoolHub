import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function AddStudent({
  closeModal, studentsInClass, selectedClass, fetchStudentsInClass,
}) {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refresh, setRefresh] = useState(false);

  const fetchStudents = () => {
    axios.get('/skoolhub/students')
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
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
      .then(() => {
        fetchStudentsInClass(classId);
        setRefresh(!refresh);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const handleAddClick = (studentId) => {
    AddStudentToClass(selectedClass, studentId);
  };

  return (
    <div className="modal-backdrop">

      <motion.div
        className="modal-content admin-modal"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
      >
        <button type="button" onClick={closeModal}>X</button>
        <h2>Students</h2>

        <label htmlFor="searchBar">
          Search:
          {' '}
          {' '}
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
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td><button type="button" onClick={() => handleAddClick(student.id)}>ADD</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

    </div>
  );
}

export default AddStudent;

AddStudent.propTypes = {
  closeModal: PropTypes.func.isRequired,
  studentsInClass: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  })).isRequired,
  selectedClass: PropTypes.string.isRequired,
  fetchStudentsInClass: PropTypes.func.isRequired,
};
