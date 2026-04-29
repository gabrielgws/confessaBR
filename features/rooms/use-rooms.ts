import { useMutation, useQuery } from '@tanstack/react-query';

import { normalizeApiError } from '@/services/api';
import { queryClient, queryKeys } from '@/services/query-client';
import * as roomsService from '@/services/rooms.service';
import type { CreateRoomRequest, JoinRoomRequest } from '@/types/rooms';

export function useRooms() {
  const roomsQuery = useQuery({
    queryKey: queryKeys.rooms.all,
    queryFn: roomsService.listRooms,
  });

  const createMutation = useMutation({
    mutationFn: roomsService.createRoom,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.rooms.all }),
  });

  const joinMutation = useMutation({
    mutationFn: roomsService.joinRoom,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.rooms.all }),
  });

  const leaveMutation = useMutation({
    mutationFn: roomsService.leaveRoom,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.rooms.all }),
  });

  return {
    rooms: roomsQuery.data ?? [],
    isLoading: roomsQuery.isPending,
    error: roomsQuery.error ? normalizeApiError(roomsQuery.error) : null,
    createRoom: (payload: CreateRoomRequest) => createMutation.mutateAsync(payload),
    joinRoom: (payload: JoinRoomRequest) => joinMutation.mutateAsync(payload),
    leaveRoom: (roomId: string) => leaveMutation.mutateAsync(roomId),
    createState: stateFor(createMutation),
    joinState: stateFor(joinMutation),
    leaveState: stateFor(leaveMutation),
  };
}

export function useRoomMembers(roomId?: string) {
  const query = useQuery({
    queryKey: roomId ? queryKeys.rooms.members(roomId) : queryKeys.rooms.all,
    queryFn: () => roomsService.getRoomMembers(roomId ?? ''),
    enabled: Boolean(roomId),
  });

  return {
    members: query.data ?? [],
    isLoading: query.isPending,
    error: query.error ? normalizeApiError(query.error) : null,
  };
}

function stateFor<TData, TError, TVariables, TContext>(
  mutation: ReturnType<typeof useMutation<TData, TError, TVariables, TContext>>,
) {
  return {
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error ? normalizeApiError(mutation.error) : null,
  };
}
