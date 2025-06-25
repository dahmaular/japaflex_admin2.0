import React from "react";
import { useNavigate } from "react-router-dom";
import "./UsersTable.css";

export interface User {
  id: number;
  photo_url: string;
  initial: string;
  full_name: string;
  email: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  created_at: string;
  role?: string | null; // Optional role field
}

interface UsersTableProps {
  users?: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const navigate = useNavigate();

  console.log("UsersTable data:", users);

  const handleRowClick = (userId: number) => {
    navigate(`/user-management/user-profilePage/${userId}`);
  };

  function formatDate(dateString: string) {
    // Accepts 'DD-MM-YYYY' or ISO, returns 'Mon DD, YYYY'
    let dateObj;
    if (/\d{2}-\d{2}-\d{4}/.test(dateString)) {
      const [day, month, year] = dateString.split("-");
      dateObj = new Date(Number(year), Number(month) - 1, Number(day));
    } else {
      dateObj = new Date(dateString);
    }
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className="users-table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th className="checkbox-column">
              <input type="checkbox" />
            </th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Date Created</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr
              key={user.id}
              onClick={() =>
                user?.role === "admin" || user?.role === "super-admin"
                  ? null
                  : handleRowClick(user.id)
              }
              style={{ cursor: "pointer" }}
            >
              <td
                className="checkbox-column"
                onClick={(e) => e.stopPropagation()}
              >
                <input type="checkbox" />
              </td>
              <td>
                <div className="user-info">
                  <img src={user?.photo_url} alt="user-photo" height={30} width={30} className="user-avatar" />
                  <span>{user.full_name}</span>
                </div>
              </td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.dateOfBirth ?? "N/A"}</td>
              <td>{user.gender ?? "N/A"}</td>
              <td>{formatDate(user.created_at)}</td>
              <td onClick={(e) => e.stopPropagation()}>
                <button className="more-options">⋮</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
