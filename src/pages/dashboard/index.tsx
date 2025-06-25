import React, { useState } from "react";
import "./styles.css";
import StatCard from "./components/StatCard";
import AnalyticsChart from "./components/AnalyticsChart";
import UserAnalysisChart from "./components/UserAnalysisChart";
import UsersTable from "./components/UsersTable";
import { useGetAllUsersQuery } from "../../store/apiSlice";

const Dashboard: React.FC = () => {
  const [activeTimeFilter, setActiveTimeFilter] = useState<"week" | "year">(
    "week"
  );

  const { data, isLoading } = useGetAllUsersQuery();

  console.log("Users", data);

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
        <p className="subtitle">Here is an overview of your dashboard</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Active Users"
          value="20,000"
          change="-22%"
          period="This week"
        />
        <StatCard
          title="Flagged Users"
          value="20,000"
          change="-22%"
          period="This week"
        />
        <StatCard
          title="Banned Users"
          value="20,000"
          change="-22%"
          period="This week"
        />
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Promoted Post"
          value="20,000"
          change="-22%"
          period="This week"
        />
        <StatCard
          title="Total Active Adverts"
          value="300"
          change="-22%"
          period="This week"
        />
        <StatCard
          title="Live Users"
          value="20,000"
          change="-22%"
          period="This week"
        />
      </div>

      <div className="charts-container">
        <div className="analytics-section">
          <div className="section-header">
            <h2>Analytics</h2>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="color-indicator active"></div>
                <span>Active Users</span>
              </div>
              <div className="legend-item">
                <div className="color-indicator inactive"></div>
                <span>Inactive Users</span>
              </div>
            </div>
            <div className="time-filter">
              <button
                className={`filter-btn ${
                  activeTimeFilter === "week" ? "active" : ""
                }`}
                onClick={() => setActiveTimeFilter("week")}
              >
                Week
              </button>
              <button
                className={`filter-btn ${
                  activeTimeFilter === "year" ? "active" : ""
                }`}
                onClick={() => setActiveTimeFilter("year")}
              >
                Year
              </button>
            </div>
          </div>
          <AnalyticsChart />
        </div>

        <div className="user-analysis-section">
          <h2>User Analysis</h2>
          <UserAnalysisChart />
        </div>
      </div>

      <div className="users-section">
        <div className="section-header">
          <h2>Users</h2>
          <div className="actions">
            <button className="filter-action">
              <span>Filter</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14 2H2L6.8 7.6V12.4L9.2 13.6V7.6L14 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
            </button>
            <div className="time-filter">
              <button
                className={`filter-btn ${
                  activeTimeFilter === "week" ? "active" : ""
                }`}
                onClick={() => setActiveTimeFilter("week")}
              >
                Week
              </button>
              <button
                className={`filter-btn ${
                  activeTimeFilter === "year" ? "active" : ""
                }`}
                onClick={() => setActiveTimeFilter("year")}
              >
                Year
              </button>
            </div>
          </div>
        </div>
        <UsersTable />
      </div>
    </>
  );
};

export default Dashboard;
