import user from "../images/user.png";
import {Link} from "react-router-dom";

export default function ContactCard({contact, clickHandler}) {
  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link to={`/contact/${contact.id}`} state={{contact: contact}}>
          <div className="header">{contact.name}</div>
          <div>{contact.email}</div>
        </Link>
      </div>
      <i className="trash alternate outline icon" 
      style={{color: "red", marginTop: "7px", marginLeft: "10"}}
        onClick={() => clickHandler(contact.id)}
      />
      <Link to={`/edit`} state={{contact: contact}}>
        <i className="edit alternate outline icon" 
        style={{color: "blue", marginTop: "7px"}}
        />
      </Link>
    </div>
  )
}