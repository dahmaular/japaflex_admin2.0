import React from "react";
import styles from "./ContentList.module.css";
import { Heart, MessageCircle, Share2, Eye } from "lucide-react";

interface Post {
  id: string;
  thumbnail: string;
  username: string;
  date: string;
  likes: number;
  comments: number;
  shares: number;
  views: number;
}

interface ContentListProps {
  posts: Post[];
}

const ContentList: React.FC<ContentListProps> = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return (
      <div className={styles.listContainer}>
        <h3 className={styles.title}>Content of the Day</h3>
        <p>No content available</p>
      </div>
    );
  }

  return (
    <div className={styles.listContainer}>
      <h3 className={styles.title}>Content of the Day</h3>
      <ul className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} className={styles.item}>
            <img
              src={post.thumbnail}
              alt="thumbnail"
              className={styles.thumbnail}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/48";
              }}
            />
            <div className={styles.info}>
              <div className={styles.userRow}>
                <span className={styles.username}>{post.username}</span>
                <span className={styles.date}>{post.date}</span>
              </div>
              <div className={styles.statsRow}>
                <span>
                  <Heart size={14} /> {post.likes}
                </span>
                <span>
                  <MessageCircle size={14} /> {post.comments}
                </span>
                <span>
                  <Share2 size={14} /> {post.shares}
                </span>
                <span>
                  <Eye size={14} /> {post.views}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentList;
