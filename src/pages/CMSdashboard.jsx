import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cmsdashboard.css";
import DataChart from "../components/DataChart";

const CMSdashboard = () => {
  const navigate = useNavigate();
  const tokenAdmin = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!tokenAdmin) {
      navigate("cmssignin");
    }
  });

  return (
    <div>
      <p className="titletext">Rented Car Data Visualization</p>

      <div>Month picker</div>
      <div>
        <DataChart />
      </div>
      <div>THE TABLE</div>
    </div>
  );
};

export default CMSdashboard;
