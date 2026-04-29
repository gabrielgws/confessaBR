import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import * as notificationsService from '@/services/notifications.service';
import { queryClient, queryKeys } from '@/services/query-client';

export function useNotificationHistory() {
  const notificationsQuery = useQuery({
    queryKey: queryKeys.notifications.history(),
    queryFn: notificationsService.getNotifications,
  });

  const markReadMutation = useMutation({
    mutationFn: notificationsService.markNotificationRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all }),
  });

  return {
    notifications: notificationsQuery.data?.notifications ?? [],
    unreadCount: notificationsQuery.data?.unreadCount ?? 0,
    historyState: {
      isLoading: notificationsQuery.isLoading,
      error: notificationsQuery.error ? normalizeApiError(notificationsQuery.error) : null,
      refetch: notificationsQuery.refetch,
    },
    markRead: (notificationId: string) => markReadMutation.mutateAsync(notificationId),
    markReadState: {
      isPending: markReadMutation.isPending,
      error: markReadMutation.error ? normalizeApiError(markReadMutation.error) : null,
    },
  };
}
