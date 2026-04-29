import type { ApiErrorCode } from '@/types/api';

export type RevealStatus = 'not_revealable' | 'revealable_locked' | 'reveal_unlocked';
export type ArchiveStatus = 'active' | 'archived';
export type MessageModerationStatus = 'visible' | 'hidden' | 'removed';

export type AnonymousMessage = {
  id: string;
  recipientId: string;
  senderAlias: string;
  body: string;
  canRevealSender: boolean;
  revealStatus: RevealStatus;
  archiveStatus: ArchiveStatus;
  moderationStatus: MessageModerationStatus;
  createdAt: string;
  updatedAt: string;
};

export type SendAnonymousMessageRequest = {
  recipientUsername: string;
  body: string;
  allowRevealRequest: boolean;
};

export type RevealSenderResponse = {
  status: RevealStatus;
  senderDisplayName?: string;
  reasonCode?: ApiErrorCode;
  paymentRequired?: boolean;
};

export type SafeSharePayload = {
  text: string;
  url?: string;
  attribution: 'ConfessaBR';
};

export type ReportMessageRequest = {
  reason: string;
};
