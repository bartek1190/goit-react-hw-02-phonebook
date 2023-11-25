import React, { Component } from 'react';
import shortid from 'shortid';
import s from './App.module.css';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm';
import Filter from './Filter';
import Notification from './Notification';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    const isAdded = this.state.contacts.some(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (isAdded) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = todoId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== todoId),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    const contactsLength = contacts.length;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 18,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={s.titleContacts}>Contacts</h2>
        <div className={s.allContacts}>All contacts: {contactsLength}</div>

        {contactsLength > 0 ? (
          <>
            <Filter value={filter} onChange={this.changeFilter} />
            <ContactList
              contacts={visibleContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        ) : (
          <Notification message="Contact list is empty" />
        )}
      </div>
    );
  }
}

export default App;
