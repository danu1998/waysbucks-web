import React, { useState, useContext, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";
import { API } from "../../../config/api";

const ButtonNav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const [showRegister, setShowRegister] = useState(false);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  const switchRegister = () => {
    handleCloseLogin();
    handleShowRegister();
  };

  const switchLogin = () => {
    handleCloseRegister();
    handleShowLogin();
  };

  const LoginModal = () => {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    console.log(state);
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
      email: "",
      password: "",
    });

    const { email, password } = form;
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };

    const handleSubmitLogin = async (e) => {
      try {
        e.preventDefault();
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const body = JSON.stringify(form);
        const response = await API.post("/login", body, config);

        if (response?.status === 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data,
          });

          if (response.data.data.status === "admin") {
            navigate("/mainadmin");
          } else if (response.data.data.status === "customer") {
            navigate("/maincustomer");
          } else {
            window.location.reload();
          }
          const alert = (
            <Alert variant="success" className="py-1">
              Login success
            </Alert>
          );
          setMessage(alert);
        }
      } catch (error) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Login failed
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      }
    };

    return (
      <Modal show={showLogin} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold fs-2 text-danger">Login</Modal.Title>
          {message && message}
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitLogin}>
            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={handleChange}
                className="p-3 border border-3 border-danger"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={password}
                name="password"
                className="p-3 border border-3 border-danger"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="danger" size="lg" type="submit">
                Sign In
              </Button>
              <p className="text-center">
                Don't have an account ?
                <span
                  onClick={() => {
                    switchRegister();
                  }}
                  className="fw-bold"
                >
                  Klik Here
                </span>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  const RegisterModal = () => {
    let navigate = useNavigate();
    const [state, dispatch] = useContext(UserContext);
    console.log(state);
    const [message, setMessage] = useState(null);
    const [form, setForm] = useState({
      email: "",
      password: "",
      fullName: "",
    });
    const { email, password, fullName } = form;
    // ======= || ======= handlechange
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
    // ======= || =======

    // ======= || ======= handlesubmit
    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const body = JSON.stringify(form);
        const response = await API.post("/register", body, config);
        console.log(response.data);

        if (response?.status == 200) {
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: response.data.data,
          });

          if (response.data.data.status == "admin") {
            navigate("/mainadmin");
          } else {
            navigate("/maincustomer");
          }
          const alert = (
            <Alert variant="danger" className="py-1">
              Register Success
            </Alert>
          );
          setMessage(alert);
        }
      } catch (error) {
        const alert = (
          <Alert variant="danger" className="py-1">
            Failed
          </Alert>
        );
        setMessage(alert);
        console.log(error);
      }
    };
    return (
      <Modal show={showRegister} onHide={handleCloseRegister}>
        <Modal.Header closeButton>
          {message && message}
          <Modal.Title className="fw-bold fs-2 text-danger">
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                name="email"
                onChange={handleChange}
                className="p-3 border border-3 border-danger"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="password"
                value={password}
                placeholder="Password"
                onChange={handleChange}
                name="password"
                className="p-3 border border-3 border-danger"
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={handleChange}
                name="fullName"
                className="p-3 border border-3 border-danger"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button variant="danger" size="lg" type="submit">
                Register
              </Button>
              <p className="text-center">
                Already have an account ?
                <span
                  onClick={() => {
                    switchLogin();
                  }}
                  className="fw-bold"
                >
                  Klik Here
                </span>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <div className="d-flex justify-content-end align-items-center gap-3">
      <button
        className="btn btn-outline-danger px-5"
        onClick={() => {
          handleShowLogin();
        }}
      >
        Sign In
      </button>

      <button
        className="btn btn-danger px-5"
        onClick={() => {
          handleShowRegister();
        }}
      >
        Register
      </button>
      <div>{showRegister && <RegisterModal />}</div>
      <div>{showLogin && <LoginModal />}</div>
    </div>
  );
};

export default ButtonNav;
