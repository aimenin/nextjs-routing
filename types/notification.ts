export type NotificationStatus = 'success' | 'error' | 'pending';

export type NotificationType = {
  title: string;
  message: string;
  status: NotificationStatus;
};
