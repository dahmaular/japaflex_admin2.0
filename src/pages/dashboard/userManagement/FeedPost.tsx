import React from "react";

interface FeedPostProps {
  photo_url: string;
  name: string;
  is_verified?: boolean;
  username: string;
  time: string;
  location: string;
  content: string;
  image_url: string[];
  likes: number | string;
  comments: number | string;
  shares: number | string;
}

const FeedPost: React.FC<FeedPostProps> = ({
  photo_url,
  name,
  is_verified,
  username,
  time,
  location,
  content,
  image_url,
  likes,
  comments,
  shares,
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 16,
      padding: "24px 28px 16px 28px",
      marginBottom: 30,
      boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
      maxWidth: 800,
      marginLeft: "auto",
      marginRight: "auto",
    }}
  >
    <div
      style={{ display: "flex", alignItems: "flex-start", marginBottom: 10 }}
    >
      <img
        src={photo_url}
        alt={`${name} avatar`}
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          objectFit: "cover",
          marginRight: 14,
          background: "#eee",
        }}
      />
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontWeight: 600, fontSize: 17 }}>{name}</span>
          {is_verified && (
            <span
              style={{
                display: "inline-block",
                background: "#222",
                color: "#fff",
                borderRadius: "50%",
                fontSize: 13,
                padding: "1px 4px",
                marginLeft: 7,
                lineHeight: 1,
              }}
              title="Verified"
            >
              &#10003;
            </span>
          )}
          <span style={{ color: "#888", fontSize: 15, marginLeft: 10 }}>
            @{username}
          </span>
          <span style={{ color: "#888", fontSize: 14, marginLeft: 8 }}>
            {time}
          </span>
        </div>
        <div style={{ color: "#888", fontSize: 15, marginTop: 2 }}>
          {location}
        </div>
      </div>
      <div
        style={{
          fontSize: 22,
          color: "#888",
          cursor: "pointer",
          marginLeft: 10,
        }}
      >
        ...
      </div>
    </div>
    <div style={{ color: "#444", fontSize: 16, marginBottom: 16 }}>
      {content}
    </div>
    <img
      src={image_url[0]}
      alt="Post"
      style={{
        width: "100%",
        borderRadius: 12,
        objectFit: "cover",
        marginBottom: 10,
        maxHeight: 320,
      }}
    />
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 32,
        color: "#888",
        fontSize: 15,
        marginTop: 6,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <LikeIcon />
        <span>{likes}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <CommentIcon />
        <span>{comments}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
        <ShareIcon />
        <span>{shares}</span>
      </div>
      <div style={{ marginLeft: "auto", cursor: "pointer", fontSize: 18 }}>
        <BookmarkIcon />
      </div>
    </div>
  </div>
);

// Icon SVGs
const LikeIcon: React.FC = () => (
  <svg height="18" width="18" viewBox="0 0 20 20" style={{ marginRight: 2 }}>
    <path
      d="M10 18s-6.2-5.1-8.5-7.8C-1.3 6.9 4.6 2 10 7.3 15.4 2 21.3 6.9 18.5 10.2 16.2 12.9 10 18 10 18z"
      fill="#888"
      stroke="#888"
      strokeWidth="1"
    />
  </svg>
);

const CommentIcon: React.FC = () => (
  <svg height="18" width="18" viewBox="0 0 20 20" style={{ marginRight: 2 }}>
    <path
      d="M10 18c-4.418 0-8-2.91-8-6.5S5.582 5 10 5s8 2.91 8 6.5S14.418 18 10 18zm0-12C5.589 6 2 8.462 2 11.5c0 2.248 2.946 4.5 8 4.5s8-2.252 8-4.5C18 8.462 14.411 6 10 6z"
      fill="#888"
      stroke="#888"
      strokeWidth="0.5"
    />
  </svg>
);

const ShareIcon: React.FC = () => (
  <svg height="18" width="18" viewBox="0 0 20 20" style={{ marginRight: 2 }}>
    <path
      d="M15 8v-2a3 3 0 1 0-6 0v2H6v10h8V8h-1zm-6-2a2 2 0 1 1 4 0v2h-4V6zm7 2v10a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1v-2a4 4 0 1 1 8 0v2h1a1 1 0 0 1 1 1z"
      fill="#888"
    />
  </svg>
);

const BookmarkIcon: React.FC = () => (
  <svg height="20" width="20" viewBox="0 0 20 20">
    <path
      d="M5 3a2 2 0 0 0-2 2v14l7-5 7 5V5a2 2 0 0 0-2-2H5zm0 2h10v11.764l-5-3.571-5 3.571V5z"
      fill="#888"
    />
  </svg>
);

export default FeedPost;
