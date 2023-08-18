import { useEffect, useState } from "react";
import { Col, Nav, Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";
import { BiHomeAlt, BiSolidTruck } from "react-icons/bi";
import sidebarlogo from "../assets/Rectangle 63.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const [navOpen, setNavOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState("dashboard");
  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const handleCarBoxClick = () => {
    navigate("/cars");
  };
  return (
    <div className="d-flex">
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
      {/* <div className={`sidenav ${navOpen ? "open" : ""}`}>
        {currentContent === "dashboard" && (
          <div className="Dashboard">
            <p>Dashboard</p>
            <a onClick={handleDashboard}>Dashboard</a>
          </div>
        )}
        {currentContent === "listCar" && (
          <div className="ListCar">
            <p>Cars</p>
            <a onClick={handleCarBoxClick}>List Car</a>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Sidebar;
