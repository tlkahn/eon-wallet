import React from 'react';
import PropTypes from 'prop-types';
import './ConfirmationModal.css';
import {Modal, Button} from 'react-onsenui';

const ConfirmationModal = (props) => {

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      contentLabel="ConfirmationModal"
      >
      <div>
        <Button
          className="ConfirmationModal__button"
          onClick={props.onConfirmClick}>
          {props.confirmText}
        </Button>
        <Button
          className="ConfirmationModal__button"
            onClick={props.onRequestClose}>
            {props.cancelText}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  onConfirmClick: PropTypes.func.isRequired,
  confirmText: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
};

ConfirmationModal.defaultProps = {
  cancelText: 'Cancel',
}
