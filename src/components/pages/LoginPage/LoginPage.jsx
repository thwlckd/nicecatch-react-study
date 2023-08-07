import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true; // withCredentials 전역 설정

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEamilValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigator = useNavigate();

  const emailRegular =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordRegular = /^[A-Za-z0-9]{8,20}$/;

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/sign-in', {
        email,
        password,
      });
      navigator('/wating-room');
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/auth/sign-out');
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (emailRegular.test(email)) setIsEamilValid(true);
    else setIsEamilValid(false);
  };

  const handleChangepassword = (e) => {
    setPassword(e.target.value);
    if (passwordRegular.test(password)) setIsPasswordValid(true);
    else setIsPasswordValid(false);
  };

  const handleClickSignUp = () => {
    navigator('/sign-up');
  };

  return (
    <>
      <h1>Hello! Nice Catch :-)</h1>
      <h3>Login</h3>
      <form onSubmit={handleSubmitLogin}>
        <input
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          placeholder="password"
          required
          value={password}
          onChange={handleChangepassword}
        />
        <button type="submit">Login</button>
        <button type="button" onClick={handleClickLogout}>
          Logout
        </button>
        <button type="button" onClick={handleClickSignUp}>
          SignUp
        </button>
        <br />
        {!isEmailValid && <span>email error</span>}
        <br />
        {!isPasswordValid && <span>password error</span>}
        <br />
      </form>
    </>
  );
};
export default Login;
