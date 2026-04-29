import { api } from '@/services/api';
import type {
  CreatePollRequest,
  InvitePollParticipantsRequest,
  Poll,
  PollInvitation,
  PollResult,
  SafePollSharePayload,
  VotePollRequest,
} from '@/types/polls';

export async function createPoll({ roomId, ...payload }: CreatePollRequest): Promise<Poll> {
  const response = await api.post<Poll>(`/rooms/${roomId}/polls`, payload);

  return response.data;
}

export async function getPoll(pollId: string): Promise<Poll> {
  const response = await api.get<Poll>(`/polls/${pollId}`);

  return response.data;
}

export async function inviteParticipants(
  pollId: string,
  payload: InvitePollParticipantsRequest,
): Promise<PollInvitation[]> {
  const response = await api.post<PollInvitation[]>(`/polls/${pollId}/invitations`, payload);

  return response.data;
}

export async function acceptInvitation(pollId: string, invitationId: string): Promise<PollInvitation> {
  const response = await api.post<PollInvitation>(
    `/polls/${pollId}/invitations/${invitationId}/accept`,
  );

  return response.data;
}

export async function refuseInvitation(pollId: string, invitationId: string): Promise<PollInvitation> {
  const response = await api.post<PollInvitation>(
    `/polls/${pollId}/invitations/${invitationId}/refuse`,
  );

  return response.data;
}

export async function votePoll(pollId: string, payload: VotePollRequest): Promise<Poll> {
  const response = await api.post<Poll>(`/polls/${pollId}/votes`, payload);

  return response.data;
}

export async function closePoll(pollId: string): Promise<Poll> {
  const response = await api.post<Poll>(`/polls/${pollId}/close`);

  return response.data;
}

export async function getPollResults(pollId: string): Promise<PollResult[]> {
  const response = await api.get<PollResult[]>(`/polls/${pollId}/results`);

  return response.data;
}

export async function getPollSharePayload(pollId: string): Promise<SafePollSharePayload> {
  const response = await api.get<SafePollSharePayload>(`/polls/${pollId}/share`);

  return response.data;
}
