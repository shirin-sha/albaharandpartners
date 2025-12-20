"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const MonthlyBarChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const options = {
      series: [
        {
          name: "",
          data: [50, 70, 90, 80, 100],
        },
      ],
      chart: {
        type: "bar",
        height: 170,
        toolbar: { show: false },
        background: "transparent",
      },
      plotOptions: {
        bar: {
          columnWidth: "70%",
          borderRadius: 4,
          distributed: true,
        },
      },
      grid: { show: false },
      xaxis: {
        axisBorder: { show: false },
        axisTicks: { show: false },
        categories: ["J", "F", "M", "A", "M"],
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
      dataLabels: { enabled: false },
      colors: ["#40696266", "#40696266", "#317C6F", "#40696266", "#40696266"],
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

  return (
    <div
      id="line-chart-4"
      style={{ width: "100%" }}
      className="overflow-clip"
      ref={chartRef}
    />
  );
};

export default MonthlyBarChart;
