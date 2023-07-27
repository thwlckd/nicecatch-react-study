import { useLocation } from 'react-router-dom';
import Canvas from './Canvas';
import Chat from './Chat';
import io from 'socket.io-client';
import './GamePage.scss';

const GamePage = () => {
  const location = useLocation();
  const { username, room } = location.state;

  const socket = io.connect(
    `${import.meta.env.VITE_HOST}:${import.meta.env.VITE_SERVER_PORT}`,
  );
  socket.emit('join_room', room);

  console.log(`username: ${username} / room: ${room}`);

  return (
    <div className="gamepage-container">
      <div className="canvas-component">
        <Canvas />
      </div>
      <div className="chat-component">
        <Chat socket={socket} username={username} room={room} />
      </div>
    </div>
  );
};

export default GamePage;
