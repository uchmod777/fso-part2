const ContactForm = ({ addPerson, newName, handleOnNameChange, newNumber, handleOnNumberChange }) => {
    return (
        <form onSubmit={addPerson}>
            <div>
            name: <input value={String(newName)} onChange={handleOnNameChange} />
            </div>
            <div>
            number: <input value={String(newNumber)} onChange={handleOnNumberChange} />
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    );
}

export default ContactForm;