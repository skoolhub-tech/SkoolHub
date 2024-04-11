import React, { useState } from 'react';
import AssignStudentClass from './AssignStudentClass';
import CreateUser from './CreateUser';
import CreateClass from './CreateClass';
import './admin.css';

function Admin() {
  const [showUsersModal, setShowUsersModal] = useState(false);
  const [showClassesModal, setShowClassesModal] = useState(false);

  const handleUsersButtonClick = () => {
    setShowUsersModal(true);
  };

  const handleClassesButtonClick = () => {
    setShowClassesModal(true);
  };

  const exitModal = () => {
    setShowUsersModal(false);
    setShowClassesModal(false);
  };

  return (
    <div className="admin-container">
      <div className="admin-create-buttons">
        <button type="button" onClick={handleUsersButtonClick}>Users</button>
        <button type="button" onClick={handleClassesButtonClick}>Classes</button>
      </div>
      <AssignStudentClass />
      {showUsersModal && <CreateUser exitModal={exitModal} />}
      {showClassesModal && <CreateClass exitModal={exitModal} />}
    </div>
  );
}

export default Admin;
