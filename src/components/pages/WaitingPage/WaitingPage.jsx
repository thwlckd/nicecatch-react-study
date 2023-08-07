import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WaitingRoom = () => {
  const usernameRef = useRef();
  const roomRef = useRef();
  const navigate = useNavigate();
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const getRooms = async () => {
      const res = await axios.get('http://localhost:3001/api/rooms');
      const newRooms = res.data.map(({ id, size }) => ({ id, size }));
      setRooms(newRooms);
    };
    getRooms();
  }, []);

  const handleSubmit = () => {
    if (usernameRef.current.value !== '' && roomRef.current.value !== '') {
      navigate('/game', {
        state: {
          username: usernameRef.current.value,
          room: roomRef.current.value,
        },
      });
    }
  };
  return (
    <>
      <h3>Create A Game</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" ref={usernameRef} />
        <input type="text" placeholder="Room ID" ref={roomRef} />
        <button>Join A Game</button>
      </form>
      {rooms && (
        <ul>
          <h3>Room List</h3>
          {rooms.map((room, index) => (
            <li
              key={index.toString()}
            >{`room id: ${room.id} / room size: ${room.size}`}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default WaitingRoom;
