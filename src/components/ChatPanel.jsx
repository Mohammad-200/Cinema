// ChatControl.js
import React, { useState } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import "./chatPanel.css";
import { ChatState } from "../Context/ChatProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatPanel() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { user } = ChatState();

  const toggleChat = () => {
    if (user) {
      setChatOpen(!chatOpen);
    } else {
      toast.error("You need to sign up first to access the public chat", {
        autoClose: 5000,
        position: "bottom-center",
        toastId: "user-not-signed-in-error",
      });
    }
  };

  const sendMessage = () => {
    console.log(message);

    setMessage("");
  };

  return (
    <div>
      <div className="chat-button" onClick={toggleChat}>
        <IoLogoWechat />
      </div>
      {chatOpen && (
        <div className={chatOpen ? "chat-panel open" : "chat-panel"}>
          <div className="chat-header">
            <h2>
              <span className="cinema">Cinema</span> chat:
            </h2>
            <button className="close-btn" onClick={toggleChat}>
              <IoMdClose />
            </button>
          </div>
          <div className="messages-section">
            {/* Message components go here */}
          </div>
          <div className="send-message-sec">
            <input
              type="text"
              placeholder="Type your message..."
              className="chat-input"
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="send-btn" onClick={sendMessage}>
              <BsSend />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatPanel;
