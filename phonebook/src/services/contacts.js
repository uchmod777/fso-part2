import axios from 'axios';
const baseUrl = 'http://localhost:3001/persons';

const getContacts = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const addContact = (newContact) => {
    const request = axios.post(baseUrl, newContact);
    return request.then(response => response.data);
}

const updatePhoneNumber = (id, newContact) => {
    const request = axios.put(`${baseUrl}/${id}`, newContact);
    return request.then(response => response.data);
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

export default { getContacts, addContact, updatePhoneNumber, deleteContact };