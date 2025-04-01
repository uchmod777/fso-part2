const ContactFilter = ({ nameFilter, handleOnNameFilterChange }) => {
    return (
        <div>
          filter shown by name: <input value={nameFilter} onChange={handleOnNameFilterChange} />
        </div>
    );
}

export default ContactFilter;