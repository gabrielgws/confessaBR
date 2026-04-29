import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import { queryClient, queryKeys } from '@/services/query-client';
import * as roomsService from '@/services/rooms.service';

export function useRoomFeed(roomId?: string) {
  const feedQuery = useQuery({
    queryKey: roomId ? queryKeys.rooms.feed(roomId) : queryKeys.rooms.all,
    queryFn: () => roomsService.getRoomFeed(roomId ?? ''),
    enabled: Boolean(roomId),
  });

  const postMutation = useMutation({
    mutationFn: (body: string) => roomsService.createRoomFeedItem(roomId ?? '', { body }),
    onSuccess: () => {
      if (roomId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.rooms.feed(roomId) });
      }
    },
  });

  const reportMutation = useMutation({
    mutationFn: ({ feedItemId, reason }: { feedItemId: string; reason: string }) =>
      roomsService.reportRoomFeedItem(roomId ?? '', feedItemId, reason),
  });

  return {
    feed: feedQuery.data ?? [],
    isLoading: feedQuery.isPending,
    error: feedQuery.error ? normalizeApiError(feedQuery.error) : null,
    postFeedItem: (body: string) => postMutation.mutateAsync(body),
    reportFeedItem: (feedItemId: string, reason: string) =>
      reportMutation.mutateAsync({ feedItemId, reason }),
    postState: {
      isPending: postMutation.isPending,
      isSuccess: postMutation.isSuccess,
      error: postMutation.error ? normalizeApiError(postMutation.error) : null,
    },
    reportState: {
      isPending: reportMutation.isPending,
      isSuccess: reportMutation.isSuccess,
      error: reportMutation.error ? normalizeApiError(reportMutation.error) : null,
    },
  };
}
