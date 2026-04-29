import type { ApiActionResult } from '@/types/api';
import type {
  CreateRegionRoomRequest,
  ProximityChat,
  ProximityChatMessage,
  RadarDistanceFilter,
  RadarResponse,
  RadarTypeFilter,
  RegionRoom,
  SendProximityChatMessageRequest,
  StartProximityChatRequest,
  UpdateRadarPresenceRequest,
} from '@/types/radar';

import { api } from './api';

export async function updateRadarPresence(
  payload: UpdateRadarPresenceRequest,
): Promise<ApiActionResult> {
  const response = await api.patch<ApiActionResult>('/radar/presence', payload);

  return response.data;
}

export async function getRadarResults(params: {
  type: RadarTypeFilter;
  distanceMeters: RadarDistanceFilter;
}): Promise<RadarResponse> {
  const response = await api.get<RadarResponse>('/radar', { params });

  return response.data;
}

export async function createRegionRoom(payload: CreateRegionRoomRequest): Promise<RegionRoom> {
  const response = await api.post<RegionRoom>('/radar/rooms', payload);

  return response.data;
}

export async function startProximityChat(
  payload: StartProximityChatRequest,
): Promise<ProximityChat> {
  const response = await api.post<ProximityChat>('/proximity-chats', payload);

  return response.data;
}

export async function getProximityChat(chatId: string): Promise<ProximityChat> {
  const response = await api.get<ProximityChat>(`/proximity-chats/${chatId}`);

  return response.data;
}

export async function sendProximityChatMessage(
  chatId: string,
  payload: SendProximityChatMessageRequest,
): Promise<ProximityChatMessage> {
  const response = await api.post<ProximityChatMessage>(
    `/proximity-chats/${chatId}/messages`,
    payload,
  );

  return response.data;
}
