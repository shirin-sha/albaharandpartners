"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const DistributedBarChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const options = {
      series: [
        {
          name: "",
          data: [40, 80, 100, 90],
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
      colors: ["#317C6F", "#317C6F80", "#317C6F80", "#317C6F"],
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

  return <div id="line-chart-2" ref={chartRef} />;
};

export default DistributedBarChart;
