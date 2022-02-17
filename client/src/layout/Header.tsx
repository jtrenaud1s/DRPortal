import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../features/auth";
import { User } from "../models/user";
import { useAppDispatch, useAppSelector } from "../store";

const NavLinks = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: User = useAppSelector((state) => state.auth.currentUser) as User;

  const signOut = () => {
    dispatch(logout());
    navigate("/signin");
  };

  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <Nav.Link as={NavLink} to="/">
        Home
      </Nav.Link>
      <Nav.Link as={NavLink} to="/committees">
        Committees
      </Nav.Link>
      <Nav.Link as={NavLink} to="/users">
        Users
      </Nav.Link>
      <NavDropdown
        title={user.first_name + " " + user.last_name}
        id="user-dropdown">
        <NavDropdown.Item onClick={signOut}>Sign Out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

const Header = () => {
  return (
    <Navbar collapseOnSelect bg="light" expand="lg" className="mb-4">
      <Container>
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
