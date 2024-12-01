import React, { useEffect, useState } from "react";
import "./chatControl.css";
import { IoMdClose } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import { useChatToggle } from "../Context/ChatToggleContext";
import { toast } from "react-toastify";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../Context/ChatProvider";
import { BarLoader } from "react-spinners";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { io } from "socket.io-client";

const ENDPOINT = "http://localhost:3001";
let socket;

function ChatControl() {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, toggleChat } = useChatToggle();
  const [socketConnection, setSocketConnection] = useState(false);

  const { user } = ChatState();

  const sendMessage = async () => {
    const token = localStorage.getItem("userInfo");

    try {
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });
      setNewMessage("");
      const data = await response.json();

      //Emit the new message to the server
      socket.emit("new message", data);

      setMessages([...messages, data]);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  useEffect(() => {
    const token = localStorage.getItem("userInfo");
    if (user) {
      setIsLoading(true);
      const fetchMessages = async () => {
        try {
          const response = await fetch("/chat", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await response.json();
          setMessages(data);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error(error.messages, {
            position: "top-right",
            autoClose: 5000,
          });
        }
      };
      fetchMessages();
    }
  }, [toggleChat]);

  useEffect(() => {
    if (user) {
      socket = io(ENDPOINT);
      socket.emit("setup", user);
      socket.on("connection", () => setSocketConnection(true));

      socket.on("message received", (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [user]);

  if (!user) return null;

  return (
    <div className={`chat-control ${isOpen ? "open" : ""}`}>
      <div className="chat-container">
        <div className="chat-head">
          <h2>
            <span className="cinema">Cinema</span> chat:
          </h2>
          <button className="close-btn" onClick={toggleChat}>
            <IoMdClose />
          </button>
        </div>

        {isLoading ? (
          <div className="spinner-overlay">
            <BarLoader color={"#36D7B7"} />
          </div>
        ) : (
          <div className="chat-messages">
            <div className="messages-container">
              <ScrollableFeed>
                {messages &&
                  messages.map((m) => (
                    <div
                      className={`message ${
                        m.sender._id === user.id
                          ? "current-sender"
                          : "other-sender"
                      }`}
                      key={m._id}
                    >
                      {m.sender._id !== user.id && (
                        <div className="user-image">
                          <img
                            src={m.sender.pic}
                            alt={m.sender.userName}
                            data-tooltip-id={`tooltip-${m._id}`}
                            data-tooltip-content={m.sender.userName}
                          ></img>
                          <ReactTooltip
                            id={`tooltip-${m._id}`}
                            place="top"
                            type="dark"
                            effect="float"
                            className="custom-tooltip"
                          />
                        </div>
                      )}
                      <span>{m.content}</span>
                    </div>
                  ))}
              </ScrollableFeed>
            </div>
          </div>
        )}

        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            className="chat-input"
            onChange={typingHandler}
            value={newMessage}
          />
          <button className="send-btn" onClick={sendMessage}>
            <BsSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatControl;
