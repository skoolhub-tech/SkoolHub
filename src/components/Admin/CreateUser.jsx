import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CreateUser({ exitModal }) {
  // Your code here
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    axios.get('/skoolhub/teachers')
      .then((response) => {
        console.log('TEACHERS', response.data);
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('/skoolhub/students')
      .then((response) => {
        console.log('STUDENTS', response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('/skoolhub/admin')
      .then((response) => {
        console.log('ADMIN', response.data);
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('/skoolhub/roles')
      .then((response) => {
        console.log('ROLES', response.data);
        setRoles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name,
      email,
      role: selectedRole,
    };

    axios.post('/skoolhub/createUser', userData)
      .then((response) => {
        console.log(response.data);
        setName('');
        setEmail('');
        setSelectedRole('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const users = teachers.concat(students, admins);

  const handleDeleteClick = (userId, role) => {
    axios.delete(`/skoolhub/deleteUser/${userId}/${role}`)
      .then((response) => {
        console.log(response);
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
          Name:
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>

        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>

        <label htmlFor="roles">
          Role:
          <select
            id="roles"
            name="roles"
            value={selectedRole}
            onChange={handleRoleChange}
            required
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.role}</option>
            ))}
          </select>
        </label>

        <button type="submit">Create User</button>
      </form>

      <div>
        <h2>Current Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>E-mail</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role_id}</td>
                <td>
                  <button type="button" onClick={() => handleDeleteClick(user.id, user.role_id)}>
                    DELETE USER
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreateUser;
