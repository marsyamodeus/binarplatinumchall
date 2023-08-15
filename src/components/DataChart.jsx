import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [totalPages, setTotalPages] = useState(1);

  const handleMonthChange = (e) => {
    setChosenMonth(parseInt(e.target.value));
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setChosenPageSize(newSize);
    getOrderData(newSize);
  };

  const handlePageJump = (e) => {
    const newPage = parseInt(e.target.value);
    setCurrentPage(newPage);
    getOrderData(chosenPageSize, newPage);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    getOrderData(chosenPageSize, newPage);
  };

  useEffect(() => {
    getReportData();
    getOrderData();
  }, [chosenMonth, chosenPageSize, currentPage]);

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
      .get(
        `https://api-car-rental.binaracademy.org/admin/v2/order?sort=created_at%3Adesc&page=${currentPage}&pageSize=${chosenPageSize}`,
        {
          headers: { access_token: localStorage.getItem("admin_token") },
        }
      )
      .then((res) => {
        setOrderData(res.data.orders);
        setTotalPages(res.data.totalPages);
      });
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
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
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };

    finalChartData = <Bar options={options} data={data} />;
  }

  const PageJumpSelector = ({ currentPage, totalPages, onPageJump }) => {
    const jumpToPageOptions = Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );

    return (
      <select value={currentPage} onChange={onPageJump}>
        {jumpToPageOptions.map((page) => (
          <option key={page} value={page}>
            Page {page}
          </option>
        ))}
      </select>
    );
  };

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
        <option value={20}>20</option>
      </select>
    );
  };
  return (
    <div>
      <MonthSelector selectedMonth={chosenMonth} onChange={handleMonthChange} />
      {finalChartData}
      <DataTable dataorder={orderData} />
      <PageSizeSelector
        pageSize={chosenPageSize}
        onPageSizeChange={handlePageSizeChange}
      />
      <PageJumpSelector
        currentPage={currentPage}
        totalPages={totalPages}
        onPageJump={handlePageJump}
      />
      <PageNavButton
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default DataChart;
