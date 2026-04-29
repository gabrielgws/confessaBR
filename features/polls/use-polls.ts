import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as pollsService from '@/services/polls.service';
import { queryClient, queryKeys } from '@/services/query-client';
import type { CreatePollRequest, InvitePollParticipantsRequest, VotePollRequest } from '@/types/polls';

export function useCreatePoll() {
  const mutation = useMutation({
    mutationFn: pollsService.createPoll,
    onSuccess: (poll) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.polls.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.rooms.detail(poll.roomId) });
    },
  });

  return {
    createPoll: (payload: CreatePollRequest) => mutation.mutateAsync(payload),
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error ? normalizeApiError(mutation.error) : null,
  };
}

export function usePoll(pollId?: string) {
  const pollQuery = useQuery({
    queryKey: pollId ? queryKeys.polls.detail(pollId) : queryKeys.polls.all,
    queryFn: () => pollsService.getPoll(pollId ?? ''),
    enabled: Boolean(pollId),
  });

  const resultsQuery = useQuery({
    queryKey: pollId ? queryKeys.polls.results(pollId) : queryKeys.polls.all,
    queryFn: () => pollsService.getPollResults(pollId ?? ''),
    enabled: Boolean(pollId && pollQuery.data?.status !== 'open'),
  });

  const inviteMutation = useMutation({
    mutationFn: (payload: InvitePollParticipantsRequest) =>
      pollsService.inviteParticipants(pollId ?? '', payload),
  });

  const acceptMutation = useMutation({
    mutationFn: (invitationId: string) => pollsService.acceptInvitation(pollId ?? '', invitationId),
  });

  const refuseMutation = useMutation({
    mutationFn: (invitationId: string) => pollsService.refuseInvitation(pollId ?? '', invitationId),
  });

  const voteMutation = useMutation({
    mutationFn: (payload: VotePollRequest) => pollsService.votePoll(pollId ?? '', payload),
    onSuccess: () => {
      if (pollId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.polls.detail(pollId) });
      }
    },
  });

  const shareMutation = useMutation({
    mutationFn: () => pollsService.getPollSharePayload(pollId ?? ''),
  });

  const closeMutation = useMutation({
    mutationFn: () => pollsService.closePoll(pollId ?? ''),
    onSuccess: () => {
      if (pollId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.polls.detail(pollId) });
        queryClient.invalidateQueries({ queryKey: queryKeys.polls.results(pollId) });
      }
    },
  });

  return {
    poll: pollQuery.data,
    results: resultsQuery.data ?? [],
    isLoading: pollQuery.isPending,
    error:
      (pollQuery.error && normalizeApiError(pollQuery.error)) ||
      (resultsQuery.error && normalizeApiError(resultsQuery.error)) ||
      null,
    inviteParticipants: (payload: InvitePollParticipantsRequest) => inviteMutation.mutateAsync(payload),
    acceptInvitation: (invitationId: string) => acceptMutation.mutateAsync(invitationId),
    refuseInvitation: (invitationId: string) => refuseMutation.mutateAsync(invitationId),
    vote: (payload: VotePollRequest) => voteMutation.mutateAsync(payload),
    closePoll: () => closeMutation.mutateAsync(),
    getSafeSharePayload: () => shareMutation.mutateAsync(),
    voteState: {
      isPending: voteMutation.isPending,
      isSuccess: voteMutation.isSuccess,
      error: voteMutation.error ? normalizeApiError(voteMutation.error) : null,
    },
    inviteState: {
      isPending: inviteMutation.isPending,
      isSuccess: inviteMutation.isSuccess,
      error: inviteMutation.error ? normalizeApiError(inviteMutation.error) : null,
    },
    consentState: {
      isPending: acceptMutation.isPending || refuseMutation.isPending,
      isSuccess: acceptMutation.isSuccess || refuseMutation.isSuccess,
      error:
        (acceptMutation.error && normalizeApiError(acceptMutation.error)) ||
        (refuseMutation.error && normalizeApiError(refuseMutation.error)) ||
        null,
    },
    closeState: {
      isPending: closeMutation.isPending,
      isSuccess: closeMutation.isSuccess,
      error: closeMutation.error ? normalizeApiError(closeMutation.error) : null,
    },
  };
}
