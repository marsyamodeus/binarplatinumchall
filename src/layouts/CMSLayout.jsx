import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/reducers/actions/searchActions";
import Sidebar from "../components/Sidebar";
import Navbars from "../components/Navbars";

import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";

import Breadcrumbs from "../components/Breadcrumbs";
import "./cmslayout.css";

import { BiMenu, BiHomeAlt, BiSolidTruck, BiSearchAlt2 } from "react-icons/bi";
import navbarlogo from "../assets/Rectangle 62.png";
import sidebarlogo from "../assets/Rectangle 63.png";

const CMSLayout = () => {
  const [searcher, setSearcher] = useState("");
  const dispatch = useDispatch();
  const [navOpen, setNavOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State to control the dropdown menu
  const [currentContent, setCurrentContent] = useState("dashboard");
  const navigate = useNavigate();
  const tokenAdmin = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!tokenAdmin) {
      navigate("/cmssignin");
    }
  });

  const handleCarBoxClick = () => {
    navigate("/cars");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };
  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleHomeClick = () => {
    setCurrentContent("dashboard");
  };

  const handleCarsClick = () => {
    setCurrentContent("listCar");
  };

  const handleChange = (e) => {
    setSearcher(e.target.value);
  };
  const handleEnter = (event) => {
    event.preventDefault();
    console.log(searcher);
    dispatch(setSearchTerm(searcher));
    navigate("cars");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("cmssignin");
  };
  return (
    <>
      <div className="background">
        <div className="topnav">
          <div className="left-nav">
            <img
              className="top-icon"
              style={{ width: "100px", height: "34px" }}
              src={navbarlogo}
            />
          </div>
          <div className="right-nav">
            <span className="burger-icon" onClick={toggleNav}>
              <BiMenu />
            </span>

            <div className="right-side">
              <form className="search-form" onSubmit={handleEnter}>
                <div className="search-input">
                  <BiSearchAlt2 className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={handleChange}
                  />
                </div>
                <div className="search-button-wrap">
                  <button type="submit" className="search-button">
                    Search
                  </button>
                </div>
              </form>
              <div className="dropdown">
                <span className="colored-circle">A</span>
                <span>Admin</span>
                <div className="dropdown-content">
                  <a onClick={handleLogout}>Log Out</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <>
            <div className="sidebar">
              <div className="rec-icon">
                <img
                  className="rectangle"
                  style={{ width: "34px" }}
                  src={sidebarlogo}
                  onClick={toggleNav}
                />
              </div>

              <div className="home-icon" onClick={handleHomeClick}>
                <span>
                  <BiHomeAlt size={32} style={{ color: "white" }} />
                </span>
                <p>Dashboard</p>
              </div>

              <div className="cars-icon" onClick={handleCarsClick}>
                <span>
                  <BiSolidTruck size={32} style={{ color: "white" }} />
                </span>
                <p>Cars</p>
              </div>
            </div>
            {/* ///////// */}
            <div className={`sidenav ${navOpen ? "open" : ""}`}>
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
            </div>
            {/* ////// */}
          </>
          <div className="content">
            <main>
              <Breadcrumbs />
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default CMSLayout;
