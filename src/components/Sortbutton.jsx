import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./sortbutton.css";
import { BiPlus } from "react-icons/bi";

const Sortbutton = ({ handleChange, handleAdd }) => {
  const [activeButt, setActiveButt] = useState("");

  const handleCategoryChange = (value) => {
    handleChange({ target: { name: "category", value } });
    setActiveButt(value);
  };

  return (
    <div className="d-flex align-items-center px-2 pb-4">
      <Button
        name="category"
        variant="outline-primary"
        className={`thebutton ${activeButt === "" ? "active" : ""}`}
        onClick={() => handleCategoryChange("")}
      >
        All
      </Button>
      <Button
        name="category"
        onClick={() => handleCategoryChange("small")}
        variant="outline-primary"
        className={`thebutton ${activeButt === "small" ? "active" : ""}`}
      >
        2 - 4 People
      </Button>
      <Button
        name="category"
        onClick={() => handleCategoryChange("medium")}
        variant="outline-primary"
        className={`thebutton ${activeButt === "medium" ? "active" : ""}`}
      >
        4 - 6 People
      </Button>
      <Button
        name="category"
        onClick={() => handleCategoryChange("large")}
        variant="outline-primary"
        className={`thebutton ${activeButt === "large" ? "active" : ""}`}
      >
        6 - 8 People
      </Button>

      <Button
        className="ms-auto theaddbutton"
        style={{ padding: "5px 20px" }}
        onClick={handleAdd}
      >
        <BiPlus />
        Add Car
      </Button>
    </div>
  );
};

export default Sortbutton;
