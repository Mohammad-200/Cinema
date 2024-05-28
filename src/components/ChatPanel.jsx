import { IoLogoWechat } from "react-icons/io5";
import "./chatPanel.css";
import "react-toastify/dist/ReactToastify.css";
import { useChatToggle } from "../Context/ChatToggleContext";

function ChatPanel() {
  const { toggleChat } = useChatToggle();

  return (
    <div>
      <div className="chat-button" onClick={toggleChat}>
        <IoLogoWechat />
      </div>
    </div>
  );
}

export default ChatPanel;
