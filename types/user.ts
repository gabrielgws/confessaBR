export type AccountStatus = 'active' | 'blocked' | 'banned';

export type PrivacySettings = {
  allowAnonymousMessages: boolean;
  allowSenderRevealRequests: boolean;
  showInRadar: boolean;
  shareProfileWithRooms: boolean;
};

export type NotificationSettings = {
  newMessagesEnabled: boolean;
  pollInvitesEnabled: boolean;
  pollResultsEnabled: boolean;
  paymentsEnabled: boolean;
};

export type User = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  accountStatus: AccountStatus;
  privacySettings: PrivacySettings;
  notificationSettings: NotificationSettings;
  createdAt: string;
  updatedAt: string;
};

export type PublicUserSummary = {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string | null;
};

export type VisitorSurface = 'landing' | 'login' | 'register';

export type VisitorSession = {
  sessionId: string;
  startedAt: string;
  allowedSurfaces: VisitorSurface[];
  restrictionReason: string;
};
