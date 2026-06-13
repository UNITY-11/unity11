export interface Notification {
  id: string;
  type: 'alert' | 'message' | 'update' | 'success';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  link?: string;
}
