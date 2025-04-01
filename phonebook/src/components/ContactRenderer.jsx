const ContactRenderer = ({ persons, nameFilter }) => {
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
              </li>
            ));
          })()
        }
      </ul>
      </>
    );
}

export default ContactRenderer;