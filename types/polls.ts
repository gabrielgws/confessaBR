export type PollStatus = 'draft' | 'open' | 'closed' | 'results_visible';
export type PollInvitationStatus = 'pending' | 'accepted' | 'refused';
export type PositivePollCategory = 'admiration' | 'gratitude' | 'support' | 'fun' | 'custom';

export type PollOption = {
  id: string;
  label: string;
};

export type Poll = {
  id: string;
  roomId: string;
  creatorId: string;
  question: string;
  category: PositivePollCategory;
  options: PollOption[];
  status: PollStatus;
  resultsVisibility: 'after_close' | 'moderator_only';
  createdAt: string;
  closesAt?: string | null;
  closedAt?: string | null;
  userVoteOptionId?: string | null;
};

export type PollInvitation = {
  id: string;
  pollId: string;
  userId: string;
  status: PollInvitationStatus;
  sentAt: string;
  respondedAt?: string | null;
};

export type PollResult = {
  optionId: string;
  label: string;
  voteCount: number;
  rank: number;
};

export type SafePollSharePayload = {
  text: string;
  url?: string;
  attribution: 'ConfessaBR';
};

export type CreatePollRequest = {
  roomId: string;
  question: string;
  category: PositivePollCategory;
  options: string[];
  closesAt?: string | null;
};

export type InvitePollParticipantsRequest = {
  userIds: string[];
};

export type VotePollRequest = {
  optionId: string;
};
