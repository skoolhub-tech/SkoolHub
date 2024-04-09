import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateClass({ exitModal }) {
  // Your code here
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [className, setClassName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    axios.get('/skoolhub/teachers')
      .then((response) => {
        // console.log(response.data);
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('/skoolhub/classes')
      .then((response) => {
        // console.log(response.data);
        setClasses(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
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
      .then((response) => {
        console.log(response.data);
        setClassName('');
        setSelectedTeacher('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <button type="button" onClick={exitModal}>X</button>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Class Name:
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
          <select
            id="teacher"
            name="teacher"
            value={selectedTeacher}
            onChange={handleTeacherChange}
            required
          >
            <option value="">Select a teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>{teacher.name}</option>
            ))}
          </select>
        </label>

        <button type="submit">Create Class</button>
      </form>

      <div>
        <h2>Current Classes</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Teacher ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classObj) => (
              <tr key={classObj.id}>
                <td>{classObj.name}</td>
                <td>{classObj.teacher_id}</td>
                <td><button>DELETE CLASS</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default CreateClass;
