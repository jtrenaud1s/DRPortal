import React, { useRef } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Popover,
  OverlayTrigger,
  Card,
  ListGroup,
} from "react-bootstrap";
import {
  FilePersonFill,
  HouseFill,
  PeopleFill,
  PersonLinesFill,
} from "react-bootstrap-icons";
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

  const popover = (
    <Popover id="popover-account" arrowProps={{ placement: "top-end" }}>
      <Popover.Header>
        {user.first_name + " " + user.last_name}
      </Popover.Header>
      <ListGroup variant="flush">
        <ListGroup.Item>(555) 555-5555</ListGroup.Item>
        <ListGroup.Item>{user.email}</ListGroup.Item>
      </ListGroup>
      <Card.Footer className="d-flex justify-content-end">
        <Button size="sm" onClick={signOut}>
          Sign Out
        </Button>
      </Card.Footer>
    </Popover>
  );

  return (
    <Nav className="justify-content-end flex-grow-1 pe-3">
      <Nav.Link as={NavLink} to="/" className="d-flex align-items-center">
        <HouseFill className="me-2" />
        Home
      </Nav.Link>
      <Nav.Link
        as={NavLink}
        to="/committees"
        className="d-flex align-items-center">
        <FilePersonFill className="me-2" />
        Committees
      </Nav.Link>
      <Nav.Link as={NavLink} to="/users" className="d-flex align-items-center">
        <PeopleFill className="me-2" />
        Users
      </Nav.Link>
      <OverlayTrigger
        trigger="click"
        rootClose
        placement="bottom"
        overlay={popover}>
        <Nav.Link id="user-dropdown">
          <span className="d-flex align-items-center">
            <PersonLinesFill className="me-2" />
            My Account
          </span>
        </Nav.Link>
      </OverlayTrigger>
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
