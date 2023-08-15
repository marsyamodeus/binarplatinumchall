import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./navbars.css";
import navlogo from "../assets/Rectangle 62.png";
import { useNavigate } from "react-router-dom";

import { BiMenu } from "react-icons/bi";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/reducers/actions/searchActions";

const Navbars = ({ menubuttpress }) => {
  const [searcher, setSearcher] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Create a dispatch

  const handleChange = (e) => {
    setSearcher(e.target.value);
  };

  const handleEnter = (event) => {
    event.preventDefault();
    console.log(searcher);
    dispatch(setSearchTerm(searcher));
    navigate("cars");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("cmssignin");
  };
  return (
    <div style={{ paddingLeft: "65px" }}>
      <Navbar
        id="mainnavbar"
        expand="lg"
        className="sticky-top"
        style={{ background: "white" }}
      >
        <Container className="px-5" fluid>
          <div className="d-flex align-items-center">
            <Navbar.Brand>
              <img src={navlogo} alt="logo" />
            </Navbar.Brand>
            <Nav.Link onClick={menubuttpress}>
              <BiMenu />
            </Nav.Link>
          </div>

          <Form className="d-flex">
            <Container className="d-flex align-items-center">
              <input
                type="search"
                name="name"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={handleChange}
              />
              <Button variant="outline-primary" onClick={handleEnter}>
                Search
              </Button>
              <NavDropdown title="Admin" id="nav-dropdown">
                <NavDropdown.Item id="dropdownbutton" onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Container>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbars;
