import user from "../images/user.jpg";
import { Link, useLocation } from "react-router-dom";

export default function ContactDetails() {
  const location = useLocation();
  const {contact} = location.state;
  return (
    <div className="main" style={{ marginTop: 50 }}>
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{contact.name}</div>
          <div className="description">{contact.email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">Back to Contact List</button>
        </Link>
      </div>
    </div>
  )
}