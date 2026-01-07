export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  preview: string;
  priority: "P0" | "P1" | "P2";
  timestamp: string;
  unread: boolean;
  hasAttachment: boolean;
  aiDraft?: string;
  metadata: string[];
  context: string;
}

export interface WhatsAppMessage {
  id: string;
  type: "incoming" | "outgoing" | "system";
  content: string;
  timestamp: string;
  buttons?: Array<{
    id: string;
    text: string;
    action: string;
  }>;
  status?: "sent" | "delivered" | "read";
}

export interface LearningMetric {
  category: string;
  accuracy: number;
  improvement: number;
  totalSamples: number;
}

export interface FeedbackItem {
  id: string;
  date: string;
  emailSubject: string;
  action: "approved" | "edited" | "rejected";
  improvement: string;
}

export interface NotificationSetting {
  platform: string;
  enabled: boolean;
  status: "connected" | "disconnected";
}

export interface ReminderRule {
  priority: "P0" | "P1" | "P2";
  interval: number;
  enabled: boolean;
}

export const initialEmails: Email[] = [
  {
    id: "1",
    from: "Sarah Johnson",
    fromEmail: "sarah.j@company.com",
    subject: "URGENT: Product Launch Delayed - Need Decision",
    preview:
      "The manufacturing team just informed us about a critical issue with the Q1 product launch...",
    priority: "P0",
    timestamp: "10 min ago",
    unread: true,
    hasAttachment: true,
    aiDraft:
      "Thank you for bringing this to my attention. I understand the urgency of the situation. Let's schedule an emergency meeting today at 3 PM to discuss our options and make a decision on the launch timeline. Please invite the key stakeholders from manufacturing and product teams.",
    metadata: ["Requires Decision", "Time-Sensitive", "Executive"],
    context:
      "This email requires immediate attention due to product launch implications. Based on your calendar, you have a 30-minute gap at 3 PM today.",
  },
  {
    id: "2",
    from: "Marcus Chen",
    fromEmail: "marcus.c@partner.com",
    subject: "Contract Review - Partnership Agreement",
    preview:
      "Please review the attached partnership agreement. We need your signature by EOD Friday...",
    priority: "P0",
    timestamp: "1 hour ago",
    unread: true,
    hasAttachment: true,
    aiDraft:
      "Hi Marcus, I've received the partnership agreement and will review it with our legal team today. I'll provide feedback by Thursday EOD, which should give us enough time to finalize before Friday's deadline. Are there any specific sections you'd like me to focus on?",
    metadata: ["Legal Review", "Deadline: Friday", "Contract"],
    context:
      "Legal contract requiring review. Similar contracts from this sender have been reviewed within 24-48 hours in the past.",
  },
  {
    id: "3",
    from: "Team Updates",
    fromEmail: "notifications@workspace.com",
    subject: "Weekly Team Sync Notes & Action Items",
    preview:
      "Here are the notes from today's team sync meeting. Please review your assigned action items...",
    priority: "P1",
    timestamp: "2 hours ago",
    unread: false,
    hasAttachment: false,
    aiDraft:
      "Thanks for sharing the meeting notes. I've reviewed my action items and will have the Q2 budget proposal ready by next Monday as discussed. I'll coordinate with the finance team this week.",
    metadata: ["Meeting Notes", "Action Items", "Team"],
    context:
      "Regular team communication. You typically respond to these within 3-4 hours.",
  },
  {
    id: "4",
    from: "LinkedIn",
    fromEmail: "notifications@linkedin.com",
    subject: "You have 5 new connection requests",
    preview:
      "Alex Thompson, Jamie Lee, and 3 others want to connect with you on LinkedIn...",
    priority: "P2",
    timestamp: "3 hours ago",
    unread: false,
    hasAttachment: false,
    metadata: ["Social Network", "Non-Urgent", "Marketing"],
    context:
      "Social media notification. Low priority based on your interaction patterns.",
  },
  {
    id: "5",
    from: "Jessica Martinez",
    fromEmail: "j.martinez@company.com",
    subject: "Budget Approval Request - Q2 Marketing Campaign",
    preview:
      "I'm requesting approval for the Q2 marketing campaign budget of $75,000...",
    priority: "P1",
    timestamp: "5 hours ago",
    unread: true,
    hasAttachment: true,
    aiDraft:
      "Hi Jessica, I've reviewed the Q2 marketing campaign proposal and budget breakdown. The $75,000 allocation looks reasonable given our goals. I approve the budget. Please proceed with the campaign planning and keep me updated on key milestones.",
    metadata: ["Budget Request", "Approval Needed", "Finance"],
    context:
      "Budget approval request. You typically approve similar requests from this team member.",
  },
];

