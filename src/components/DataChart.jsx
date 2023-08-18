import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
//react chart-related//
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MonthSelector from "./MonthSelector";
import DataTable from "./DataTable";
import PageSizeSelector from "./DataTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
/////////////////////

const DataChart = () => {
  const navigate = useNavigate();
  const [repData, setRepData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [chosenMonth, setChosenMonth] = useState(new Date().getMonth() + 1);
  const [chosenPageSize, setChosenPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const sortingUrls = {
    createdAtDesc: `https://api-car-rental.binaracademy.org/admin/v2/order?sort=created_at%3Adesc&page=${currentPage}&pageSize=${chosenPageSize}`,
    carNameAsc: `https://api-car-rental.binaracademy.org/admin/v2/order?sort=car_name%3Aasc&page=${currentPage}&pageSize=${chosenPageSize}`,
    carNameDesc: `https://api-car-rental.binaracademy.org/admin/v2/order?sort=car_name%3Adesc&page=${currentPage}&pageSize=${chosenPageSize}`,
    userEmailAsc: `https://api-car-rental.binaracademy.org/admin/v2/order?sort=user_email%3Aasc&page=${currentPage}&pageSize=${chosenPageSize}`,
    userEmailDesc: `https://api-car-rental.binaracademy.org/admin/v2/order?sort=user_email%3Adesc&page=${currentPage}&pageSize=${chosenPageSize}`,
  };
  const [currentSortingUrl, setCurrentSortingUrl] = useState(
    sortingUrls.createdAtDesc
  );
  const handleMonthChange = (e) => {
    setChosenMonth(parseInt(e.target.value));
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setChosenPageSize(newSize);
    setCurrentPage(1);
    setCurrentSortingUrl((prevUrl) =>
      prevUrl.replace(/pageSize=\d+/, `pageSize=${newSize}`)
    );
  };

  const handlePageJump = (e) => {
    const newPage = parseInt(e.target.value);
    setCurrentPage(newPage);
    setCurrentSortingUrl((prevUrl) =>
      prevUrl.replace(/page=\d+/, `page=${newPage}`)
    );
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setCurrentSortingUrl((prevUrl) =>
      prevUrl.replace(/page=\d+/, `page=${newPage}`)
    );
  };

  useEffect(() => {
    getReportData();
    getOrderData();
  }, [chosenMonth, chosenPageSize, currentPage, currentSortingUrl]);

  const getReportData = () => {
    const currentYear = new Date().getFullYear();
    const fromDate = `${currentYear}-${chosenMonth
      .toString()
      .padStart(2, "0")}-01`;
    const daysInMonth = new Date(currentYear, chosenMonth, 0).getDate();
    const untilDate = `${currentYear}-${chosenMonth
      .toString()
      .padStart(2, "0")}-${daysInMonth}`;

    axios
      .get(
        `https://api-car-rental.binaracademy.org/admin/order/reports?from=${fromDate}&until=${untilDate}`,
        {
          headers: { access_token: localStorage.getItem("admin_token") },
        }
      )
      .then((res) => {
        setRepData(res.data);
      });
  };

  const getOrderData = () => {
    axios
      .get(currentSortingUrl, {
        headers: { access_token: localStorage.getItem("admin_token") },
      })
      .then((res) => {
        setOrderData(res.data.orders);
        setTotalPages(res.data.pageCount);
      });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Amount of Car Rental",
        position: "left",
      },
    },
  };

  console.log(orderData);

  let finalChartData = null;

  if (repData.length > 0) {
    const labels = repData.map((item) => {
      const dayOnly = new Date(item.day).getDate();
      return dayOnly;
    });

    const data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: repData.map((item) => item.orderCount),
          backgroundColor: "rgba(88, 107, 144, 0.5)",
        },
      ],
    };

    finalChartData = <Bar options={options} data={data} />;
  }

  const PageNavButton = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };
  const PageSizeSelector = ({ pageSize, onPageSizeChange }) => {
    return (
      <select value={pageSize} onChange={onPageSizeChange}>
        <option value={10}>10</option>
        <option value={15}>15</option>
        <option value={20}>20</option>
        <option value={25}>25</option>
        <option value={30}>30</option>
      </select>
    );
  };
  return (
    <div>
      <MonthSelector selectedMonth={chosenMonth} onChange={handleMonthChange} />
      {finalChartData}
      <Container className="d-flex justify-content-center">
        <p>Date</p>
      </Container>
      <DataTable dataorder={orderData} />
      <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-around">
          <div>
            <PageSizeSelector
              pageSize={chosenPageSize}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
          <div>
            <select value={currentPage} onChange={handlePageJump}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <option key={page} value={page}>
                    Page {page}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <PageNavButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DataChart;
