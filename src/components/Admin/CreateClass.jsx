import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateClass() {
  // Your code here
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);

  const [className, setClassName] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');

  useEffect(() => {
    axios.get('/skoolhub/teachers')
      .then((response) => {
        console.log(response.data);
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('/skoolhub/classes')
      .then((response) => {
        console.log(response.data);
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
    // axios post request
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
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

        <button type="submit">Create</button>
      </form>

      <div>
        <h2>Current Classes</h2>
        <ul>
          {classes.map((classObj) => (
            <li key={classObj.id}>
              {classObj.name} -
              {classObj.teacher_id}
              <button>DELETE CLASS</button>
            </li>
          ))}
        </ul>
      </div>



    </div>
  );
}

export default CreateClass;
