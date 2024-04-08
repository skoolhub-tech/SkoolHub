import React, { useState } from 'react';
import AssignStudentClass from './AssignStudentClass';
import CreateUser from './CreateUser';
import CreateClass from './CreateClass';

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
    <div>
      {/* Your code here */}
      <button type="button" onClick={handleUsersButtonClick}>Users</button>
      <button type="button" onClick={handleClassesButtonClick}>Classes</button>
      <AssignStudentClass />

      {/* Users Modal */}
      {showUsersModal && (
        <CreateUser exitModal={exitModal} />
      )}

      {/* Classes Modal */}
      {showClassesModal && (
        <CreateClass exitModal={exitModal} />
      )}
    </div>
  );
}

export default Admin;
