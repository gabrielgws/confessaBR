import type { NotificationSettings } from './user';

export type NotificationKind = 'message' | 'poll_invite' | 'poll_result' | 'payment';

export type NotificationReadState = 'unread' | 'read';

export type Notification = {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  readState: NotificationReadState;
  createdAt: string;
  actionUrl?: string | null;
};

export type RegisterDeviceRequest = {
  expoPushToken: string;
  platform: 'ios' | 'android' | 'web' | 'unknown';
  deviceName?: string | null;
};

export type RegisteredDevice = {
  id: string;
  platform: RegisterDeviceRequest['platform'];
  deviceName?: string | null;
  createdAt: string;
};

export type NotificationHistory = {
  notifications: Notification[];
  unreadCount: number;
};

export type NotificationPreferences = NotificationSettings;
