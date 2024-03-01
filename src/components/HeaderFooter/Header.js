import React from "react";
import farmsimple from "../../images/logo.jpg";
import "./header.css";
import {Trans} from 'react-i18next';

export default function Header() {
  let data = JSON.parse(localStorage.getItem('User'));
    const [db, setDb] = React.useState(data);
  
const logout = () => {
  localStorage.removeItem('User');
  window.location.href = "/Login";
};
  return (
    <div className="header">
      <img className="main-logo" src={farmsimple} width="50" height="50" />
      <div class="logoName" style={{ color: "rgb(79, 79, 79)" }}>
        <b>GFS</b> Trace
      </div>
      <div className="spacer"></div>
      <span className="userDetails">{db.data[0].user_firstname+" "+db.data[0].user_lastname}</span> |
      
     
      <button className="logout" onClick={logout}><Trans i18nKey="header.logout"> Logout
        </Trans></button>
    </div>
  );
}
