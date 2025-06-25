import React, { useState } from "react";
import UsersTable from "../components/UsersTable";

function Users() {
  const [activeTimeFilter, setActiveTimeFilter] = useState<"week" | "year">(
    "week"
  );

  return (
    <>
      <div className="page-header">
        <h1>All Users</h1>
        <p className="subtitle">Here is an overview of your dashboard</p>
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
                className={`filter-btn ${activeTimeFilter === "week" ? "active" : ""
                  }`}
                onClick={() => setActiveTimeFilter("week")}
              >
                Week
              </button>
              <button
                className={`filter-btn ${activeTimeFilter === "year" ? "active" : ""
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
}

export default Users;
