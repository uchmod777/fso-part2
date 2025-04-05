import './css/notification.css';
import { useEffect, useState } from 'react';

import contactService from './services/contacts';

import ContactFilter from './components/ContactFilter';
import ContactForm from './components/ContactForm';
import ContactRenderer from './components/ContactRenderer';
import Notification from './components/Notification';


const App = () => {
  const [lastId, setLastId] = useState(0);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [notification, setNotification] = useState({ message: null, status: false });

  const getPersons = () => {
    contactService
      .getContacts()
      .then(returnedPersons => {
        setPersons(returnedPersons);
        setLastId(parseInt(returnedPersons.slice(-1)[0].id));
      });
  }

  useEffect(getPersons, []);

  const addPerson = (e) => {
    e.preventDefault();

    if (persons.find((person) => person.name === newName && person.number !== newNumber)) {
      const match = persons.find((person) => person.name === newName && person.number !== newNumber)
      window.confirm(`'${match.name}' is already added to the phonebook, update their number?`);
      updatePhoneNumber(match);
    }

    else if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`)
      return;
    }

    else if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already assigned to another person in the phonebook`);
      return;
    } else {
      const id = (lastId + 1).toString();
      const newPerson = { name: newName, number: newNumber, id: id };

      contactService
        .addContact(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setLastId(parseInt(returnedPerson.id));
          setNewName('');
          setNewNumber('');
          setNotification({ message: `Successfully added '${returnedPerson.name}' to the phonebook.`, status: true });
          setTimeout(() => {
            setNotification({ message: null, status: false });
          }, 5000);
        })
        .catch(_error => {
          setNotification({ message: `Failed to add '${returnedPerson.name}' to the phonebook.`, status: false });
          setTimeout(() => {
            setNotification({ message: null, status: false });
          }, 5000);
        });
    }
  }

  const updatePhoneNumber = (person) => {
    const newPerson = { ...person, number: newNumber };
    console.log(newPerson);
    contactService
      .updatePhoneNumber(newPerson.id, newPerson)
      .then(_response => {
        getPersons();
        setNotification({ message: `Successfully updated '${newPerson.name}'s phone number.`, status: true });
        setTimeout(() => {
          setNotification({ message: null, status: false });
        }, 5000);
      })
      .catch(_error => {
        setNotification({ message: `Failed to update '${newPerson.name}'s phone number.`, status: false });
        setTimeout(() => {
          setNotification({ message: null, status: false });
        }, 5000);
      });
  }

  const deletePerson = (e) => {
    window.confirm(`Delete '${e.target.name}'`);
    contactService
      .deleteContact(e.target.id)
      .then(_response => {
        getPersons();
        setNotification({ message: `Successfully deleted '${e.target.name}' from the phonebook.`, status: true });
        setTimeout(() => {
          setNotification({ message: null, status: false });
        }, 5000);
      })
      .catch(_error => {
        setNotification({ message: `Failed to delete '${e.target.name}' from the phonebook.`, status: false });
        setTimeout(() => {
          setNotification({ message: null, status: false });
        }, 5000);
      });
  }

  const handleOnNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  }

  const handleOnNameChange = (e) => {
    setNewName(e.target.value);
  }

  const handleOnNumberChange = (e) => {
    setNewNumber(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} status={notification.status} />
      <ContactFilter nameFilter={nameFilter} handleOnNameFilterChange={handleOnNameFilterChange} />
      <h3>Add a new contact</h3>
      <ContactForm addPerson={addPerson} newName={newName} handleOnNameChange={handleOnNameChange} newNumber={newNumber} handleOnNumberChange={handleOnNumberChange}/>
      <h3>Numbers</h3>
      <ContactRenderer persons={persons} nameFilter={nameFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App