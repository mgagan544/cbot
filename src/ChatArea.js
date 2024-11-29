import React from "react";

function ChatArea({ messages }) {
    console.log("messgaes", messages)
  return (
    <div className="chat-area">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "user" ? "user-message" :  "bot-message"
            }`}
          >
           {msg.sender === "audio" ? (
            <audio controls src={msg.text} />
          ) : (
            <span>{msg.text}</span>
          )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatArea;
