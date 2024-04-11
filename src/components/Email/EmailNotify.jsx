import React from 'react';
import { motion } from 'framer-motion';

function EmailNotify() {
  return (

    <div className="emailNotifyModalContent">
      <motion.div
        className="emailNotifyModal"
        initial={{ opacity: 0, scale: 0.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        exit={{ scale: 0.5 }}
      >
        <p>Email Sent!</p>
      </motion.div>
    </div>
  );
}

export default EmailNotify;
