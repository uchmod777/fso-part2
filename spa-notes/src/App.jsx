import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);

  // Update (PUT)
  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote));
      })
      .catch(error => {
        alert(
          `the note '${note.content} was already deleted from the server`
        )
        setNotes(notes.filter(note => note.id !== id))
      });
  }

  // Read (GET)
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      });
  }, []);

  // Create (POST)
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote));
        setNewNote('');
      });
  }

  const handleShowFilter = (e) => {
    if (e.target.innerText === "show all") {
      setShowAll(true);
    } else {
      setShowAll(false);
    }
  }

  const renderAllNotes = () => {
    return (
      <ul>
        {notes.map((note) => {
          return <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        })}
      </ul>
    )
  }

  const renderImportantNotes = () => {
    const importantNotes = notes.filter(note => note.important === true);
    return (
      <ul>
      {importantNotes.map((importantNote) => {
        return <Note key={importantNote.id} note={importantNote} toggleImportance={() => toggleImportanceOf(importantNote.id)}/>
      })}
    </ul>
    )
  }


  return (
    <div>
      <h1>Notes</h1>
      {notes.length === 0 && <p>No notes found</p>}
      {showAll ? renderAllNotes() : renderImportantNotes()}
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e) => setNewNote(e.target.value)} />
        <button type="submit">Add Note</button>
        <button type="button" onClick={handleShowFilter}>{showAll ? "show important" : "show all"}</button>
      </form>
    </div>
  );
};

export default App;
