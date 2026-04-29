import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { normalizeApiError } from '@/services/api';
import { queryClient, queryKeys } from '@/services/query-client';
import * as radarService from '@/services/radar.service';
import type {
  CreateRegionRoomRequest,
  RadarDistanceFilter,
  RadarFilters,
  RadarTypeFilter,
  StartProximityChatRequest,
  UpdateRadarPresenceRequest,
} from '@/types/radar';

const defaultFilters: RadarFilters = {
  type: 'all',
  distanceMeters: 3000,
};

export function useRadar() {
  const [filters, setFilters] = useState<RadarFilters>(defaultFilters);
  const radarQuery = useQuery({
    queryKey: queryKeys.radar.results(filters),
    queryFn: () => radarService.getRadarResults(filters),
  });

  const presenceMutation = useMutation({
    mutationFn: radarService.updateRadarPresence,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.radar.all }),
  });

  const regionRoomMutation = useMutation({
    mutationFn: radarService.createRegionRoom,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.radar.all }),
  });

  const proximityChatMutation = useMutation({
    mutationFn: radarService.startProximityChat,
  });

  return {
    filters,
    results: radarQuery.data?.results ?? [],
    presence: radarQuery.data?.presence,
    radarState: {
      isLoading: radarQuery.isLoading,
      isFetching: radarQuery.isFetching,
      error: radarQuery.error ? normalizeApiError(radarQuery.error) : null,
      refetch: radarQuery.refetch,
    },
    setTypeFilter: (type: RadarTypeFilter) => setFilters((current) => ({ ...current, type })),
    setDistanceFilter: (distanceMeters: RadarDistanceFilter) =>
      setFilters((current) => ({ ...current, distanceMeters })),
    updatePresence: (payload: UpdateRadarPresenceRequest) => presenceMutation.mutateAsync(payload),
    createRegionRoom: (payload: CreateRegionRoomRequest) =>
      regionRoomMutation.mutateAsync(payload),
    startProximityChat: (payload: StartProximityChatRequest) =>
      proximityChatMutation.mutateAsync(payload),
    presenceState: {
      isPending: presenceMutation.isPending,
      error: presenceMutation.error ? normalizeApiError(presenceMutation.error) : null,
    },
    regionRoomState: {
      isPending: regionRoomMutation.isPending,
      error: regionRoomMutation.error ? normalizeApiError(regionRoomMutation.error) : null,
    },
    proximityChatState: {
      isPending: proximityChatMutation.isPending,
      error: proximityChatMutation.error ? normalizeApiError(proximityChatMutation.error) : null,
    },
  };
}
