import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

function CreateClass({ exitModal }) {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getClasses = () => {
    axios.get('/skoolhub/classes')
      .then((response) => {
        setClasses(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const fetchTeachers = () => {
    axios.get('/skoolhub/teachers')
      .then((response) => {
        setTeachers(response.data);
      })
      .catch((error) => {
      // eslint-disable-next-line no-console
        console.error(error);
      });
    getClasses();
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleTeacherChange = (e) => {
    setSelectedTeacher(e.target.value);
  };

  const handleClassNameChange = (e) => {
    setClassName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const classData = {
      className,
      teacherId: selectedTeacher,
    };
    axios.post('/skoolhub/createClass', classData)
      .then(() => {
        setClassName('');
        setSelectedTeacher('');
        getClasses();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const handleDeleteClick = (classId) => {
    axios.delete(`/skoolhub/deleteClass/${classId}`)
      .then(() => {
        getClasses();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  const filteredClasses = classes.filter(
    (classObj) => classObj.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="modal-backdrop">

      <motion.div
        className="modal-content admin-modal"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
      >
        <button type="button" onClick={exitModal}>X</button>

        <div className="admin-form">
          <form
            onSubmit={handleSubmit}
          >
            <h2>Create Class</h2>
            <label htmlFor="name">
              Class Name:
              {' '}
              {' '}
              <input
                type="text"
                id="name"
                name="name"
                value={className}
                onChange={handleClassNameChange}
                required
              />
            </label>

            <label htmlFor="teacher">
              Teacher:
              {' '}
              {' '}
              <select
                id="teacher"
                name="teacher"
                value={selectedTeacher}
                onChange={handleTeacherChange}
                required
              >
                <option value="">
                  Select a teacher
                  {' '}
                </option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
                ))}
              </select>
            </label>

            <button type="submit">Create Class</button>
          </form>

        </div>

        <div>
          <h2>Current Classes</h2>
          <label htmlFor="searchBar">
            Search Class:
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
                <th>Teacher ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClasses.map((classObj) => {
                const teacher = teachers.find(
                  (eachTeacher) => eachTeacher.id === classObj.teacher_id,
                );
                return (
                  <tr key={classObj.id}>
                    <td>{classObj.name}</td>
                    <td>{teacher ? teacher.name : 'Unknown'}</td>
                    <td><button type="button" onClick={() => handleDeleteClick(classObj.id)}>DELETE CLASS</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </motion.div>

    </div>
  );
}

export default CreateClass;

CreateClass.propTypes = {
  exitModal: PropTypes.func.isRequired,
};
