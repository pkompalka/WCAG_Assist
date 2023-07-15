import {React, useState} from "react";
import Navbar from './Navbar';
import { userLogin } from "../api/UserAPI";
import './Login.css';
import { setStorage } from "../utils/localStorage";

function Login() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  async function onLoginClicked(e) {
    e.preventDefault();
    const username = document.getElementById('usernameDiv').innerHTML;
    if (!username || !password) {
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
    } finally {
      setIsLoading(false);
    }
  }

  function onPasswordChanged(event) {
    setPassword(event.target.value);
  }

  return (
    <div>
      <Navbar />
      <form className='loginContainer' onSubmit={onLoginClicked}>
        <img src={require('../img/login.jpg')} />
        <div id='usernameDiv' className='loginLabel' contentEditable={true}>Username</div>
        <label className='loginLabel'><b>Password:</b></label>
        <input className='loginInput' placeholder='password' type="password" onChange={onPasswordChanged} required />
        <input className='loginSubmit' type="submit" value="Submit" />
        <a accessKey="q" className='loginHyperlink' href="/register">Click to create account</a>
        {isLoading && <p>Logging in....</p>}
        {loginError && <p>{loginError}</p>}
      </form>
    </div>
  );
}

export default Login;