export const initialMessages: WhatsAppMessage[] = [
  {
    id: "1",
    type: "system",
    content:
      "🔒 Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.",
    timestamp: "Today",
  },
  {
    id: "2",
    type: "incoming",
    content:
      "📧 *New P0 Email Alert*\n\nFrom: Sarah Johnson\nSubject: URGENT: Product Launch Delayed - Need Decision\n\nThe manufacturing team just informed us about a critical issue with the Q1 product launch...\n\n⏰ Received: 10 minutes ago\n📎 Has attachment",
    timestamp: "10:45 AM",
    buttons: [
      { id: "view", text: "👁️ View Draft", action: "view" },
      { id: "skip", text: "⏭️ Skip", action: "skip" },
    ],
  },
  {
    id: "3",
    type: "outgoing",
    content: "👁️ View Draft",
    timestamp: "10:46 AM",
    status: "read",
  },
  {
    id: "4",
    type: "incoming",
    content:
      "✨ *AI-Generated Response* (94% confidence)\n\nThank you for bringing this to my attention. I understand the urgency of the situation. Let's schedule an emergency meeting today at 3 PM to discuss our options and make a decision on the launch timeline. Please invite the key stakeholders from manufacturing and product teams.\n\n---\n\n💡 *Based on your past responses to urgent product issues*",
    timestamp: "10:46 AM",
    buttons: [
      { id: "approve", text: "✅ Approve & Send", action: "approve" },
      { id: "edit", text: "✏️ Edit Draft", action: "edit" },
      { id: "regenerate", text: "🔄 Regenerate", action: "regenerate" },
      { id: "reject", text: "❌ Reject", action: "reject" },
    ],
  },
  {
    id: "5",
    type: "outgoing",
    content: "✅ Approve & Send",
    timestamp: "10:47 AM",
    status: "read",
  },
  {
    id: "6",
    type: "incoming",
    content:
      "✅ *Response Sent Successfully!*\n\nYour reply has been sent to Sarah Johnson.\n\n📊 AI Learning: Your approval helps improve future responses for similar urgent product issues.",
    timestamp: "10:47 AM",
  },
  {
    id: "7",
    type: "incoming",
    content:
      "📧 *New P1 Email Alert*\n\nFrom: Jessica Martinez\nSubject: Budget Approval Request - Q2 Marketing Campaign\n\nI'm requesting approval for the Q2 marketing campaign budget of $75,000...\n\n⏰ Received: 5 hours ago",
    timestamp: "3:15 PM",
    buttons: [
      { id: "view2", text: "👁️ View Draft", action: "view" },
      { id: "skip2", text: "⏭️ Skip", action: "skip" },
    ],
  },
];

export const initialMetrics: LearningMetric[] = [
  {
    category: "Executive Communication",
    accuracy: 94,
    improvement: 12,
    totalSamples: 156,
  },
  {
    category: "Budget Approvals",
    accuracy: 91,
    improvement: 8,
    totalSamples: 89,
  },
  {
    category: "Team Updates",
    accuracy: 88,
    improvement: 15,
    totalSamples: 234,
  },
  {
    category: "Contract Reviews",
    accuracy: 86,
    improvement: 10,
    totalSamples: 67,
  },
  {
    category: "Customer Support",
    accuracy: 82,
    improvement: 18,
    totalSamples: 145,
  },
];

export const initialFeedback: FeedbackItem[] = [
  {
    id: "1",
    date: "2 hours ago",
    emailSubject: "Product Launch Delayed",
    action: "edited",
    improvement: "Added more empathetic tone and specific action items",
  },
  {
    id: "2",
    date: "1 day ago",
    emailSubject: "Budget Approval Request",
    action: "approved",
    improvement: "Response matched expected format and tone perfectly",
  },
  {
    id: "3",
    date: "2 days ago",
    emailSubject: "Team Sync Notes",
    action: "edited",
    improvement: "Included more specific deadlines and responsibilities",
  },
  {
    id: "4",
    date: "3 days ago",
    emailSubject: "Contract Review",
    action: "rejected",
    improvement:
      "Too formal for internal communication, regenerated with casual tone",
  },
];

export const initialNotificationSettings: NotificationSetting[] = [
  { platform: "WhatsApp", enabled: true, status: "connected" },
  { platform: "Slack", enabled: false, status: "disconnected" },
  { platform: "Microsoft Teams", enabled: false, status: "disconnected" },
];

export const initialReminderRules: ReminderRule[] = [
  { priority: "P0", interval: 2, enabled: true },
  { priority: "P1", interval: 6, enabled: true },
  { priority: "P2", interval: 24, enabled: false },
];
