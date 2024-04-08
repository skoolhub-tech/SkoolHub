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

  return (
    <div>
      {/* Your code here */}
      <button type="button" onClick={handleUsersButtonClick}>Users</button>
      <button type="button" onClick={handleClassesButtonClick}>Classes</button>
      <AssignStudentClass />

      {/* Users Modal */}
      {showUsersModal && (
        <CreateUser />
      )}

      {/* Classes Modal */}
      {showClassesModal && (
        <CreateClass />
      )}
    </div>
  );
}


export default Admin;
