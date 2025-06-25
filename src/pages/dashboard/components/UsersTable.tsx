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

const mockUsers: User[] = [
  {
    id: 1,
    photo_url: "#FF5252",
    initial: "J",
    full_name: "Jane Smith",
    email: "jane@japaflex.com",
    username: "jane20",
    dateOfBirth: "06-03-1990",
    gender: "Male",
    created_at: "12-03-2024",
  },
  {
    id: 2,
    photo_url: "#4CAF50",
    initial: "C",
    full_name: "Cody Fisher",
    email: "cody@japaflex.com",
    username: "Codyfishpie",
    dateOfBirth: "24-05-1973",
    gender: "Male",
    created_at: "12-03-2024",
  },
  {
    id: 3,
    photo_url: "#00BCD4",
    initial: "J",
    full_name: "Jane Cooper",
    email: "cooper@japaflex.com",
    username: "Coops12",
    dateOfBirth: "12-10-1994",
    gender: "Female",
    created_at: "12-03-2024",
  },
  {
    id: 4,
    photo_url: "#9C27B0",
    initial: "K",
    full_name: "Kristin Watson",
    email: "kristinw@japaflex.com",
    username: "Krist3ne",
    dateOfBirth: "14-08-1996",
    gender: "Male",
    created_at: "12-03-2024",
  },
  {
    id: 5,
    photo_url: "#673AB7",
    initial: "D",
    full_name: "Dianne Russell",
    email: "dianne@japaflex.com",
    username: "Theavenger",
    dateOfBirth: "08-01-1989",
    gender: "Female",
    created_at: "12-03-2024",
  },
  {
    id: 6,
    photo_url: "#FFC107",
    initial: "D",
    full_name: "Darrell Steward",
    email: "darrellsteward@gmail.com",
    username: "Steward12",
    dateOfBirth: "20-04-1992",
    gender: "Male",
    created_at: "12-03-2024",
  },
];

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const navigate = useNavigate();
  const data = users && users.length > 0 ? users : mockUsers;

  console.log("UsersTable data:", data);

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
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
                  <div
                    className="user-avatar"
                    style={{ backgroundColor: user.photo_url, color: "#fff" }}
                  >
                    {user.photo_url}
                  </div>
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
