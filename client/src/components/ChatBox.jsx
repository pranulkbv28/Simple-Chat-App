// import React from 'react';
import { useEffect, useState } from "react";
import styles from "./chatbox.module.css";

const ChatBox = ({ socket, username, roomID }) => {
  let [currentMessage, setCurrentMessage] = useState("");

  const now = new Date(Date.now());
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: roomID,
        author: username,
        message: currentMessage,
        time: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      await socket.emit("send_message", messageData);

      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div className={styles.body}>
      <div className={styles.chatHeader}>
        <p>Live Chat</p>
      </div>
      <div className={styles.chatBody}></div>
      <div className={styles.chatFooter}>
        <input
          type="text"
          name="message"
          id="message"
          placeholder="Message"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button onClick={sendMessage}>&#9658;</button> {/* send icon */}
      </div>
    </div>
  );
};

export default ChatBox;
