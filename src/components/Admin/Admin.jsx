import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    <motion.div
      className="admin-container"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      transition={{ ease: 'easeInOut', duration: 0.7 }}
    >
      {/* Your code here */}
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
