import React from "react";
import { EmailMessage } from "../types/email.types";
import styles from "./MessageItem.module.css";

interface MessageItemProps {
  message: EmailMessage;
  selected: boolean;
  onClick: () => void;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, selected, onClick }) => {
  return (
    <li
      className={selected ? `${styles.messageItem} ${styles.selected}` : styles.messageItem}
      onClick={onClick}
      tabIndex={0}
      role="option"
      aria-selected={selected}
    >
      <div className={styles.avatarSection}>
        <div className={message.sender.isOnline ? styles.onlineDot : styles.offlineDot}></div>
        <div className={styles.avatar}>{message.sender.avatar ? <img src={message.sender.avatar} alt={message.sender.name} /> : message.sender.name[0]}</div>
      </div>
      <div className={styles.contentSection}>
        <div className={styles.sender}>{message.sender.name}</div>
        <div className={styles.subject}>{message.subject}</div>
        <div className={styles.preview}>{message.preview}</div>
      </div>
      <div className={styles.metaSection}>
        <span className={styles.timestamp}>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </li>
  );
};

export default MessageItem;
