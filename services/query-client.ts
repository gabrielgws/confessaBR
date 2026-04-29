import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
    },
    mutations: {
      retry: 0,
    },
  },
});

export const queryKeys = {
  me: ['me'] as const,
  inbox: {
    all: ['inbox'] as const,
    messages: () => [...queryKeys.inbox.all, 'messages'] as const,
    message: (messageId: string) => [...queryKeys.inbox.messages(), messageId] as const,
  },
  rooms: {
    all: ['rooms'] as const,
    detail: (roomId: string) => [...queryKeys.rooms.all, roomId] as const,
    members: (roomId: string) => [...queryKeys.rooms.detail(roomId), 'members'] as const,
    feed: (roomId: string) => [...queryKeys.rooms.detail(roomId), 'feed'] as const,
    polls: (roomId: string) => [...queryKeys.rooms.detail(roomId), 'polls'] as const,
  },
  polls: {
    all: ['polls'] as const,
    detail: (pollId: string) => [...queryKeys.polls.all, pollId] as const,
    results: (pollId: string) => [...queryKeys.polls.detail(pollId), 'results'] as const,
  },
  notifications: ['notifications'] as const,
  radar: ['radar'] as const,
};
