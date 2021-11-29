import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate } from "react-router-dom";

import {
  Col,
  Row,
  Card,
  Form,
  Modal,
  Button,
  Container,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";

import { authActions } from "../../redux/actions";

import Footer from "../../components/Footer";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [user, setUser] = useState({ firstName: "", surname: "", email: "", password: "", dob: "", gender: "" });
  const [show, setShow] = useState(false);

  const onToggleModal = (e) => {
    e.preventDefault();
    setShow(!show);
  };

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(user.email, user.password));
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleOnChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleGender = (e) => {
    setUser({ ...user, gender: e.target.value })
  }

  const handleDOB = (e) => {
    setUser({...user, dob: e.target.value})
  }

  const handleLoginGoogle = (e) => {
    e.preventDefault();
    dispatch(authActions.loginGoogleRequest())
  }

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("user info", user)
    dispatch(authActions.register(user.firstName, user.surname, user.email, user.password, user.dob, user.gender));
  }

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Coderbook - Login or Sign Up</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <Container
        fluid
        className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
      >
        <Row>
          <Col className="d-flex flex-column justify-content-center align-items-center align-items-md-start">
            <h1 className="text-primary text-sm-left">coderbook</h1>
            <p className="header">
              Coderbook let's you share with your friends and family.
            </p>
          </Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Card style={{ width: "30rem" }} className="p-3 box-shadow">
              <Form className="d-flex flex-column justify-content-center align-content-center text-align-center">
                <Form.Group controlId="email">
                  <Form.Control
                    type="email"
                    onChange={onChange}
                    placeholder="Email or Phone Number"
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                  />
                </Form.Group>
                <Button
                  block
                  type="submit"
                  variant="primary"
                  onClick={onLogin}
                  className="font-weight-bold"
                >
                  Login
                </Button>
                <Form.Group
                  className="mx-auto mt-3"
                  controlId="formBasicPassword"
                >
                  <Link className="" to="#">
                    Forgot Password?
                  </Link>
                </Form.Group>
                <hr className="hr" />
                <Button
                  type="submit"
                  variant="success"
                  onClick={onToggleModal}
                  className="mx-auto w-50 font-weight-bold"
                >
                  Create an account
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        show={show}
        dialogClassName="modal-90w"
        onHide={() => setShow(false)}
        aria-labelledby="example-custom-modal-styling-title"
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Header>
          <Modal.Title>
            Sign Up
            <p className="text-secondary font-weight-light p-modal">
              It's quick and easy.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* STEP 1 */}
          <Form className="d-flex flex-column justify-content-center" onSubmit={handleRegister}>
            <Form.Row>
               <Form.Group as={Col} controlId="firstname">
                <Form.Control
                  type="name"
                  placeholder="First name"
                  name="firstName"
                  onChange={handleOnChange}
                />
              </Form.Group>
               <Form.Group as={Col} controlId="surname">
                <Form.Control
                  type="name"
                  placeholder="Surname"
                  name="surname"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="email">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="password">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  onChange={handleOnChange}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control type="date" name="dob" controlId="dob" placeholder="Date of Birth" onClick={handleDOB}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Row sm={10} style={{ marginLeft: "5px" }}>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    id="gender"
                    value="male"
                    onClick={handleGender}
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    id="gender"
                    value="female"
                    onClick={handleGender}
                    style={{ marginLeft: "10px" }}
                  />
                </Row>
              </Form.Group>  
            </Form.Row>
            <p className="text-center p-terms">
              By clicking Sign Up, you agree to our Terms, Data Policy and
              Cookie Policy. You may receive SMS notifications from us and can
              opt out at any time.
            </p>
            <Button className="mx-auto w-50" variant="primary" type="submit">
              Sign Up
            </Button>
          </Form>
          {/* <hr> </hr> */}
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex',flexDirection: "column", justifyContent: 'center' }}>
          <Modal.Title>
            <p className="text-secondary font-weight-light p-modal">Or</p>
          </Modal.Title>
          <Button variant="light" className="mx-auto w-50" onClick={handleLoginGoogle}>
            Continue with Google
          </Button>
          <Button variant="primary" className="mx-auto w-50">
            Continue with Facebook
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
}
