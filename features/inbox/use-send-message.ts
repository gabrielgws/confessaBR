import { useMutation } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as inboxService from '@/services/inbox.service';
import { queryClient, queryKeys } from '@/services/query-client';
import type { SendAnonymousMessageRequest } from '@/types/inbox';

export function useSendMessage() {
  const mutation = useMutation({
    mutationFn: inboxService.sendMessage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.inbox.all }),
  });

  return {
    sendMessage: (payload: SendAnonymousMessageRequest) => mutation.mutateAsync(payload),
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error ? normalizeApiError(mutation.error) : null,
  };
}
