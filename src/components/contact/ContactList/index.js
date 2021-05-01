import ContactCell from './ContactCell/index';
import React from 'react';

const ContactList = ({
  contactList = [],
  addFavourite,
  onContactSelect,
  onSaveContact,
  onDeleteContact,
}) => {
  return (
    <div className="gx-contact-main-content">
      {contactList.map((contact, index) => (
        <ContactCell
          key={index}
          contact={contact}
          onDeleteContact={onDeleteContact}
          onSaveContact={onSaveContact}
          addFavourite={addFavourite}
          onContactSelect={onContactSelect}
        />
      ))}
    </div>
  );
};

export default ContactList;
