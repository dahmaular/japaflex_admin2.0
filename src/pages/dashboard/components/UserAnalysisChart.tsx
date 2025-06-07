import React from "react";
import "./UserAnalysisChart.css";

const UserAnalysisChart: React.FC = () => {
  const malePercentage = 64.2;
  const femalePercentage = 48.6;

  return (
    <div className="user-analysis-chart">
      <div className="donut-chart">
        <div className="donut-hole">
          <span>64%</span>
        </div>
      </div>

      <div className="gender-legend">
        <div className="gender-item">
          <div className="gender-marker male"></div>
          <span className="gender-label">Male</span>
          <span className="gender-value">{malePercentage}%</span>
        </div>
        <div className="gender-item">
          <div className="gender-marker female"></div>
          <span className="gender-label">Female</span>
          <span className="gender-value">{femalePercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default UserAnalysisChart;
