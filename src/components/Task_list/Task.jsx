import React from 'react';
import { motion } from 'framer-motion';
import TaskCalendar from './Calendar';
import './task.css';

function Task() {
  return (
    <motion.div
      className="task-container"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      transition={{ ease: 'easeInOut', duration: 0.7 }}
    >
      <h1 className="tasks-header">
        Events & Tasks
      </h1>
      <div className="calendar-container">
        <TaskCalendar defaultView="month" views={['month', 'week', 'day', 'agenda']} />
      </div>
    </motion.div>
  );
}

export default Task;
