import React, { useState } from "react";
import { EmailMessage } from "./types/email.types";
import Sidebar from "./Sidebar/Sidebar";
import MessageDetail from "./MessageDetail/MessageDetail";
import styles from "./EmailInterface.module.css";

interface EmailInterfaceProps {
  messages: EmailMessage[];
  selectedMessageId?: string;
  onMessageSelect: (messageId: string) => void;
  onNewMessage: () => void;
}

const EmailInterface: React.FC<EmailInterfaceProps> = ({
  messages,
  selectedMessageId: controlledSelectedId,
  onMessageSelect,
  onNewMessage,
}) => {
  // If not controlled, manage selected state internally
  const [internalSelectedId, setInternalSelectedId] = useState<string | undefined>(
    messages[0]?.id
  );
  const selectedMessageId = controlledSelectedId ?? internalSelectedId;

  const handleSelect = (id: string) => {
    setInternalSelectedId(id);
    onMessageSelect(id);
  };

  const selectedMessage = messages.find((msg) => msg.id === selectedMessageId);

  return (
    <div className={styles.emailInterfaceContainer}>
      <Sidebar
        messages={messages}
        selectedMessageId={selectedMessageId}
        onMessageSelect={handleSelect}
        onNewMessage={onNewMessage}
      />
      <div className={styles.detailPanel}>
        {selectedMessage ? (
          <MessageDetail message={selectedMessage} />
        ) : (
          <div className={styles.emptyState}>Select a message to view details</div>
        )}
      </div>
    </div>
  );
};

export default EmailInterface;
