import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import "./cmsadd.css";

export default function AddCar() {
  const [showToast, setShowToast] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const navigate = useNavigate();

  const tokenAdmin = localStorage.getItem("admin_token");
  useEffect(() => {
    if (!tokenAdmin) {
      navigate("/cmssignin");
    }
  });

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
      .post("https://api-car-rental.binaracademy.org/admin/car", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          access_token: localStorage.getItem("admin_token"),
        },
      })
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
        <h3 className="addnewcartxt">Add New Car</h3>
      </div>
      {showToast && (
        <div style={{ position: "relative" }}>
          <ToastContainer position="top-center">
            <Toast className="text-center">
              <Toast.Body className="bg-primary text-white">
                Data Berhasil Ditambahkan
              </Toast.Body>
            </Toast>
          </ToastContainer>
        </div>
      )}
      <Form>
        <div style={{ background: "white", padding: "16px" }}>
          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Nama/Tipe Mobil
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="name"
                name="name"
                value={name}
                onChange={handleChangeName}
                placeholder="Input Nama/Tipe Mobil"
                style={{ width: "50%" }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Harga
            </Form.Label>
            <Col sm="10">
              <Form.Control
                name="price"
                value={price}
                onChange={handleChangePrice}
                type=""
                placeholder="Input Harga Sewa Mobil"
                style={{ width: "50%" }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Foto
            </Form.Label>
            <Col sm="10">
              <Form.Control
                onChange={handleChangePhoto}
                type="file"
                name="image"
                style={{ width: "50%" }}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Kategori
            </Form.Label>
            <Col sm="10">
              <Form.Select
                name="category"
                value={category}
                onChange={handleChangeCategory}
                style={{ width: "50%" }}
              >
                {" "}
                <option value="">Select category</option>
                <option value="small">2 - 4 orang</option>
                <option value="medium">4 - 6 orang</option>
                <option value="large">6 - 8 orang</option>
              </Form.Select>
            </Col>
          </Form.Group>
        </div>
      </Form>
      <div className="bottombtnset">
        <Button
          className="cancelbtn"
          variant="outline-primary"
          onClick={() => navigate("/cars")}
        >
          Cancel
        </Button>
        <Button
          className="savebtn"
          variant="outline-primary"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </div>
    </Container>
  );
}
