import { useState } from 'react'

const App = () => {
  const [lastId, setLastId] = useState(0);
  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas' }
  ]);
  const [newName, setNewName] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const id = lastId + 1;
    const people = persons.concat({ id: id, name: newName });
    setLastId(id);
    setPersons(people);
    setNewName('');
  }

  const handleOnChange = (e) => {
    setNewName(e.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <li key={person.id}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App