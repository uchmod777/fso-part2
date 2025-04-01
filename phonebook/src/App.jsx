import { useState } from 'react'
import ContactFilter from './components/ContactFilter'
import ContactForm from './components/ContactForm'
import ContactRenderer from './components/ContactRenderer'

const App = () => {
  const [lastId, setLastId] = useState(0);
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: '(320) 545-9087'}
  ]);
  const [newName, setNewName] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');

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

    const id = lastId + 1;
    const people = persons.concat({ id: id, name: newName, number: newNumber});
    setLastId(id);
    setPersons(people);
    setNewName('');
    setNewNumber('');
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
      <ContactRenderer persons={persons} nameFilter={nameFilter} />
    </div>
  )
}

export default App