import React from 'react';
import './ErrorMessages.css';
import PropTypes from 'prop-types'

const ErrorMessages = (props) => {
  if (!props.messages.length) {
    return null;
  }
  return (
    <div className="ErrorMessages__root">
      {props.messages.map((msg, idx) => (
        <div
          key={idx}
          className="ErrorMessages__item">
          {msg}
        </div>
      ))}
    </div>
  );
}

ErrorMessages.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ErrorMessages;
