import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Home = () => {
  const usernameRef = useRef();
  const roomRef = useRef();
  const navigate = useNavigate();

  const handleClick = () => {
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
      <h1>Hello! Nice Catch :-)</h1>
      <h3>Join A Game</h3>
      <input type="text" placeholder="Name" ref={usernameRef} />
      <input type="text" placeholder="Room ID" ref={roomRef} />
      <button onClick={handleClick}>Join A Game</button>
    </>
  );
};
export default Home;
