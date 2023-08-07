import React from "react";

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

  const dummyreportdata = [
    {
      day: "2022-01-22",
      orderCount: 0,
    },
    {
      day: "2022-01-23",
      orderCount: 0,
    },
    {
      day: "2022-01-24",
      orderCount: 4,
    },
    {
      day: "2022-01-25",
      orderCount: 3,
    },
    {
      day: "2022-01-26",
      orderCount: 55,
    },
    {
      day: "2022-01-27",
      orderCount: 6,
    },
    {
      day: "2022-01-28",
      orderCount: 6,
    },
    {
      day: "2022-01-29",
      orderCount: 4,
    },
    {
      day: "2022-01-30",
      orderCount: 2,
    },
    {
      day: "2022-01-31",
      orderCount: 23,
    },
  ];

  const labels = dummyreportdata.map((item) => {
    const dayOnly = new Date(item.day).getDate();
    return dayOnly;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: dummyreportdata.map((item) => item.orderCount),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default DataChart;
