import ContactCard from "./ContactCard"
import {Link} from "react-router-dom";
import { useRef } from "react";

export default function ContactList({contacts, getContactId, term, searchKeyword}) {
  const inputEl = useRef("");

  function deleteContactHandler(id) {
    getContactId(id);
  }

  const renderContactList = contacts.map((contact) => {
    return (
      <ContactCard contact={contact} clickHandler={deleteContactHandler} key={contact.id} />
    )
  })

  function getSearchTerm() {
    // Instead of using useRef, we can also use e.target.value
    // console.log(inputEl.current.value);
    searchKeyword(inputEl.current.value);
  }

  return (
    <div className="main">
      <h2 style={{marginTop: 50}}>Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input ref={inputEl} type="text" placeholder="Search Contacts" className="prompt" value={term} onChange={getSearchTerm} />
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">
        {renderContactList.length > 0 ? renderContactList : "No Contacts available"}
      </div>
    </div>
  )
}