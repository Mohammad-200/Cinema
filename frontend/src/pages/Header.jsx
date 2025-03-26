import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Button from "../components/Button";
import ChatPanel from "../components/ChatPanel";
import NavListItem from "../components/NavListItem";
import Search from "../components/Search";
import UserName from "../components/UserName";
import { ChatState } from "../Context/ChatProvider";
import navListData from "../data/navListData";
import { LiaSignInAltSolid } from "react-icons/lia";
import "./header.css";

function Header() {
  const navRaf = useRef(null);
  const { user, logout } = ChatState();

  const showNavbar = () => {
    navRaf.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <header>
        <a href="/Cinema" className="logo">
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
            icon={<LiaSignInAltSolid className="login-icon" />}
            name="Login"
            to="/login"
          />
        )}

        <button
          style={{ color: "white" }}
          className="nav-btn"
          onClick={showNavbar}
        >
          <FaBars />
        </button>
      </header>
    </>
  );
}

export default Header;
