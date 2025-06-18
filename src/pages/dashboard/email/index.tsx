import React from "react";
import EmailInterface from "../../../components/EmailInterface/EmailInterface";
import { sampleMessages } from "../../../components/EmailInterface/sampleData";

const EmailPage: React.FC = () => {
  const handleSelect = (id: string) => {
    // You can add logic here for analytics, etc.
    console.log("Selected message:", id);
  };
  const handleNewMessage = () => {
    alert("Compose new message!");
  };
  return (
    <EmailInterface
      messages={sampleMessages}
      onMessageSelect={handleSelect}
      onNewMessage={handleNewMessage}
    />
  );
};

export default EmailPage;
