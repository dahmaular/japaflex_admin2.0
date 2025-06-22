import React from "react";
import { EmailMessage } from "../types/email.types";
import MessageItem from "./MessageItem";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  messages: EmailMessage[];
  selectedMessageId?: string;
  onMessageSelect: (id: string) => void;
  onNewMessage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ messages, selectedMessageId, onMessageSelect, onNewMessage }) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Inbox</h2>
          <p className={styles.subtitle}>Here is overview of your messages</p>
        </div>
        <button className={styles.newMessageBtn} onClick={onNewMessage} aria-label="New Message">
          + New Message
        </button>
      </div>
      <ul className={styles.messageList} role="listbox" aria-label="Message list">
        {messages.map((msg) => (
          <MessageItem
            key={msg.id}
            message={msg}
            selected={msg.id === selectedMessageId}
            onClick={() => onMessageSelect(msg.id)}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
