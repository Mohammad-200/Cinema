import { useLocation } from "react-router-dom";

const { createContext, useContext, useState, useEffect } = require("react");

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const location = useLocation();

  function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to parse JWT: ", e);
      return null;
    }
  }

  // logout logic
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    setTimeout(() => {
      window.location.reload();
    }, 0);
  };

  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if (token && token !== user?.token) {
      const decodedToken = parseJwt(token);
      setUser(decodedToken);
    }
  }, [location]);

  return (
    <ChatContext.Provider value={{ user, setUser, logout }}>
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
