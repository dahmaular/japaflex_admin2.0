import React, { useRef, useEffect } from "react";
import "./AnalyticsChart.css";

const AnalyticsChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set dimensions
    const width = canvas.width;
    const height = canvas.height;

    // Grid lines (light)
    ctx.beginPath();
    ctx.strokeStyle = "rgba(229, 231, 235, 0.5)";
    ctx.lineWidth = 1;

    // Horizontal grid lines
    for (let y = 0; y < height; y += height / 6) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    // Vertical grid lines for months
    for (let i = 0; i <= 12; i++) {
      const x = (width / 12) * i;
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();

    // Draw active users line (green)
    ctx.beginPath();
    ctx.moveTo(0, height * 0.7);
    ctx.bezierCurveTo(
      width * 0.1,
      height * 0.6,
      width * 0.2,
      height * 0.5,
      width * 0.3,
      height * 0.4
    );
    ctx.bezierCurveTo(
      width * 0.4,
      height * 0.3,
      width * 0.5,
      height * 0.5,
      width * 0.6,
      height * 0.2
    );
    ctx.bezierCurveTo(
      width * 0.7,
      height * 0.1,
      width * 0.8,
      height * 0.3,
      width * 0.9,
      height * 0.4
    );
    ctx.bezierCurveTo(
      width * 0.95,
      height * 0.5,
      width,
      height * 0.3,
      width,
      height * 0.3
    );
    ctx.strokeStyle = "#4CAF50";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw inactive users line (red)
    ctx.beginPath();
    ctx.moveTo(0, height * 0.5);
    ctx.bezierCurveTo(
      width * 0.1,
      height * 0.4,
      width * 0.2,
      height * 0.3,
      width * 0.3,
      height * 0.2
    );
    ctx.bezierCurveTo(
      width * 0.4,
      height * 0.1,
      width * 0.5,
      height * 0.3,
      width * 0.6,
      height * 0.5
    );
    ctx.bezierCurveTo(
      width * 0.7,
      height * 0.7,
      width * 0.8,
      height * 0.5,
      width * 0.9,
      height * 0.6
    );
    ctx.bezierCurveTo(
      width * 0.95,
      height * 0.7,
      width,
      height * 0.6,
      width,
      height * 0.5
    );
    ctx.strokeStyle = "#FF5252";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw data point highlight
    const highlightX = width * 0.6;
    const highlightY = height * 0.2;

    // Draw point marker
    ctx.beginPath();
    ctx.arc(highlightX, highlightY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#333";
    ctx.fill();

    // Draw data label
    ctx.fillStyle = "#fff";
    ctx.fillRect(highlightX - 20, highlightY - 30, 40, 20);

    ctx.font = "12px Arial";
    ctx.fillStyle = "#333";
    ctx.textAlign = "center";
    ctx.fillText("19K", highlightX, highlightY - 16);

    // Draw month labels
    const months = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ];
    ctx.fillStyle = "#6B7280";
    ctx.font = "10px Arial";

    months.forEach((month, i) => {
      const x = (width / 12) * i + width / 24;
      ctx.fillText(month, x, height - 5);
    });

    // Draw Y-axis labels
    const yLabels = ["0", "500", "1K", "1.5K", "2K", "2.5K", "3K"];
    ctx.textAlign = "right";

    yLabels.forEach((label, i) => {
      const y = height - (height / (yLabels.length - 1)) * i;
      ctx.fillText(label, 30, y);
    });
  }, []);

  return (
    <div className="analytics-chart">
      <canvas ref={canvasRef} width="700" height="250"></canvas>
    </div>
  );
};

export default AnalyticsChart;
