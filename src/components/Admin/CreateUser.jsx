import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function CreateUser({ exitModal }) {
  // Your code here
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  const getUsers = () => {
    axios.get('/skoolhub/teachers')
      .then((response) => {
        // console.log('TEACHERS', response.data);
        setTeachers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('/skoolhub/students')
      .then((response) => {
        // console.log('STUDENTS', response.data);
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    axios.get('/skoolhub/admin')
      .then((response) => {
        // console.log('ADMIN', response.data);
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getUsers();
    axios.get('/skoolhub/roles')
      .then((response) => {
        // console.log('ROLES', response.data);
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
        // console.log(response.data);
        setName('');
        setEmail('');
        setSelectedRole('');
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const users = teachers.concat(students, admins)
    .filter((user) => (
      (selectedRoleFilter ? user.role_id == selectedRoleFilter : true)
      && (searchQuery ? user.name.toLowerCase().includes(searchQuery.toLowerCase()) : true)
    ));

  const handleDeleteClick = (userId, role) => {
    axios.delete(`/skoolhub/deleteUser/${userId}/${role}`)
      .then((response) => {
        // console.log(response);
        getUsers();
      })
      .catch((error) => {
        console.error(error);
      });
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
        <button type="button" onClick={exitModal}>X</button>
      <div className="admin-form">

        <form onSubmit={handleSubmit}>
        <h2>Create User</h2>
          <label htmlFor="name">
            Name: {" "}
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
            Email: {" "}
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
            Role: {" "}
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

        </div>
        <div className="admin-create-users">
          <h2>Current Users</h2>
          <div className="">
            <label htmlFor="searchBar">
              Search:
              <input
                type="text"
                id="searchBar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </label>
            <label htmlFor="roleFilter">
              Filter:
              <select
                id="roleFilter"
                value={selectedRoleFilter}
                onChange={(e) => setSelectedRoleFilter(e.target.value)}
              >
                <option value="">All Roles</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.role}</option>
                ))}
              </select>
            </label>
          </div>

          <table className="admin-add-student-table">
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
                  <td>
                    {
                    roles.find((role) => role.id === user.role_id)
                      ? roles.find((role) => role.id === user.role_id).role
                      : 'Role not found'
                  }
                  </td>
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
      </motion.div>

    </div>
  );
}

export default CreateUser;
