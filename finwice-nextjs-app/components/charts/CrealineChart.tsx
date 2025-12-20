"use client";
import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const AreaLineChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<ApexCharts | null>(null);

  useEffect(() => {
    const options = {
      chart: {
        height: 293,
        type: "area",
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#317C6F"],
      series: [
        {
          name: "$",
          data: [43, 24, 28, 18, 47, 19, 29, 30, 49],
        },
      ],
      fill: {
        type: "solid",
        opacity: 0.1,
      },
      yaxis: {
        min: 10,
        max: 52,
        tickAmount: 3,
        labels: {
          formatter: (value: any) => `$${value}k`,
          style: {
            colors: "#6D7074",
            fontSize: "12px",
            fontWeight: 500,
          },
        },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      xaxis: {
        categories: [
          "2/1",
          "2/2",
          "2/3",
          "2/4",
          "2/5",
          "2/6",
          "2/7",
          "2/8",
          "2/9",
        ],
        labels: {
          style: {
            colors: "#6D7074",
          },
        },
      },
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

  return <div id="line-chart-6" ref={chartRef} />;
};

export default AreaLineChart;
