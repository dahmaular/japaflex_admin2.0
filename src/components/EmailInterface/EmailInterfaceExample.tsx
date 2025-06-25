import React from "react";
import EmailInterface from "./EmailInterface";
import { sampleMessages } from "./sampleData";

const EmailInterfaceExample: React.FC = () => {
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

export default EmailInterfaceExample;
