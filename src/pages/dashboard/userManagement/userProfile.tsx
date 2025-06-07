import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface User {
  id: number;
  avatarBg: string;
  initial: string;
  fullName: string;
  email: string;
  username: string;
  dateOfBirth: string;
  gender: string;
  dateCreated: string;
}

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real application, you would fetch user data from an API
    // For now, we'll simulate with mock data
    const mockUsers: User[] = [
      {
        id: 1,
        avatarBg: "#FF5252",
        initial: "J",
        fullName: "Jane Smith",
        email: "jane@japaflex.com",
        username: "jane20",
        dateOfBirth: "06-03-1990",
        gender: "Male",
        dateCreated: "12-03-2024",
      },
      {
        id: 2,
        avatarBg: "#4CAF50",
        initial: "C",
        fullName: "Cody Fisher",
        email: "cody@japaflex.com",
        username: "Codyfishpie",
        dateOfBirth: "24-05-1973",
        gender: "Male",
        dateCreated: "12-03-2024",
      },
      // Add more users as needed
    ];

    const foundUser = mockUsers.find((u) => u.id === parseInt(userId || "0"));
    setUser(foundUser || null);
    setLoading(false);
  }, [userId]);

  if (loading) {
    return <div>Loading user information...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <div className="page-header">
        <h1>User Profile</h1>
        <p className="subtitle">Details for {user.fullName}</p>
      </div>

      <div className="user-profile-section">
        <div className="profile-header">
          <div
            className="user-avatar-large"
            style={{
              backgroundColor: user.avatarBg,
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "32px",
              color: "white",
              marginRight: "20px",
            }}
          >
            {user.initial}
          </div>
          <div className="user-details">
            <h2>{user.fullName}</h2>
            <p>@{user.username}</p>
          </div>
        </div>

        <div className="profile-info">
          <div className="info-section">
            <h3>Contact Information</h3>
            <div className="info-row">
              <span className="info-label">Email:</span>
              <span className="info-value">{user.email}</span>
            </div>
          </div>

          <div className="info-section">
            <h3>Personal Information</h3>
            <div className="info-row">
              <span className="info-label">Date of Birth:</span>
              <span className="info-value">{user.dateOfBirth}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Gender:</span>
              <span className="info-value">{user.gender}</span>
            </div>
          </div>

          <div className="info-section">
            <h3>Account Information</h3>
            <div className="info-row">
              <span className="info-label">Date Created:</span>
              <span className="info-value">{user.dateCreated}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
