"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const RadialBarChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const options = {
      chart: {
        type: "radialBar",
        height: 200,
        sparkline: { enabled: true },
      },
      series: [75],
      plotOptions: {
        radialBar: {
          startAngle: -110,
          endAngle: 110,
          hollow: {
            size: "70%",
          },
          track: {
            background: "#e9ecef",
            strokeWidth: "100%",
          },
          dataLabels: {
            name: { show: false },
            value: {
              fontSize: "35px",
              fontWeight: "500",
              color: "#292929",
              offsetY: -1,
            },
          },
        },
      },
      colors: ["#317C6F"],
      labels: [""],
    };

    // Only render once when component is mounted
    if (chartRef.current) {
      chartInstance.current = new ApexCharts(chartRef.current, options);
      chartInstance.current.render();
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return <div ref={chartRef} />;
};

export default RadialBarChart;
