import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as inboxService from '@/services/inbox.service';
import * as paymentsService from '@/services/payments.service';
import { queryClient, queryKeys } from '@/services/query-client';
import type { AnonymousMessage } from '@/types/inbox';

export function useRevealSender(message?: AnonymousMessage) {
  const capabilityQuery = useQuery({
    queryKey: ['payments', 'capability', 'sender_reveal', message?.id],
    queryFn: () => paymentsService.getCapability('sender_reveal', message?.id ?? ''),
    enabled: Boolean(message?.id && message.canRevealSender),
  });

  const revealMutation = useMutation({
    mutationFn: () => inboxService.revealSender(message?.id ?? ''),
    onSuccess: () => {
      if (message?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.inbox.message(message.id) });
      }
    },
  });

  const canAttemptReveal =
    Boolean(message?.canRevealSender) &&
    (message?.revealStatus === 'revealable_locked' || message?.revealStatus === 'reveal_unlocked');
  const isPaymentUnlocked = capabilityQuery.data?.unlocked ?? message?.revealStatus === 'reveal_unlocked';

  return {
    canAttemptReveal,
    isPaymentUnlocked,
    capability: capabilityQuery.data,
    reveal: () => revealMutation.mutateAsync(),
    state: {
      isPending: revealMutation.isPending || capabilityQuery.isPending,
      error:
        (revealMutation.error && normalizeApiError(revealMutation.error)) ||
        (capabilityQuery.error && normalizeApiError(capabilityQuery.error)) ||
        null,
      data: revealMutation.data,
    },
  };
}
