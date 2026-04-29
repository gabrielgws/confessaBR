import type { NotificationSettings, PrivacySettings, User } from '@/types/user';

export type AuthSession = {
  token: string;
  user: User;
};

export type LoginRequest = {
  username: string;
  password: string;
};

export type RegisterRequest = {
  username: string;
  displayName: string;
  password: string;
  passwordConfirmation: string;
};

export type UpdateProfileRequest = {
  username?: string;
  displayName?: string;
  bio?: string | null;
  avatarUrl?: string | null;
};

export type UpdatePrivacyRequest = Partial<PrivacySettings>;

export type UpdateNotificationPreferencesRequest = Partial<NotificationSettings>;

export type ProfileUpdateResponse = {
  user: User;
};
