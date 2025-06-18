import React from "react";
import { EmailMessage } from "../types/email.types";
import styles from "./MessageHeader.module.css";
import { StarIcon, StarOffIcon, ReplyIcon, MoreIcon } from "../icons";

interface MessageHeaderProps {
  message: EmailMessage;
}

const MessageHeader: React.FC<MessageHeaderProps> = ({ message }) => {
  return (
    <div className={styles.header}>
      <div className={styles.subject}>{message.subject}</div>
      <div className={styles.meta}>
        <span className={styles.inboxLabel}>Inbox</span>
        <span className={styles.sender}>{message.sender.name}</span>
        <span className={styles.timestamp}>{message.timestamp.toLocaleString()}</span>
        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label={message.isStarred ? "Unstar" : "Star"}>
            {message.isStarred ? <StarIcon size={20} color="#fbbf24" /> : <StarOffIcon size={20} color="#bdbdbd" />}
          </button>
          <button className={styles.iconBtn} aria-label="Reply">
            <ReplyIcon size={20} />
          </button>
          <button className={styles.iconBtn} aria-label="More options">
            <MoreIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
