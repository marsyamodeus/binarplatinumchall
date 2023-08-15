import React from "react";
// import "./datatable.css";
import Table from "react-bootstrap/Table";

const DataTable = ({ dataorder }) => {
  return (
    <div className="table-container">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User Email</th>
            <th>Car</th>
            <th>Start Rent</th>
            <th>Finish Rent</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {dataorder.map((item) => (
            <tr key={item.id}>
              <td>{item.User.email}</td>
              <td>{item.Car.name}</td>
              <td>{new Date(item.start_rent_at).toLocaleDateString()}</td>
              <td>{new Date(item.finish_rent_at).toLocaleDateString()}</td>
              <td>{item.total_price}</td>
              {/* <td>{item.Car.category}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataTable;
