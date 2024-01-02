"use client";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  BarElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { opitions } from "./middleware/configChart";
import { BASEAPI } from "@/services/api";
export default function GraphChart() {
  const [count, setCount] = useState<any | undefined>();
  const socket = io("http://localhost:8080/", {
    transports: ["websocket"],
  });

  Chart.register(
    LineElement,
    CategoryScale,
    PointElement,
    LinearScale,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );

  useEffect(() => {
    axios.get(`${BASEAPI}/get`).then((data) => {
      setCount(data.data.data[0].company);
    });
  }, []);
  useEffect(() => {
    socket.on("admin", (data) => {
      setCount(data.company);
    });
  }, [socket]);

  return (
    <>
      <div style={{ width: "80%", height: "80vh" }}>
        {count?.map((response: any) => {
          const data = {
            labels: response?.history,
            datasets: [
              {
                data: response?.range,
                backgroundColor: "blue",
                label: `pergunta: ${response?.pergunta}`,
                borderColor: "blue",
                tension: 0.5,
                fill: false,
                pointBorderColor: "#E6E6E6",
                pointBorderWidth: 5,
              },
            ],
          };
          return <Line data={data} options={opitions}></Line>;
        })}
      </div>
    </>
  );
}
