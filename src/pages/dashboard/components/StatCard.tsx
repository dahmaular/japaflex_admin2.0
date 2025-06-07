import React from "react";
import "./StatCard.css";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  period: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  period,
}) => {
  return (
    <div className="stat-card">
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <div className="percent-change">{change}</div>
      </div>
      <div className="value">{value}</div>
      <div className="period">{period}</div>
    </div>
  );
};

export default StatCard;
