import { Routes, Route } from 'react-router-dom';
import Login from './components/pages/LoginPage/LoginPage';
import Layout from './components/atoms/Layout/Layout';
import Game from './components/pages/GamePage/GamePage';
import SignUp from './components/pages/SignUpPage/SignUpPage';
import WaitingRoom from './components/pages/WaitingPage/WaitingPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/wating-room" element={<WaitingRoom />} />
        <Route path="/game" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
