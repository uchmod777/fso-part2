import { useEffect, useState } from 'react';
import contactService from './services/contacts';
import axios from 'axios';
import ContactFilter from './components/ContactFilter';
import ContactForm from './components/ContactForm';
import ContactRenderer from './components/ContactRenderer';


const App = () => {
  const [lastId, setLastId] = useState(0);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook.`)
      return;
    }

    if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already assigned to another person in the phonebook`);
      return;
    }

    const id = (lastId + 1).toString();
    const newPerson = { name: newName, number: newNumber, id: id };

    contactService
      .addContact(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setLastId(parseInt(returnedPerson.id));
        setNewName('');
        setNewNumber('');
      });
  }

  const deletePerson = (e) => {
    window.confirm(`Delete ${e.target.name}`);
    contactService
      .deleteContact(e.target.id)
      .then(response => {
        getPersons();
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
      <ContactFilter nameFilter={nameFilter} handleOnNameFilterChange={handleOnNameFilterChange} />
      <h3>Add a new contact</h3>
      <ContactForm addPerson={addPerson} newName={newName} handleOnNameChange={handleOnNameChange} newNumber={newNumber} handleOnNumberChange={handleOnNumberChange}/>
      <h3>Numbers</h3>
      <ContactRenderer persons={persons} nameFilter={nameFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App