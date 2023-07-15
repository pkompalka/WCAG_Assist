import {React, useState} from "react";
import Navbar from '../components/Navbar'
import './Register.css';
import { userRegister } from "../api/UserAPI";
import { setStorage } from "../utils/localStorage";

function Register() {  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [street, setStreet] = useState('')
  const [postcode, setPostcode] = useState('')
  const [city, setCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [registerError, setRegisterError] = useState('')
  const [checkboxState, setCheckboxState] = useState()

  async function onRegisterClicked(e) {
    e.preventDefault();
    setRegisterError('');
    if (!checkboxState) {
      setRegisterError("Agree to Terms & Conditions to register");
      return;
    }
    if (password === passwordRepeat) {
      setRegisterError("Passwords are different");
      return;
    }
    setIsLoading(true);
    try {
      const registerParams = {
        Login: username,
        Password: password,
        Name: name,
        Surname: surname,
        Street: street,
        Postcode: postcode,
        City: city,
        Email: email
      };
      const userParameters = await userRegister(registerParams);
      setStorage("user", userParameters);
      document.location.href = "/";
    } catch {
      setRegisterError("Wrong username or password");
    } finally {
      setIsLoading(false);
    }
  }
  
  function onEmailChanged(event) {
    setEmail(event.target.value);
  }
  
  function onUsernameChanged(event) {
    setUsername(event.target.value);
  }

  function onPasswordChanged(event) {
    setPassword(event.target.value);
  }

  function onPasswordRepeatChanged(event) {
    setPasswordRepeat(event.target.value);
  }

  function onNameChanged(event) {
    setName(event.target.value);
  }

  function onSurnameChanged(event) {
    setSurname(event.target.value);
  }

  function onStreetChanged(event) {
    setStreet(event.target.value);
  }

  function onPostcodeChanged(event) {
    setPostcode(event.target.value);
  }

  function onCityChanged(event) {
    setCity(event.target.value);
  }
  
  function onCheckboxChange(event) {
    setCheckboxState(event.target.value);
  }

  return (
    <div>
      <Navbar/>
      <form onSubmit={onRegisterClicked}>
        <div className='registerContainer'>
          <div className='flexContainer'>
            <title className='title'>Register</title>
            <label className="registerLabel" htmlFor="email"><b>Email:</b></label>
            <input className="registerInput" id="email" type="email" placeholder="Enter email" onChange={onEmailChanged} required/>
            <label className="registerLabel" htmlFor="username"><b>Login:</b></label>
            <input className="registerInput" id="username" type="text" placeholder="Enter username" onChange={onUsernameChanged} required/>
            <label className="registerLabel" htmlFor="password"><b>Password:</b></label>
            <input className="registerInput" id="password" type="password" placeholder="Enter password" onChange={onPasswordChanged} required/>
            <label className="registerLabel" htmlFor="passwordRepeat"><b>Repeat Password:</b></label>
            <input className="registerInput" id="passwordRepeat" type="password" placeholder="Repeat password" onChange={onPasswordRepeatChanged} required/>
          </div>
          <div className='flexContainer'>
            <label className="registerLabel" htmlFor="nameInput"><b>Name:</b></label>
            <input className="registerInput" id="nameInput" type="text" placeholder="Enter name" onChange={onNameChanged} required/>
            <label className="registerLabel" htmlFor="surnameInput"><b>Surname:</b></label>
            <input className="registerInput" id="surnameInput" type="text" placeholder="Enter surname" onChange={onSurnameChanged} required/>
            <label className="registerLabel" htmlFor="street"><b>Street:</b></label>
            <input className="registerInput" id="street" type="text" placeholder="Enter street with flat number" onChange={onStreetChanged} required/>
            <label className="registerLabel" htmlFor="postcode"><b>Postcode:</b></label>
            <input className="registerInput" id="postcode" type="text" placeholder="Enter postcode" onChange={onPostcodeChanged} required/>
            <label className="registerLabel" htmlFor="city"><b>City:</b></label>
            <input className="registerInput" id="city" type="text" placeholder="Enter city" onChange={onCityChanged} required/>
          </div>
        </div>
        <div className='submitContainer'> 
          <div className='registerCheckboxContainer'>  
            <input type="checkbox" id="checkboxTerms" onChange={onCheckboxChange}/>
            <label className="registerLabel" htmlFor="checkboxTerms">Do you agree to <a href="/terms" rel="noreferrer" target="_blank">Terms & Conditions</a>?</label>   
          </div>  
          <input className='registerSubmit' type="submit" value="Submit" aria-label="Submit" alt="Submit"/>
          <a className='registerHyperlink' href="/login">Already have an account?</a>
          <a className='registerHyperlink' href="/">Go back to home page</a>
          { isLoading && <p>Registering user....</p>}
          { registerError && <p>{registerError}</p>}
        </div>
      </form>
    </div>
  );
}

export default Register;