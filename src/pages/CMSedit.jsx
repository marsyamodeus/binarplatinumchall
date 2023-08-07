import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export default function EditCar() {
  const [data, setData] = useState({});
  const { id } = useParams();
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  const tokenAdmin = localStorage.getItem("admin_token");
  useEffect(() => {
    if (!tokenAdmin) {
      navigate("/cmssignin");
    }
  });

  const getDetailedData = async () => {
    try {
      const res = await axios.get(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        {
          headers: {
            access_token: localStorage.getItem("admin_token"),
          },
        }
      );
      console.log(res);
      setData(res.data);
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };

  useEffect(() => {
    getDetailedData();
  }, []);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleChangePhoto = (e) => {
    console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", parseInt(price));
    formData.append("status", false);
    formData.append("image", photo);

    axios
      .put(
        `https://api-car-rental.binaracademy.org/admin/car/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            access_token: localStorage.getItem("admin_token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setShowToast(true);
      })
      .catch((err) => console.log(err));
      setTimeout(() => {
      navigate("/cars");
      }, 3000);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center pt-3 pb-2">
        <h3 className="">Edit Car</h3>
      </div>
      {showToast && (
        <div style={{ position: "relative" }}>
          <ToastContainer position="top-center">
            <Toast className="text-center">
              <Toast.Body className="bg-success text-white">
                Data Berhasil Disimpan
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      )}
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="name"
              name="name"
              value={name}
              onChange={handleChangeName}
              placeholder={data.name}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Harga
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="price"
              value={price}
              onChange={handleChangePrice}
              type=""
              placeholder={data.price}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Gambar
          </Form.Label>
          <Col sm="10">
            <Form.Control
              onChange={handleChangePhoto}
              type="file"
              name="image"
              placeholder={data.img}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Kategori
          </Form.Label>
          <Col sm="10">
            <Form.Control
              name="category"
              value={category}
              onChange={handleChangeCategory}
              type=""
              placeholder={data.category}
            />
          </Col>
        </Form.Group>
      </Form>
      <Button variant="primary" disabled="" onClick={handleSubmit}>
        Click
      </Button>
    </Container>
  );
}
