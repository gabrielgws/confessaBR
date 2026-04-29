import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as paymentsService from '@/services/payments.service';
import type { CreatePaymentRequest } from '@/types/payments';

export function usePaymentCheckout(paymentId?: string) {
  const paymentQuery = useQuery({
    queryKey: ['payments', paymentId],
    queryFn: () => paymentsService.getPayment(paymentId ?? ''),
    enabled: Boolean(paymentId),
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      return status === 'pending' || status === 'created' ? 5000 : false;
    },
  });

  const createMutation = useMutation({
    mutationFn: paymentsService.createPayment,
  });

  return {
    payment: paymentQuery.data ?? createMutation.data,
    startCheckout: (payload: CreatePaymentRequest) => createMutation.mutateAsync(payload),
    isPending: paymentQuery.isPending || createMutation.isPending,
    error:
      (paymentQuery.error && normalizeApiError(paymentQuery.error)) ||
      (createMutation.error && normalizeApiError(createMutation.error)) ||
      null,
  };
}
