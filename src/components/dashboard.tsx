"use client";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js/auto"; // Alteração nesta linha
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

  Chart.register(...registerables); 

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
    <div style={{ background: "000000", width: "100%", height: "100vh" }}>
      <div style={{ width: "100%", height: "50vh", background: "#000000" }}>
        {count?.map((response: any) => {
          const data = {
            labels: response?.history,
            datasets: [
              {
                data: response?.range,
                backgroundColor: "gray",
                label: `pergunta: ${response?.pergunta}`,
                borderColor: "#ff0000",
                tension: 0.5,
                fill: false,
                pointBorderColor: "white",
                pointBorderWidth: 3,
              },
            ],
          };
          return (
            <div style={{ background: "#000000", height: "50vh", width: "100%" }}>
              <Line data={data} options={opitions}></Line>
            </div>
          );
        })}
      </div>
    </div>
  );
}
