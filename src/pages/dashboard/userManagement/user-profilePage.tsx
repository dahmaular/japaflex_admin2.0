import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./user-profile";
import FeedPost from "./FeedPost";
import { useLazyGetUsersbyIdQuery } from "../../../store/apiSlice";

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

type UserData = {
  photo_url?: string;
  full_name?: string;
  username?: string;
  bio?: string;

  // Add other user properties as needed
};

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  console.log("userId:", userId);

  const [userData, setUserData] = React.useState<UserData | null>(null);

  const [getUsersbyId, { data, isLoading, error }] = useLazyGetUsersbyIdQuery();

  const fetchUserById = async () => {
    try {
      const response = await getUsersbyId({ id: userId ?? null }).unwrap();
      console.log("Fetched user data:", response);
      setUserData(response || null);
    } catch (err) {
      console.error("Error fetching user by ID:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserById();
    }
  }, [userId, getUsersbyId]);

  return (
    <div style={{ background: "#f7f7f7", minHeight: "100vh" }}>
      {/* <div
        style={{
          background: "#000",
          color: "#fff",
          fontSize: 15,
          padding: "12px 0 12px 32px",
          letterSpacing: 0.25,
        }}
      >
        User Management &gt; User Profile
      </div> */}
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
          avatarUrl={userData?.photo_url || ""}
          name={userData?.full_name || "Febsspp"}
          username={userData?.username || "'"}
          verified={true}
          bio={
            userData?.bio ||
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          }
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
};

export default UserProfilePage;
