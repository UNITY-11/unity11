export interface Notification {
  id: string;
  type: 'alert' | 'message' | 'update' | 'success';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'High Server Usage',
    message: 'Server CPU utilization has exceeded 90% for the last 5 minutes.',
    timestamp: '2 mins ago',
    isRead: false,
    link: '/analytics'
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message from Sarah',
    message: 'Hey, I just updated the design files for the new project. Can you take a look?',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'success',
    title: 'Deployment Successful',
    message: 'Production deployment v2.4.1 has completed successfully.',
    timestamp: '3 hours ago',
    isRead: true,
  },
  {
    id: '4',
    type: 'update',
    title: 'System Update Available',
    message: 'A new security patch is available for the database server. Please schedule maintenance.',
    timestamp: '1 day ago',
    isRead: true,
  },
  {
    id: '5',
    type: 'message',
    title: 'Client Feedback Received',
    message: 'Nexus Corp has submitted feedback on the latest milestone.',
    timestamp: '2 days ago',
    isRead: true,
    link: '/clients/1'
  }
];
