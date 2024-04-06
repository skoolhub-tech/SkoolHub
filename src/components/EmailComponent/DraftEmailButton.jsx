import React, { useState } from 'react';
import PropTypes from 'prop-types';

function DraftEmailButton({ setEmailModal }) {
  return (
    <button type="button" onClick={() => setEmailModal(true)}>Draft Email</button>
  );
}

DraftEmailButton.propTypes = {
  setEmailModal: PropTypes.func.isRequired,
};

export default DraftEmailButton;
