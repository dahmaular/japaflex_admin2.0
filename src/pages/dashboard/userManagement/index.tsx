import React, { useState } from "react";
import UsersTable from "../components/UsersTable";
import { useGetAllUsersQuery } from "../../../store/apiSlice";

function Users() {
  const [activeTimeFilter, setActiveTimeFilter] = useState<"week" | "year">(
    "week"
  );

  const { data, isLoading } = useGetAllUsersQuery();

  console.log("Users", data);

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
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 200,
            }}
          >
            <div
              className="spinner"
              style={{
                width: 40,
                height: 40,
                border: "4px solid #eee",
                borderTop: "4px solid #3A7145",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
              }}
            />
            <style>
              {`@keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }`}
            </style>
          </div>
        ) : (
          <UsersTable users={data} />
        )}
      </div>
    </>
  );
}

export default Users;
