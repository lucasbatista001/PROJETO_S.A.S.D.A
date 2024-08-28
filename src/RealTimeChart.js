// src/RealTimeChart.js
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./RealTimeChart.css";

const RealTimeChart = ({ dataStream }) => {
  const [nitrogenData, setNitrogenData] = useState([]);
  const [phosphorusData, setPhosphorusData] = useState([]);
  const [potassiumData, setPotassiumData] = useState([]);

  useEffect(() => {
    if (
      dataStream.nitrogen !== null &&
      dataStream.phosphorus !== null &&
      dataStream.potassium !== null
    ) {
      const now = new Date().getTime();
      const { nitrogen, phosphorus, potassium } = dataStream;

      setNitrogenData((prevData) =>
        [...prevData, { x: now, y: nitrogen }].slice(-20)
      );
      setPhosphorusData((prevData) =>
        [...prevData, { x: now, y: phosphorus }].slice(-20)
      );
      setPotassiumData((prevData) =>
        [...prevData, { x: now, y: potassium }].slice(-20)
      );
    }
  }, [dataStream]);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
    },
    xaxis: {
      type: "datetime",
      range: 60000, // 1 minuto
    },
    yaxis: {
      title: {
        text: "Nível",
      },
    },
    title: {
      text: "Níveis de Nutrientes em Tempo Real",
      align: "left",
    },
    stroke: {
      curve: "smooth",
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
      borderColor: "#e0e0e0",
      strokeDashArray: 4,
    },
  };

  return (
    <>
      <div className="charts-container">
        <div className="chart-card">
          <h3>Nível de Nitrogênio</h3>
          <Chart
            options={{ ...chartOptions, colors: ["#2E8B57"] }}
            series={[{ name: "Nitrogênio", data: nitrogenData }]}
            type="line"
            height={350}
          />
        </div>
        <div className="chart-card">
          <h3>Nível de Fósforo</h3>
          <Chart
            options={{ ...chartOptions, colors: ["#3CB371"] }}
            series={[{ name: "Fósforo", data: phosphorusData }]}
            type="line"
            height={350}
          />
        </div>
        <div className="chart-card">
          <h3>Nível de Potássio</h3>
          <Chart
            options={{ ...chartOptions, colors: ["#90EE90"] }}
            series={[{ name: "Potássio", data: potassiumData }]}
            type="line"
            height={350}
          />
        </div>
      </div>
      <div className="">
        <h3>Níveis Combinados</h3>
        <Chart
          options={{
            ...chartOptions,
            colors: ["#2E8B57", "#3CB371", "#90EE90"],
          }}
          series={[
            { name: "Nitrogênio", data: nitrogenData },
            { name: "Fósforo", data: phosphorusData },
            { name: "Potássio", data: potassiumData },
          ]}
          type="line"
          height={350}
        />
      </div>
    </>
  );
};

export default RealTimeChart;
