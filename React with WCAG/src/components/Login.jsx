import {React, useState} from "react";
import Navbar from '../components/Navbar';
import { userLogin } from "../api/UserAPI";
import './Login.css';
import { setStorage } from "../utils/localStorage";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  async function onLoginClicked(e) {
    e.preventDefault();
    if (!username || !password) {
      setLoginError("No username or password");
      return;
    }
    setIsLoading(true);
    setLoginError('');
    try {
      const loginParams = {
        Login: username,
        Password: password
      };
      const userParameters = await userLogin(loginParams);
      setStorage("user", userParameters);
      document.location.href = "/";
    } catch {
      setLoginError("Wrong username or password");
    } finally {
      setIsLoading(false);
    }
  }

  function onUsernameChanged(event) {
    setUsername(event.target.value);
  }

  function onPasswordChanged(event) {
    setPassword(event.target.value);
  }

  return (
    <div>
      <Navbar />
      <form className='loginContainer' onSubmit={onLoginClicked}>
        <title className='title'>Login</title>
        <label className='loginLabel' htmlFor="loginUsername"><b>Username:</b></label>
        <input className='loginInput' id="loginUsername" placeholder='username' type="text" onChange={onUsernameChanged} required />
        <label className='loginLabel' htmlFor="loginPassword"><b>Password:</b></label>
        <input className='loginInput' id="loginPassword" placeholder='password' type="password" onChange={onPasswordChanged} required />
        <input className='loginSubmit' type="submit" value="Submit" alt="Submit" />
        <a className='loginHyperlink' href="/register">Click to create account</a>
        {isLoading && <p>Logging in....</p>}
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
}

export default Login;