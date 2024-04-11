import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import '../styles.css';
/*
example usage:
const [notify, setNotify] = useState(false);
const [message, setMessage] = useState('');
const [color, setColor] = useState(0);
const [icon, setIcon] = useState(null);

function showNotificationTimer() {
    setNotify(true);
    setTimeout(() => {
      setNotify(false);
    }, 2000);
  }

  for the action thats returning a success or failure
    set message with the message you want to display
    set color to 0 for success, 1 for failure
    set icon to the icon you want to display
      setIcon(<MdOutlineMarkEmailRead />)
    showNotificationTimer();

{notify && (
  <Notify
    message={message}
    color={color}
    icon={icon}
  />
)}
*/

function Notify({ message, color, icon }) {
  return (
    <motion.div
      className={color === 0 ? 'notifyModalGreen' : 'notifyModalRed'}
      initial={{ opacity: 0, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      exit={{ scale: 0.5 }}
    >
      <div className="notifyModalContent">
        {icon && icon}
        <p>{message}</p>
      </div>
    </motion.div>
  );
}

Notify.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.number.isRequired,
  icon: PropTypes.node,
};

Notify.defaultProps = {
  icon: null,
};

export default Notify;
