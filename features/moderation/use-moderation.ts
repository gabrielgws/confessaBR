import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as moderationService from '@/services/moderation.service';
import { queryClient } from '@/services/query-client';
import type { ModerationActionRequest } from '@/types/moderation';

const moderationQueueKey = ['moderation', 'queue'] as const;

export function useModerationQueue() {
  const queueQuery = useQuery({
    queryKey: moderationQueueKey,
    queryFn: moderationService.getModerationQueue,
  });

  const actionMutation = useMutation({
    mutationFn: moderationService.createModerationAction,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: moderationQueueKey }),
  });

  return {
    queue: queueQuery.data ?? [],
    isLoading: queueQuery.isPending,
    error: queueQuery.error ? normalizeApiError(queueQuery.error) : null,
    applyAction: (payload: ModerationActionRequest) => actionMutation.mutateAsync(payload),
    actionState: {
      isPending: actionMutation.isPending,
      isSuccess: actionMutation.isSuccess,
      error: actionMutation.error ? normalizeApiError(actionMutation.error) : null,
    },
  };
}
