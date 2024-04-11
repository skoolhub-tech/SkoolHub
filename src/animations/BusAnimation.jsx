import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import busImage from '../../photos/bus.png';

function BusAnimation({ onComplete }) {
  const busVariants = {
    start: { x: '-60vw' },
    end: {
      x: '65vw',
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 1.5 },
    },
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => onComplete(true), 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#858D6F',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
    }}
    >
      <h1 style={{ color: '#FFF', position: 'absolute', top: '10px' }}>SkoolHub</h1>
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '50px',
        backgroundColor: '#333',
        zIndex: 150,
      }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 5px',
        }}
        >
          <div style={{
            width: '20px',
            height: '4px',
            backgroundColor: '#FFBF00',
            borderRadius: '2px',
            borderStyle: 'dashed',
            borderWidth: '1px',
          }}
          />
          <div style={{
            width: '20px',
            height: '4px',
            backgroundColor: '#FFBF00',
            borderRadius: '2px',
            borderStyle: 'dashed',
            borderWidth: '1px',
          }}
          />
          <div style={{
            width: '20px',
            height: '4px',
            backgroundColor: '#FFBF00',
            borderRadius: '2px',
            borderStyle: 'dashed',
            borderWidth: '1px',
          }}
          />
          <div style={{
            width: '20px',
            height: '4px',
            backgroundColor: '#FFBF00',
            borderRadius: '2px',
            borderStyle: 'dashed',
            borderWidth: '1px',
          }}
          />
          <div style={{
            width: '20px',
            height: '4px',
            backgroundColor: '#FFBF00',
            borderRadius: '2px',
            borderStyle: 'dashed',
            borderWidth: '1px',
          }}
          />
          <div style={{
            width: '20px',
            height: '4px',
            backgroundColor: '#FFBF00',
            borderRadius: '2px',
            borderStyle: 'dashed',
            borderWidth: '1px',
          }}
          />
        </div>
      </div>
      <motion.div
        variants={busVariants}
        initial="start"
        animate="end"
        exit="exit"
        style={{
          display: 'inline-block',
          backgroundImage: `url(${busImage})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          width: '300px',
          height: '250px',
          position: 'absolute',
          zIndex: 200,
        }}
      />
    </div>
  );
}

BusAnimation.propTypes = {
  onComplete: PropTypes.func.isRequired,
};

export default BusAnimation;
