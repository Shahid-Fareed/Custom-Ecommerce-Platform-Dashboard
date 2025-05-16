"use client"
import React from "react";
import Chart from "react-apexcharts";
// import ReactApexChart from "react-r";


const AreaSpaLine = () => {
  const series = [
    {
      name:"dasdas",
      data: [11, 40, 28, 51, 42, 109, 100, 51, 42, 109, 100],
    },
    {
      name:"dasdasdsasad",
      data: [21, 32, 45, 32, 34, 52, 41, 32, 34, 52, 41],
    },
  ];
  const options = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    yaxis: {
      labels: {
        style: {
          colors: "#475569",
          fontFamily: "Inter",
        },
      },
    },
    grid: {
      show: true,
      borderColor: "#e2e8f0",
      strokeDashArray: 10,
      position: "back",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
        "2018-09-19T07:30:00.000Z",
        "2018-09-19T08:30:00.000Z",
        "2018-09-19T09:30:00.000Z",
        "2018-09-19T10:30:00.000Z",
      ],
      labels: {
        style: {
          colors:  "#475569",
          fontFamily: "Inter",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      position: 'top',
      labels: {
        colors: "#475569",
      },
      fontFamily: "Inter",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <div>
      <Chart options={options} series={series} type="area" height={250} />
    </div>
  );
};

export default AreaSpaLine;
