import React from "react";
import styles from "./UserChart.module.css";

interface UserChartProps {
  data: { name: string; active: number; inactive: number }[];
}

const UserChart = ({ data }: UserChartProps): React.ReactElement => {
  const width = 800;
  const height = 260;
  const padding = { top: 20, right: 30, bottom: 30, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  // Find min and max values for scaling
  const allValues = data.flatMap((d) => [d.active, d.inactive]);
  const maxValue = Math.max(...allValues);
  const minValue = 0; // Starting from 0 for better visualization

  // Create points for both lines
  const createPoints = (key: "active" | "inactive") => {
    return data.map((d, i) => ({
      x: (i / (data.length - 1)) * chartWidth + padding.left,
      y:
        height -
        padding.bottom -
        ((d[key] - minValue) / (maxValue - minValue)) * chartHeight,
    }));
  };

  const activePoints = createPoints("active");
  const inactivePoints = createPoints("inactive");

  // Create SVG path from points
  const createPath = (points: { x: number; y: number }[]) => {
    return points
      .map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`))
      .join(" ");
  };

  // Generate x-axis labels
  const xLabels = data.map((d, i) => ({
    x: (i / (data.length - 1)) * chartWidth + padding.left,
    label: d.name,
  }));

  // Generate y-axis labels
  const yLabels = Array.from({ length: 5 }, (_, i) => {
    const value = Math.round(((maxValue - minValue) * i) / 4 + minValue);
    return {
      y: height - padding.bottom - (i / 4) * chartHeight,
      label: value.toString(),
    };
  });

  return (
    <div className={styles.chartContainer}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Grid lines */}
        {yLabels.map((label, i) => (
          <React.Fragment key={i}>
            <line
              x1={padding.left}
              y1={label.y}
              x2={width - padding.right}
              y2={label.y}
              stroke="#e5e7eb"
              strokeDasharray="4"
            />
            <text
              x={padding.left - 10}
              y={label.y}
              textAnchor="end"
              alignmentBaseline="middle"
              className={styles.label}
            >
              {label.label}
            </text>
          </React.Fragment>
        ))}

        {/* X-axis labels */}
        {xLabels.map((label, i) => (
          <text
            key={i}
            x={label.x}
            y={height - padding.bottom + 20}
            textAnchor="middle"
            className={styles.label}
          >
            {label.label}
          </text>
        ))}

        {/* Active users line */}
        <path
          d={createPath(activePoints)}
          fill="none"
          stroke="#16a34a"
          strokeWidth="2"
        />

        {/* Inactive users line */}
        <path
          d={createPath(inactivePoints)}
          fill="none"
          stroke="#fb923c"
          strokeWidth="2"
        />

        {/* Data points for active users */}
        {activePoints.map((point, i) => (
          <circle
            key={`active-${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#16a34a"
          />
        ))}

        {/* Data points for inactive users */}
        {inactivePoints.map((point, i) => (
          <circle
            key={`inactive-${i}`}
            cx={point.x}
            cy={point.y}
            r="4"
            fill="#fb923c"
          />
        ))}
      </svg>

      {/* Legend */}
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <span
            className={styles.legendColor}
            style={{ backgroundColor: "#16a34a" }}
          />
          <span>Active Users</span>
        </div>
        <div className={styles.legendItem}>
          <span
            className={styles.legendColor}
            style={{ backgroundColor: "#fb923c" }}
          />
          <span>Inactive Users</span>
        </div>
      </div>
    </div>
  );
};

export default UserChart;
