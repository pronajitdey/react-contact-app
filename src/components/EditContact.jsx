import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

export default function EditContact({updateContactHandler}) {
  const location = useLocation();
  const {contact} = location.state;

  const [name, setName] = useState(contact.name)
  const [email, setEmail] = useState(contact.email)
  const navigate = useNavigate();

  const update = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("All the fields are mandatory!");
      return;
    }
    updateContactHandler({id: contact.id, name: name, email: email});
    setName("");
    setEmail("");
    navigate("/");
    // console.log({name: name, email: email});
  }

  return (
    <div className="ui main">
      <h2 style={{marginTop: 50}}>Add Contact</h2>
      <form className="ui form" onSubmit={(e) => update(e)}>
        <div className="field">
          <label>Name</label>
          <input type="text" name="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="text" name="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  )
}