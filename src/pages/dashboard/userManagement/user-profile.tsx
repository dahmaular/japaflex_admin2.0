import React from "react";

interface UserProfileProps {
  avatarUrl: string;
  name: string;
  username: string;
  verified?: boolean;
  bio: string;
  tags: string[];
  stats: {
    connections: string;
    posts: number;
    communities: number;
    media: number;
  };
  onSuspend?: () => void;
  onDelete?: () => void;

}

const UserProfile: React.FC<UserProfileProps> = ({
  avatarUrl,
  name,
  username,
  verified,
  bio,
  tags,
  stats,
  onDelete,
  onSuspend,
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 8,
      padding: "40px",
      margin: "0 0 36px 0",
      boxShadow: "0 1px 0 #e0e0e0",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={avatarUrl}
          alt={`${name} avatar`}
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            objectFit: "cover",
            marginRight: 24,
            background: "#eee",
          }}
        />
        <div>
          <div
            style={{ display: "flex", alignItems: "center", marginBottom: 4 }}
          >
            <span style={{ fontWeight: 600, fontSize: 22 }}>{name}</span>
            {verified && (
              <span
                style={{
                  display: "inline-block",
                  background: "#222",
                  color: "#fff",
                  borderRadius: "50%",
                  fontSize: 14,
                  padding: "2px 5px",
                  marginLeft: 8,
                  lineHeight: 1,
                }}
                title="Verified"
              >
                &#10003;
              </span>
            )}
          </div>
          <div style={{ color: "#616161", fontSize: 16, marginBottom: 8 }}>
            @{username}
          </div>
          <div style={{ color: "#444", fontSize: 15, maxWidth: 350 }}>
            {bio}
          </div>
          <div style={{ color: "#888", fontSize: 14, marginTop: 4 }}>
            {tags.map((tag) => (
              <span key={tag} style={{ marginRight: 8 }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div>

        <button
          onClick={onSuspend}
          style={{
            background: "#E74C3C",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 28px",
            fontSize: 16,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 1px 1px #eee",
          }}
        >
          Suspend Account
        </button>
        <button
          onClick={onDelete}
          style={{
            background: "#E74C3C",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "12px 28px",
            fontSize: 16,
            fontWeight: 500,
            cursor: "pointer",
            boxShadow: "0 1px 1px #eee",
            marginLeft: 10
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <StatBlock label="Connections" value={stats.connections} />
      <Divider />
      <StatBlock label="Posts" value={stats.posts} />
      <Divider />
      <StatBlock label="Communities" value={stats.communities} />
      <Divider />
      <StatBlock label="Media" value={stats.media} />
    </div>
  </div>
);

const StatBlock: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div style={{ textAlign: "center", minWidth: 90 }}>
    <div style={{ fontWeight: 600, fontSize: 22 }}>{value}</div>
    <div style={{ fontSize: 15, color: "#888" }}>{label}</div>
  </div>
);

const Divider: React.FC = () => (
  <div
    style={{ width: 1, height: 32, background: "#e0e0e0", margin: "0 28px" }}
  />
);

export default UserProfile;
