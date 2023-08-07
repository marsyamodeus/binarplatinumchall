import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbars from "../components/Navbars";

import { Container, Row, Col, Button, Offcanvas } from "react-bootstrap";

import Breadcrumbs from "../components/Breadcrumbs";
import "./cmslayout.css";

const CMSLayout = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const tokenAdmin = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!tokenAdmin) {
      navigate("/cmssignin");
    }
  });

  return (
    <div className="mainwrapper">
      <div className="navswrapper">
        <Sidebar />
        <Navbars menubuttpress={handleShow} />
      </div>
      <div className="contentwrapper">
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
};

export default CMSLayout;
