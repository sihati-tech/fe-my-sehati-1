import React from "react";
import "./HeaderComponent.scss";
import { Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import UserService from "../../../services/UserService";
import LoginPng from '../../../assets/images/heart.png';


export default function HeaderComponent() {
  const history = useHistory();

  function logOut() {
    UserService.doLogout()
    history.push('/');
  }
  return (
      <div className="container-header">
      <Navbar collapseOnSelect expand="lg" variant="dark">
      <Navbar.Brand href="#home">
        <img
          src={LoginPng}
          alt=""
          width="30"
          height="30"
          className="d-inline-block align-top" />
        My Sihati
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/patient/dashboard">Accueil</Nav.Link>
          <Nav.Link href="/patient/profile">Mon compte</Nav.Link>
          {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav>
          <Nav.Link href="/patient/pratique">Info pratiques</Nav.Link>
          <Nav.Link eventKey={2} onClick={logOut}>
            Déconnexion
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      </div>
  );
}