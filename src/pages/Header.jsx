import { useRef } from "react";
import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";
import Search from "../components/Search";
import Button from "../components/Button";
import ChatPanel from "../components/ChatPanel";
import { ChatState } from "../Context/ChatProvider";
import "./header.css";
import UserName from "../components/UserName";
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const navRaf = useRef(null);
  const { user, logout } = ChatState();

  const showNavbar = () => {
    navRaf.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header>
        <a href="#" className="logo">
          Cinema
        </a>
        <ul className="nav" ref={navRaf}>
          {navListData.map((nav) => (
            <NavListItem key={nav._id} nav={nav} />
          ))}
          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </ul>

        <Search />
        <ChatPanel />
        {user ? (
          <UserName user={user} logout={logout} />
        ) : (
          <Button
            icon={<ion-icon name="log-in" />}
            name="Sign Up"
            to="/signup"
          />
        )}
        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </>
  );
}

export default Header;
