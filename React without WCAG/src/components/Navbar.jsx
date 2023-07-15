import {React} from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { getStorage, setStorage } from "../utils/localStorage";

function ReactComponent() {
  const isLoggedIn = ((getStorage("user") === false)) ? false : true;
  const usernameHello = "Hello, " + getStorage("user").login;
  const sellingLink = "/bought/" + getStorage("user").id;

  function onLogoutClick(_event) {
    setStorage("user", false);
    document.location.href = "/";
  }
  
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Shop</Navbar.Brand>
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
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ReactComponent;
