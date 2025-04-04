const ContactRenderer = ({ persons, nameFilter, deletePerson }) => {
    return (
        <>
        <ul>
        {
          (() => {
            const contacts = nameFilter
              ? persons.filter((person) => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
              : persons;

            return contacts.map((contact) => (
              <li key={contact.id}>
                {contact.name} {' | '} {contact.number}
                <button id={contact.id} name={contact.name} type="button" onClick={deletePerson}>delete</button>
              </li>
            ));
          })()
        }
      </ul>
      </>
    );
}

export default ContactRenderer;