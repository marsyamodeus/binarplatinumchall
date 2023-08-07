import { React, useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./cmssignin.css";
import cmsbg from "../assets/cmsbg.png";

const CMSsignin = () => {
  const tokenAdmin = localStorage.getItem("admin_token");
  useEffect(() => {
    if (tokenAdmin) {
      navigate("/dashboard");
    }
  });

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [succ, setSucc] = useState("");
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    setLoad(true);
    const data = {
      email: form.email,
      password: form.password,
    };

    axios
      .post(`https://api-car-rental.binaracademy.org/admin/auth/login`, data)
      .then((res) => {
        console.log(res);
        localStorage.setItem("admin_token", res.data.access_token);
        localStorage.setItem("role", res.data.role);
        setSucc(
          "Berhasil login! Memindahkan anda ke dashboard dalam beberapa detik..."
        );
        setLoad(false);
        navigate("/")
        // setTimeout(() => {
        //   ;
        // }, 3000);
      })

      .catch((err) => {
        console.log(err);
        setErr(
          `Masukkan username dan password yang benar! Perhatikan penggunaan huruf kapital.`
        );
        setLoad(false);
        setTimeout(() => {
          setErr("");
        }, 3000);
      });
  };

  return (
    <div className="sign-container">
      <img className="signbg" src={cmsbg} alt="gambarmobil" />
      <Container className="signinform">
        <Form>
          <h1>Welcome, Admin BCR</h1>

          {succ && (
            <div className="signalert">
              <Alert variant="success">
                Berhasil login! Memindahkan anda <br></br>ke dashboard dalam
                beberapa detik...
              </Alert>
            </div>
          )}
          {err && (
            <div className="signalert">
              <Alert variant="danger">
                Masukkan username dan password yang benar!<br></br> Perhatikan
                penggunaan huruf kapital.
              </Alert>
            </div>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email </Form.Label>
            <Form.Control
              type="email"
              placeholder="Contoh: johndee@gmail.com"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="6+ karakter"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </Form.Group>
          <button
            disabled={load ? true : false}
            className="signinbutton"
            onClick={handleSubmit}
          >
            {load ? "Loading..." : "Sign in"}
          </button>
        </Form>
      </Container>
    </div>
  );
};

export default CMSsignin;
