import NavListItem from "../components/NavListItem";
import navListData from "../data/navListData";
import Search from "../components/Search";
import Button from "../components/Button";
import ChatPanel from "../components/ChatPanel";
import { ChatState } from "../Context/ChatProvider";
import "./header.css";
import UserName from "../components/UserName";

function Header() {
  const { user, logout } = ChatState();

  return (
    <>
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
        {user ? (
          <UserName user={user} logout={logout} />
        ) : (
          <Button
            icon={<ion-icon name="log-in" />}
            name="Sign Up"
            to="/signup"
          />
        )}
      </header>
    </>
  );
}

export default Header;
