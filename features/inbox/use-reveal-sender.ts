import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as inboxService from '@/services/inbox.service';
import * as paymentsService from '@/services/payments.service';
import { queryClient, queryKeys } from '@/services/query-client';
import type { AnonymousMessage } from '@/types/inbox';
import type { CreatePaymentRequest } from '@/types/payments';

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

  const checkoutMutation = useMutation({
    mutationFn: (payload: CreatePaymentRequest) => paymentsService.createPayment(payload),
    onSuccess: () => {
      if (message?.id) {
        queryClient.invalidateQueries({
          queryKey: ['payments', 'capability', 'sender_reveal', message.id],
        });
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
    startRevealCheckout: () =>
      checkoutMutation.mutateAsync({
        capability: 'sender_reveal',
        targetType: 'anonymous_message',
        targetId: message?.id ?? '',
      }),
    state: {
      isPending: revealMutation.isPending || capabilityQuery.isPending || checkoutMutation.isPending,
      error:
        (revealMutation.error && normalizeApiError(revealMutation.error)) ||
        (capabilityQuery.error && normalizeApiError(capabilityQuery.error)) ||
        (checkoutMutation.error && normalizeApiError(checkoutMutation.error)) ||
        null,
      data: revealMutation.data,
      payment: checkoutMutation.data,
    },
  };
}
