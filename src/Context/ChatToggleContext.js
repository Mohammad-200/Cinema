import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { ChatState } from "./ChatProvider";

const ChatToggleContext = createContext();

// we use this function to access the context values
export function useChatToggle() {
  return useContext(ChatToggleContext);
}

export function ChatToggleProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = ChatState();

  const toggleChat = () => {
    if (user) {
      setIsOpen(!isOpen);
    } else {
      toast.error("You need to sign up first to access the public chat", {
        autoClose: 5000,
        position: "bottom-center",
        toastId: "user-not-signed-in-error",
      });
    }
  };

  return (
    <ChatToggleContext.Provider value={{ isOpen, toggleChat }}>
      {children}
    </ChatToggleContext.Provider>
  );
}
