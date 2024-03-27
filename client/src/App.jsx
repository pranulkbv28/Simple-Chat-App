import { useState } from "react";
import io from "socket.io-client";
import ChatBox from "./components/ChatBox";
import styles from "./app.module.css";

const socket = io.connect(import.meta.env.VITE_APP_SERVER_URL);

function App() {
  let [username, setUsername] = useState("");
  let [roomID, setRoomId] = useState("");

  const joinRoom = () => {
    if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
    }
  };

  return (
    <div className={styles.body}>
      <h3>Join the Chats</h3>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        name="roomID"
        id="roomID"
        placeholder="Enter Room ID"
        value={roomID}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={joinRoom}>Join A Room</button>

      <ChatBox socket={socket} username={username} roomID={roomID} />
    </div>
  );
}

export default App;
