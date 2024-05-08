// Header.js
import React from "react";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";
import Search from "../components/Search";
import Button from "../components/Button";

import "./header.css";
import ChatPanel from "../components/ChatPanel";

function Header() {
  return (
    <header>
      <a href="#" className="logo">
        Cinema
      </a>
      <ul className="nav">
        {navListData.map((nav) => (
          <NavListItem key={nav._id} nav={nav} />
        ))}
      </ul>
      <Search />
      <ChatPanel />
      <Button icon={<ion-icon name="log-in" />} name="Sign Up" to="/signup" />
    </header>
  );
}

export default Header;
