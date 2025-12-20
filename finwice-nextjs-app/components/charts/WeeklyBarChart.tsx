"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const WeeklyBarChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const options = {
      series: [
        {
          name: "",
          data: [30, 40, 58, 50, 45, 55, 47],
        },
      ],
      chart: {
        type: "bar",
        height: 322,
        toolbar: { show: false },
        background: "transparent",
      },
      plotOptions: {
        bar: {
          columnWidth: "14",
          borderRadius: 8,
          distributed: true,
        },
      },
      grid: { show: false },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#101828"],
          fontWeight: "bold",
          fontSize: "14px",
        },
        offsetY: 150,
      },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        categories: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL"],
        labels: {
          style: {
            colors: "#BABABA",
            fontSize: "14px",
            fontWeight: 400,
          },
        },
      },
      yaxis: { show: false },
      stroke: { show: false },
      legend: { show: false },
      colors: ["#317C6F"],
    };

    if (chartRef.current) {
      chartInstance.current = new ApexCharts(chartRef.current, options);
      chartInstance.current.render();
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <div id="line-chart-5" ref={chartRef} />;
};

export default WeeklyBarChart;
