import { EmailMessage } from "./types/email.types";

export const sampleMessages: EmailMessage[] = [
  {
    id: "1",
    sender: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      avatar: undefined,
      isOnline: true,
    },
    subject: "Welcome to Japaflex!",
    preview: "Hi there, welcome to the platform. Let us know if you need anything!",
    body: "Hi there,\n\nWelcome to Japaflex! We're excited to have you on board. If you have any questions, feel free to reach out.\n\nBest,\nThe Japaflex Team",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    isRead: false,
    isStarred: true,
  },
  {
    id: "2",
    sender: {
      name: "Bob Smith",
      email: "bob.smith@example.com",
      avatar: undefined,
      isOnline: false,
    },
    subject: "Your Invoice is Ready",
    preview: "Please find attached your invoice for this month. Let us know if you have questions.",
    body: "Hello,\n\nPlease find attached your invoice for this month. If you have any questions, let us know.\n\nThanks,\nBob",
    timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), // 1 day ago
    isRead: true,
    isStarred: false,
  },
  {
    id: "3",
    sender: {
      name: "Carol Lee",
      email: "carol.lee@example.com",
      avatar: undefined,
      isOnline: true,
    },
    subject: "Meeting Reminder",
    preview: "Just a reminder about our meeting scheduled for tomorrow at 10am.",
    body: "Hi,\n\nJust a reminder about our meeting scheduled for tomorrow at 10am. Looking forward to speaking with you!\n\nBest,\nCarol",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    isRead: false,
    isStarred: false,
  },
  {
    id: "4",
    sender: {
      name: "David Kim",
      email: "david.kim@example.com",
      avatar: undefined,
      isOnline: false,
    },
    subject: "Re: Project Update",
    preview: "Thanks for the update. I'll review the documents and get back to you soon.",
    body: "Hi,\n\nThanks for the update. I'll review the documents and get back to you soon.\n\nRegards,\nDavid",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    isRead: true,
    isStarred: false,
  },
];
