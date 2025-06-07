import React from 'react';
import './UserAnalysis.css';

const UserAnalysis: React.FC = () => {
  return (
    <div className="user-analysis">
      <h2>User Analysis</h2>
      
      <div className="donut-chart-container">
        <div className="donut-chart">
          <div className="donut-hole">64%</div>
        </div>
        
        <div className="chart-legend">
          <div className="legend-item">
            <div className="legend-color male"></div>
            <span>Male</span>
            <span className="percentage">64.2%</span>
          </div>
          <div className="legend-item">
            <div className="legend-color female"></div>
            <span>Female</span>
            <span className="percentage">48.6%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAnalysis;