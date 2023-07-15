import {React, useState} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getStorage, setStorage } from "../utils/localStorage";

function ReactComponent() {
  const isLoggedIn = ((getStorage("user") === false)) ? false : true;
  const usernameHello = "Hello, " + getStorage("user").login;
  const sellingLink = "/bought/" + getStorage("user").id;
  const [searchInput, setSearchInput] = useState('');

  async function onSearchClicked(e) {
    e.preventDefault();
    document.location.href = "/search/" + searchInput;
  }

  function onSearchChanged(event) {
    setSearchInput(event.target.value);
  }

  function onLogoutClick() {
    setStorage("user", false);
    document.location.href = "/";
  }
  
  function onColorClick() {
    if (document.body.style.background === 'goldenrod')
      document.body.style = 'background: white;';
    else
      document.body.style = 'background: goldenrod;';
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Shop</Navbar.Brand>
        <title class='title' hidden={true}>Navbar</title>
        <form className="searchInput" onSubmit={onSearchClicked}>
          <input type="text" id="searchInput" placeholder="Search auction by title" onChange={onSearchChanged}/>
          <button className="searchButton" type="submit" alt="Submit"><label htmlFor="searchInput">Submit</label></button>
        </form>
        <Nav>
          {!isLoggedIn && 
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/login">Login</NavDropdown.Item>
            <NavDropdown.Item href="/register">Register</NavDropdown.Item>
          </NavDropdown>}
          {isLoggedIn && 
          <NavDropdown title={usernameHello} id="basic-nav-dropdown">
            <NavDropdown.Item href="/create">Create auction</NavDropdown.Item>
            <NavDropdown.Item href={sellingLink}>Bought auctions</NavDropdown.Item>
            <NavDropdown.Item onClick={onLogoutClick}>Logout</NavDropdown.Item>
          </NavDropdown>}
          <Nav.Link onClick={onColorClick}>Change site color</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ReactComponent;
