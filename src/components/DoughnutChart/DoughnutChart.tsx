import React from "react";
import styles from "./DoughnutChart.module.css";

interface DoughnutChartProps {
  data: { name: string; value: number; color: string }[];
  centerLabel: string;
  centerValue: string;
}

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, centerLabel, centerValue }) => {
  const size = 220;
  const strokeWidth = 30;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  
  // Calculate total for percentages
  const total = data.reduce((sum, d) => sum + d.value, 0);
  
  // Convert data to SVG arcs
  let currentAngle = 0;
  const paths = data.map((item) => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    
    // Calculate path coordinates
    const startX = center + radius * Math.cos((currentAngle - 90) * Math.PI / 180);
    const startY = center + radius * Math.sin((currentAngle - 90) * Math.PI / 180);
    const endX = center + radius * Math.cos((currentAngle + angle - 90) * Math.PI / 180);
    const endY = center + radius * Math.sin((currentAngle + angle - 90) * Math.PI / 180);
    
    // Create SVG arc path
    const largeArc = angle > 180 ? 1 : 0;
    const path = [
      `M ${startX} ${startY}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${endX} ${endY}`,
    ].join(" ");
    
    const result = {
      path,
      color: item.color,
    };
    
    currentAngle += angle;
    return result;
  });

  return (
    <div className={styles.doughnutContainer}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {paths.map((p, i) => (
          <path
            key={i}
            d={p.path}
            fill="none"
            stroke={p.color}
            strokeWidth={strokeWidth}
          />
        ))}
      </svg>
      <div className={styles.centerLabel}>
        <span className={styles.value}>{centerValue}</span>
        <span className={styles.label}>{centerLabel}</span>
      </div>
      <div className={styles.legend}>
        {data.map((item, index) => (
          <div key={index} className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ backgroundColor: item.color }}
            />
            <span className={styles.legendLabel}>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChart;
