import PropTypes from 'prop-types';
import React from 'react';

// Validatin the props in this component
Contact.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
};

function Contact(props) {
  return (
    <div className="tempo-text-primary">
      <ul>
        <li>ID: {props.id}</li>
        <li>First Name: {props.name}</li>
        <li>Email: {props.email}</li>
      </ul>
    </div>
  );
}

export default Contact;