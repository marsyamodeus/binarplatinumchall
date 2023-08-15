import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./cmsdashboard.css";
import DataChart from "../components/DataChart";
import MonthSelector from "../components/MonthSelector";

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

      <div>
        <DataChart />
      </div>
    </div>
  );
};

export default CMSdashboard;
