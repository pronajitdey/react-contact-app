import "./App.css";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { useState, useEffect } from "react";
import {v4} from "uuid";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ContactDetails from "./ContactDetails";
import api from "../api/contacts";
import EditContact from "./EditContact";

export default function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // retrieve contacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  async function addContactHandler(contact) {
    // console.log(contact);
    const request = {
      id: v4(),
      ...contact
    }

    const response = await api.post("/contacts", request);
    setContacts([...contacts, response.data]);
  }

  async function updateContactHandler(contact) {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    // console.log(response.data);
    const {id, name, email} = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? {...response.data} : contact;
    }));
  }

  async function removeContactHandler(id) {
    await api.delete(`/contacts/${id}`)
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  }

  function searchHandler(searchTerm) {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  }

  useEffect(() => {
    // Using Local Storage
  //   const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retrieveContacts) setContacts(retrieveContacts);

    // Use Axios and api (fetch from server)
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />} />
          {/* <Route path="/" render={(props) => (<ContactList {...props} contacts={contacts} getContactId={removeContactHandler}  />)} /> */}
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/edit" element={<EditContact updateContactHandler={updateContactHandler}/>} />
        </Routes>
        {/* <AddContact addContactHandler={addContactHandler}/>
        <ContactList contacts={contacts} getContactId={removeContactHandler}/> */}
      </Router>
    </div>
  );
}