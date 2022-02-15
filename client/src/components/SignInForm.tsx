import React, { useState } from "react";
import { Alert, Button, Card, Col, Form, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../utils/axios";

import { loginFailed, loginPending, loginSuccess } from "../features/auth";
import { useAppDispatch, useAppSelector } from "../store";
import { TokenPair, UserCredentials } from "../models/user";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const message = useAppSelector((state) => state.auth.error);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(loginPending());

    const credentials: UserCredentials = {
      email: email,
      password: password,
    };

    const response = await Axios.post("auth/token/", credentials);
    const tokens: TokenPair = response.data;

    if (response.status !== 200) dispatch(loginFailed(response.data));

    dispatch(loginSuccess(tokens));
    navigate("/");
  };

  return (
    <Card className="m-2">
      <Card.Body>
        <Card.Title className="text-center mb-4">Sign In</Card.Title>
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
              <Button
                disabled={isLoading}
                className="w-100"
                type="submit"
                variant="primary">
                {isLoading && <Spinner size="sm" animation="border" />} Sign In
              </Button>
            </Col>
          </Row>
        </Form>
        <div className="text-center mt-2">
          <small className="text-muted">
            Need an account? <Link to="/signup">Sign Up</Link>
          </small>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SignInForm;
