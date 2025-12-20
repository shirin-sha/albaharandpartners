"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const CustomBarChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const options = {
      series: [
        {
          name: "",
          data: [70, 90, 80, 100],
        },
      ],
      chart: {
        type: "bar",
        height: 120,
        width: 130,
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
        labels: { show: false },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: { show: false },
      stroke: { show: false },
      legend: { show: false },
      dataLabels: { enabled: false },
      colors: ["#406962", "#406962", "#40696280", "#40696280"],
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

  return <div id="line-chart-3" ref={chartRef} />;
};

export default CustomBarChart;
