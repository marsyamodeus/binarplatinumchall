import React from "react";
import { Col, Nav, Navbar, Container } from "react-bootstrap";
import "./sidebar.css";
import { BiHomeAlt, BiSolidTruck } from "react-icons/bi";
import sidebarlogo from "../assets/Rectangle 63.png";

const Sidebar = () => {
  return (
    <div>
      <Col>
        <Navbar expand="sm" className="sidebar">
          <div>
            <Navbar.Toggle aria-controls="sidebar-nav" />
            <Navbar.Collapse id="sidebar-nav">
              <Nav
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={sidebarlogo}
                  alt="sidebar logo"
                  style={{ width: "32px" }}
                />
                <Nav.Link
                  style={{
                    color: "#FFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  href="/dashboard"
                >
                  <BiHomeAlt size={32} />
                  Dashboard
                </Nav.Link>
                <Nav.Link
                  style={{
                    color: "#FFF",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  href="/cars"
                >
                  <BiSolidTruck size={32} />
                  Cars
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Navbar>
      </Col>
    </div>
  );
};

export default Sidebar;
