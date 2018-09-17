import React from 'react';
import Contact from './contact';
import PropsTypes from 'prop-types';

// Validatin the props
ContactList.propsTypes = {
  name: PropsTypes.string,
  email: PropsTypes.string,
}

function ContactList(props) {
  return (
    <div>
    <h3>Bellow a Contact List Application using React and Rest-API:</h3>

      {props.contacts.map(c =>
        <Contact
          key={"contact_" + c.id}
          id={c.id}
          name={c.name}
          email={c.email}
        />
      )}
    </div>
  );
}

export default ContactList;