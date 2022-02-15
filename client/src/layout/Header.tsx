import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/auth";
import { useAppDispatch } from "../store";

const NavLinks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const signOut = () => {
    dispatch(logout());
    navigate("/signin");
  };
  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <Nav.Link as={NavLink} to="/">
        Home
      </Nav.Link>
      <Nav.Link onClick={signOut}>
        Sign Out
      </Nav.Link>
    </Nav>
  );
};

const Header = () => {
  return (
    <Navbar collapseOnSelect bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Theta Xi Portal</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar" />
        <Navbar.Collapse aria-label="navbar">
          <NavLinks />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
