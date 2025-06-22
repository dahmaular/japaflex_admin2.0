export interface EmailMessage {
  id: string;
  sender: {
    name: string;
    email: string;
    avatar?: string;
    isOnline?: boolean;
  };
  subject: string;
  preview: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}
