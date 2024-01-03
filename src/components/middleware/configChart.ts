import { Chart } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(zoomPlugin);

export const opitions = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'xy',
          speed: 10,
          threshold: 10
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
        }
      },
      legend: {
        labels: {
          font: {
            color: "white",
            size: 34,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
  };
