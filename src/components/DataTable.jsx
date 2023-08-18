import React from "react";
import "./datatable.css";
import Table from "react-bootstrap/Table";

const DataTable = ({ dataorder }) => {
  return (
    <div className="custom-table">
      <Table bordered hover className="custom-table">
        <thead>
          <tr>
            <th style={{ backgroundColor: "#CFD4ED" }}>User Email</th>
            <th style={{ backgroundColor: "#CFD4ED" }}>Car</th>
            <th style={{ backgroundColor: "#CFD4ED" }}>Start Rent</th>
            <th style={{ backgroundColor: "#CFD4ED" }}>Finish Rent</th>
            <th style={{ backgroundColor: "#CFD4ED" }}>Price</th>
            <th style={{ backgroundColor: "#CFD4ED" }}>Category</th>
          </tr>
        </thead>
        <tbody>
          {dataorder.map((item) => (
            <tr key={item.id}>
              <td>{item.User.email}</td>
              <td>{item.Car?.name || item.CarId}</td>
              <td>{new Date(item.start_rent_at).toLocaleDateString()}</td>
              <td>{new Date(item.finish_rent_at).toLocaleDateString()}</td>
              <td>{item.total_price}</td>
              <td>{item.Car?.category || ""}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
