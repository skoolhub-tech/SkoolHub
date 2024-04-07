import React from 'react';
import PropTypes from 'prop-types';

function DraftEmailButton({ setEmailModal }) {
  // clicking this button will open the email modal
  return (
    <button type="button" onClick={() => setEmailModal(true)}>Draft Email</button>
  );
}

DraftEmailButton.propTypes = {
  setEmailModal: PropTypes.func.isRequired,
};

export default DraftEmailButton;
