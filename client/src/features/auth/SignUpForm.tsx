import React, { useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserWithPassword } from "../../types";
import Axios from "../../utils/axios";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [working, setWorking] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords must match");
      return;
    }

    setWorking(true);
    const user: UserWithPassword = {
      email: email,
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };
    const response = await Axios.post("auth/register/", user);
    if (response.status === 201) {
      setWorking(false);
      navigate("/signin");
    }
  };

  return (
    <Card className="m-2">
      <Card.Body>
        <Card.Title className="text-center mb-4">Sign Up</Card.Title>
        {message && <Alert variant="warning">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Group className="pb-2">
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  placeholder="Email Address"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pb-2">
                <Form.Control
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  placeholder="Password"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pb-2">
                <Form.Control
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pb-2">
                <InputGroup>
                  <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>

                  <Form.Control
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    placeholder="Username/Handle"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="pb-2">
                <InputGroup>
                  <Form.Control
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    placeholder="First Name"
                    required
                  />
                  <Form.Control
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    placeholder="Last Name"
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                disabled={working}
                className="w-100"
                type="submit"
                variant="primary">
                Sign Up
              </Button>
            </Col>
          </Row>
        </Form>
        <small className="text-muted">
          Already have an account? <Link to="/signin">Sign In</Link>
        </small>
      </Card.Body>
    </Card>
  );
};

export default SignUpForm;
