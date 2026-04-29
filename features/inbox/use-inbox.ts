import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as inboxService from '@/services/inbox.service';
import { queryClient, queryKeys } from '@/services/query-client';

export function useInbox() {
  const messagesQuery = useQuery({
    queryKey: queryKeys.inbox.messages(),
    queryFn: inboxService.listMessages,
  });

  const archiveMutation = useMutation({
    mutationFn: inboxService.archiveMessage,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.inbox.messages() }),
  });

  const reportMutation = useMutation({
    mutationFn: ({ messageId, reason }: { messageId: string; reason: string }) =>
      inboxService.reportMessage(messageId, { reason }),
  });

  return {
    messages: messagesQuery.data ?? [],
    isLoading: messagesQuery.isPending,
    error: messagesQuery.error ? normalizeApiError(messagesQuery.error) : null,
    archiveMessage: (messageId: string) => archiveMutation.mutateAsync(messageId),
    reportMessage: (messageId: string, reason: string) =>
      reportMutation.mutateAsync({ messageId, reason }),
    archiveState: {
      isPending: archiveMutation.isPending,
      error: archiveMutation.error ? normalizeApiError(archiveMutation.error) : null,
    },
    reportState: {
      isPending: reportMutation.isPending,
      error: reportMutation.error ? normalizeApiError(reportMutation.error) : null,
      isSuccess: reportMutation.isSuccess,
    },
  };
}

export function useInboxMessage(messageId?: string) {
  return useQuery({
    queryKey: messageId ? queryKeys.inbox.message(messageId) : queryKeys.inbox.all,
    queryFn: () => inboxService.getMessage(messageId ?? ''),
    enabled: Boolean(messageId),
  });
}
