import React from "react";
import UserProfile from "./user-profile";
import FeedPost from "./FeedPost";

const posts = [
  {
    avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Febsspp",
    verified: true,
    username: "febsspp",
    time: "14 minutes ago",
    location: "Dallas, Texas",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget urna eu neque tincidunt fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget urna eu neque tincidunt fermentum.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    likes: "1.2k",
    comments: 500,
    shares: 20,
  },
  {
    avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg",
    name: "Febsspp",
    verified: true,
    username: "febsspp",
    time: "14 minutes ago",
    location: "Dallas, Texas",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget urna eu neque tincidunt fermentum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget urna eu neque tincidunt fermentum.",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    likes: "1.2k",
    comments: 500,
    shares: 20,
  },
];

const UserProfilePage: React.FC = () => (
  <div style={{ background: "#f7f7f7", minHeight: "100vh" }}>
    <div
      style={{
        background: "#000",
        color: "#fff",
        fontSize: 15,
        padding: "12px 0 12px 32px",
        letterSpacing: 0.25,
      }}
    >
      User Management &gt; User Profile
    </div>
    <div
      style={{
        fontWeight: 700,
        fontSize: 32,
        margin: "24px 0 0 38px",
        color: "#222",
      }}
    >
      User Profile
    </div>
    <div style={{ margin: "30px 0 0 0" }}>
      <UserProfile
        avatarUrl="https://randomuser.me/api/portraits/women/12.jpg"
        name="Phoebe Paul"
        username="febsspp"
        verified={true}
        bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc ullamcorper vulputate ligula et consectetur."
        tags={["Photography", "Model"]}
        stats={{ connections: "50K", posts: 2, communities: 2, media: 20 }}
        onSuspend={() => alert("Suspend Account clicked")}
      />
    </div>
    <div style={{ maxWidth: 900, margin: "0 auto", marginTop: 18 }}>
      {posts.map((post, idx) => (
        <FeedPost key={idx} {...post} />
      ))}
    </div>
  </div>
);

export default UserProfilePage;
