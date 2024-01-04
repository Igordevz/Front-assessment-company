## Performance Evaluation System

This project includes a Next.js frontend with two main pages: Feedback and Dashboard. The Feedback page is exclusive to clients, allowing them to evaluate different aspects. The Dashboard is intended for the owner, presenting graphs based on these evaluations.

### How to Use - Frontend

#### Installation

Make sure to have the necessary dependencies installed using npm:

```bash
npm install react-chartjs-2 chart.js socket.io-client axios
```

#### Configuration

The code below presents the main components:

### Feedback

The Feedback page allows clients to evaluate different aspects of the service.

```javascript
// File: pages/feedback.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { BASEAPI } from '@/services/api';
import "./globals.css";

export default function Feedback() {
  const [res, setRes] = useState("");
  const [range1, setRange1] = useState(0);
  const [range2, setRange2] = useState(0);

  async function PostFeedback1() {
    await axios.post(`${BASEAPI}/chart`, {
      range: range1,
      pergunta: "1"
    }).then(() => {
      setRes("Thank you for your feedback!");
    }).catch(err => {
      console.log(err);
    });
  }

  async function PostFeedback2() {
    await axios.post(`${BASEAPI}/chart`, {
      range: range2,
      pergunta: "2"
    }).then(() => {
      setRes("Thank you for your feedback!");
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <main>
      <div className="container-top">
        <h1>Leave Your Feedback</h1>
        <p>Give your Evaluation from 0 to 10</p>
      </div>
      <div className="container-form">
        <form>
          <label htmlFor="atendimento">
            <strong>Question 1:</strong> What rating would you give our service?
          </label>
          <input
            type="range"
            id="atendimento"
            onChange={(e: any) => setRange1(e.target.value)}
            min={0}
            max={10}
            value={range1}
          />
          <button onClick={(e) => {
            e.preventDefault();
            PostFeedback1();
          }}>Submit</button>
          <h2 style={{ display: "flex", alignItems: "center" }}>Stars: {range1} <strong style={{ fontSize: 15, marginLeft: 10, color: "#dedede" }}>{res}</strong></h2>
        </form>
        <form>
          <label htmlFor="satisfacao">
            <strong>Question 2:</strong> How satisfied are you with your purchase?
          </label>
          <input
            type="range"
            id="satisfacao"
            onChange={(e: any) => setRange2(e.target.value)}
            min={0}
            max={10}
            value={range2}
          />
          <button onClick={(e) => {
            e.preventDefault();
            PostFeedback2();
          }}>Submit</button>
          <h2 style={{ display: "flex", alignItems: "center" }}>Stars: {range2} <strong style={{ fontSize: 15, marginLeft: 10, color: "#dedede" }}>{res}</strong></h2>
        </form>
      </div>
    </main>
  );
}
```
![image](https://github.com/Igordevz/Front-assessment-company/assets/111516927/6ae6e316-f4b6-414d-8077-ccf4257ab4a4)

### Dashboard

The Dashboard is intended for the owner and presents graphs based on customer evaluations.

```javascript
// File: pages/dashboard.tsx

import React from 'react';
import GraphChart from '@/components/dashboard';
import "./globals.css";

export default function Dashboard() {
  return (
    <main>
      <GraphChart />
    </main>
  );
}
```

### GraphChart Component

The `GraphChart` component renders the graphs on the Dashboard.

```javascript
// File: components/dashboard.tsx

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js/auto";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { options } from "./middleware/configChart";
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
                label: `Question: ${response?.pergunta}`,
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
              <Line data={data} options={options}></Line>
            </div>
          );
        })}
      </div>
    </div>
  );
}
```
![image](https://github.com/Igordevz/Front-assessment-company/assets/111516927/2a2377a9-aa94-4920-b507-85617a84c85c)


# Summary of Folders

## Dashboard

```plaintext
+----------------------+
|      Dashboard       |
|                      |
|   +--------------+   |
|   |   GraphChart |   |
|   +--------------+   |
|                      |
+----------------------+
```

## Feedback

```plaintext
+----------------------+
|       Feedback       |
|                      |
| +--------------+     |
| |  Pergunta 1  |     |
| |  (Avaliação) |     |
| +--------------+     |
|                      |
| +--------------+     |
| |  Pergunta 2  |     |
| |  (Satisfação) |    |
| +--------------+     |
|                      |
+----------------------+
```
this project not responsive
