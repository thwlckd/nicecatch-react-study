import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickName, setNickName] = useState('');
  const [isEmailValid, setIsEamilValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigator = useNavigate();
  const emailRegular =
    /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const passwordRegular = /^[A-Za-z0-9]{8,20}$/;

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
    if (emailRegular.test(email)) setIsEamilValid(true);
    else setIsEamilValid(false);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
    if (passwordRegular.test(password)) setIsPasswordValid(true);
    else setIsPasswordValid(false);
  };

  const handleChangeNickName = (e) => {
    setNickName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        email,
        password,
        nickName,
        image: 'tiger',
      };
      await axios.post('http://localhost:3001/api/auth/sign-up', formData);
      navigator('/');
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <>
      <h3>SignUp</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="email"
            type="email"
            required
            value={email}
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <input
            placeholder="password"
            type="password"
            required
            value={password}
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <input
            placeholder="nickName"
            type="text"
            required
            value={nickName}
            onChange={handleChangeNickName}
          />
        </div>
        <div>
          <input
            placeholder="image"
            type="text"
            required
            defaultValue="tiger"
            readOnly
          />
        </div>
        <button type="submit">signup</button>
        <br />
        {!isEmailValid && <span>email error</span>}
        <br />
        {!isPasswordValid && <span>password error</span>}
        <br />
      </form>
    </>
  );
};

export default SignUp;
