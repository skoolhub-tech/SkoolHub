import React from 'react';
import { motion } from 'framer-motion';
import TaskCalendar from './Calendar';
import './task.css';

function Task() {
  return (
    <motion.div
      className="o"
      initial={{ x: '100%' }}
      animate={{ x: '0%' }}
      transition={{ ease: 'easeInOut', duration: 0.7 }}
    >
      <div className="task-container">
      <h1 className="tasks-header">
        Events & Tasks
      </h1>
      <div className="calendar-container">
        <TaskCalendar defaultView="month" views={['month', 'week', 'day', 'agenda']} />
      </div>
      </div>
    </motion.div>
  );
}

export default Task;
