import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import UserProfile from "./user-profile";
import FeedPost from "./FeedPost";
import {
  useDeleteUserMutation,
  useLazyGetUserPostsQuery,
  useLazyGetUsersbyIdQuery,
  useUpdateUserStatusMutation,
} from "../../../store/apiSlice";
import Loader from "../../../ui/Loader";
import { toast } from "sonner";

type UserData = {
  photo_url?: string;
  full_name?: string;
  username?: string;
  bio?: string;
  communities_count?: number;
  posts_count?: number;
  connections_count?: number;
  media_count?: number;
  // Add other user properties as needed
};

const UserProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const [userData, setUserData] = React.useState<UserData | null>(null);

  const [getUsersbyId, { isLoading }] = useLazyGetUsersbyIdQuery();
  const [getUserPosts, { data: posts, isLoading: fetchingPosts }] =
    useLazyGetUserPostsQuery();
  const [deleteUser, { isLoading: deletingUser, isSuccess: isDeleted, error }] =
    useDeleteUserMutation();
  const [updateUserStatus, { isSuccess, error: suspendError, data }] = useUpdateUserStatusMutation();

  const fetchUserById = async () => {
    try {
      const response = await getUsersbyId({ id: userId ?? null }).unwrap();
      setUserData(response || null);
    } catch (err) {
      console.error("Error fetching user by ID:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserById();
      getUserPosts(userId);
    }
  }, [userId, getUsersbyId, getUserPosts]);

  useEffect(() => {
    if (error) {
      toast.error((error as any)?.data?.error || "An error occured");
    }
    if (isDeleted) {
      toast.success("Account deleted successfully");
      setTimeout(
        () => (window.location.href = "/user-management/all-users"),
        2000
      );
    }

  }, [error, isDeleted]);

  const onDelete = () => {
    if (userId) {
      deleteUser(userId);
    }
  };

  const onSuspend = () => {
    if (userId) {
      updateUserStatus({
        id: userId,
        status: 'flagged'
      })
    }
  }

  const { posts_count, communities_count, media_count, connections_count } =
    userData ?? {};

  if (isLoading) {
    return <Loader />;
  }

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
          stats={{
            connections: String(connections_count ?? 0),
            posts: posts_count ?? 0,
            communities: communities_count ?? 0,
            media: media_count ?? 0,
          }}
          onSuspend={onSuspend}
          onDelete={onDelete}
          loading={deletingUser}
        />
      </div>
      <div style={{ maxWidth: 900, margin: "0 auto", marginTop: 18 }}>
        {!fetchingPosts && !posts?.length ? (
          <>
            <h2 style={{ margin: "0 auto", textAlign: "center" }}>
              No Posts Found
            </h2>
          </>
        ) : (
          posts?.map((post: any, idx: number) => (
            <FeedPost key={idx} {...post} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfilePage;
