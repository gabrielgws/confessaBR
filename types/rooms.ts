import type { PublicUserSummary } from '@/types/user';

export type RoomVisibility = 'private' | 'public' | 'region';
export type RoomRole = 'member' | 'moderator' | 'owner';
export type MembershipStatus = 'active' | 'left' | 'banned';
export type FeedVisibilityStatus = 'visible' | 'reported' | 'hidden' | 'removed';

export type RoomPermissions = {
  canPost: boolean;
  canModerate: boolean;
  canCreatePolls: boolean;
  canInviteMembers: boolean;
};

export type Room = {
  id: string;
  name: string;
  description?: string | null;
  joinCode?: string | null;
  visibility: RoomVisibility;
  regionLabel?: string | null;
  regionDiscoveryArea?: string | null;
  memberCount: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  permissions: RoomPermissions;
};

export type RoomMembership = {
  id: string;
  roomId: string;
  userId: string;
  role: RoomRole;
  status: MembershipStatus;
  joinedAt: string;
  leftAt?: string | null;
  user?: PublicUserSummary;
};

export type RoomFeedItem = {
  id: string;
  roomId: string;
  senderAlias: string;
  body: string;
  visibilityStatus: FeedVisibilityStatus;
  moderationStatus: FeedVisibilityStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateRoomRequest = {
  name: string;
  description?: string;
  visibility: RoomVisibility;
};

export type JoinRoomRequest = {
  joinCode: string;
};

export type CreateFeedItemRequest = {
  body: string;
};
