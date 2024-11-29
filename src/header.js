import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {

  const redirectToLandingPage = () =>{
    window.location.href = "https://mgagan544.github.io/TVS_ChatBot/sample.html";
  }
  return (
    <header className="header">
      <h1>Ceperia Chat</h1>
      <button className="theme-toggle" onClick={redirectToLandingPage}>HOME</button>

      {/* <div style={{cursor:"pointer"}}>🌞</div> */}
    </header>
  );
}

export default Header;
