import React, { useRef } from "react";
import { EmailMessage } from "../types/email.types";
import MessageHeader from "./././MessageHeader";
import styles from "./MessageDetail.module.css";

interface MessageDetailProps {
  message: EmailMessage;
}

const MessageDetail: React.FC<MessageDetailProps> = ({ message }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState<string>("");

  const format = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleSend = () => {
    const content = editorRef.current?.innerHTML.trim() || "";
    if (!content || content === "<br>") {
      setError("Message cannot be empty.");
      return;
    }
    setError("");
    // Here you would send the message (API call, etc.)
    alert("Message sent: " + content.replace(/<[^>]+>/g, "").slice(0, 100));
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  return (
    <div className={styles.detailContainer}>
      <MessageHeader message={message} />
      <div className={styles.body}>{message.body}</div>
      <div className={styles.composeArea}>
        <div className={styles.toolbar}>
          <button
            type="button"
            aria-label="Bold"
            className={styles.toolbarBtn}
            onClick={() => format("bold")}
          >
            <b>B</b>
          </button>
          <button
            type="button"
            aria-label="Italic"
            className={styles.toolbarBtn}
            onClick={() => format("italic")}
          >
            <i>I</i>
          </button>
          <button
            type="button"
            aria-label="Underline"
            className={styles.toolbarBtn}
            onClick={() => format("underline")}
          >
            <u>U</u>
          </button>
        </div>
        <div
          className={styles.composeInput}
          contentEditable
          ref={editorRef}
          role="textbox"
          aria-label="Compose message"
          tabIndex={0}
          style={{ minHeight: 60, outline: "none" }}
        />
        {error && <div className={styles.errorMsg}>{error}</div>}
        <button className={styles.sendBtn} type="button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageDetail;
